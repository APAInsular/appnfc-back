import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import medplum from '#services/medplum'
import env from '#start/env'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { ResourceArray, WithId } from '@medplum/core'
import {
  AllergyIntolerance,
  Condition,
  OperationOutcome,
  Patient,
  Practitioner,
  ProjectMembership,
  ResourceType,
} from '@medplum/fhirtypes'

type ProfileResourceType = Extract<ResourceType, 'Patient' | 'Practitioner'>

interface MedplumUserParams {
  profileType: ProfileResourceType
  profileId: string
  membershipId: string
}

interface DeleteMedplumUserParams extends MedplumUserParams {
  behalfMembershipId?: string
}

interface GetProfileParams {
  profileType: ProfileResourceType
  profileId: string
  membershipId: string
}

interface UpdateProfileParams<T extends Patient | Practitioner> {
  profileType: ProfileResourceType
  profileId: string
  membershipId: string
  data: Partial<T>
}

export default class MedplumProxyService {
  /**
   * Creates a medplum user with the provided role.
   */
  static async createUser(
    user: User,
    type: 'Patient' | 'Practitioner',
    trx: TransactionClientContract
  ): Promise<MedPlumUser> {
    let membership: ProjectMembership | OperationOutcome
    try {
      membership = await medplum.invite(env.get('MEDPLUM_PROJECT_ID')!, {
        resourceType: type,
        firstName: user.firstName,
        lastName: user.surnames,
        email: user.email,
        password: crypto.randomUUID(),
        sendEmail: false,
      })
    } catch (error) {
      throw new Error(`Failed to create Medplum user: ${error}`)
    }

    if (membership.resourceType === 'OperationOutcome') {
      throw new Error(`Medplum invite failed: ${membership.issue?.[0]?.details?.text}`)
    }

    const medplumUserId = membership.user!.reference!.split('/')[1]

    const medplumProfileId = membership.profile!.reference!.split('/')[1]

    return await MedPlumUser.create(
      {
        userId: user.id,
        medplumUserId: medplumUserId,
        medplumMembershipId: membership.id!,
        profileId: medplumProfileId,
        profileType: type,
      },
      { client: trx }
    )
  }

  private static onBehalfOfHeaders(membershipId: string) {
    return {
      'X-Medplum': 'extended',
      'X-Medplum-On-Behalf-Of': `ProjectMembership/${membershipId}`,
    }
  }

  // ─── Patient ─────────────────────────────────────────────

  static async getProfile(params: GetProfileParams): Promise<Patient | Practitioner> {
    return medplum.readResource(params.profileType, params.profileId, {
      headers: this.onBehalfOfHeaders(params.membershipId),
    })
  }

  static async getProfiles(
    params: Pick<GetProfileParams, 'profileType' | 'membershipId'>
  ): Promise<Patient[] | Practitioner[]> {
    const bundle = await medplum.search(params.profileType, undefined, {
      headers: this.onBehalfOfHeaders(params.membershipId),
    })
    return bundle.entry?.map((e) => e.resource as Patient & Practitioner) ?? []
  }

  static async updateProfile<T extends Patient | Practitioner>(
    params: UpdateProfileParams<T>
  ): Promise<T> {
    const headers = this.onBehalfOfHeaders(params.membershipId)
    const existing = await medplum.readResource(params.profileType, params.profileId, { headers })
    return medplum.updateResource({ ...existing, ...params.data }, { headers }) as Promise<T>
  }

  static async deleteAsAdmin(
    params: Omit<DeleteMedplumUserParams, 'behalfMembershipId'>
  ): Promise<void> {
    await medplum.deleteResource(params.profileType, params.profileId)
    await medplum.deleteResource('ProjectMembership', params.membershipId)
  }

  static async delete(params: Required<DeleteMedplumUserParams>): Promise<void> {
    const headers = this.onBehalfOfHeaders(params.behalfMembershipId)
    await medplum.deleteResource(params.profileType, params.profileId, { headers })
    await medplum.deleteResource('ProjectMembership', params.membershipId)
  }

  static async getResource<RT extends ResourceType>(
    patientId: string,
    resourceType: RT
  ): Promise<ResourceArray<WithId<AllergyIntolerance>>> {
    try {
      const allergies = await medplum.searchResources(resourceType, {
        patient: `Patient/${patientId}`,
      })

      if (allergies.length === 0) {
        return [] as unknown as ResourceArray<WithId<AllergyIntolerance>>
      }

      return allergies as unknown as ResourceArray<WithId<AllergyIntolerance>>
    } catch (error) {
      console.error('Error getting allergies:', error)
      return [] as unknown as ResourceArray<WithId<AllergyIntolerance>>
    }
  }

  static async createSnomedValueSet(title: string, codes: { id: string; term: string }[]) {
    return medplum.createResource({
      resourceType: 'ValueSet',
      title: title,
      status: 'active',
      compose: {
        include: [
          {
            system: 'http://snomed.info/sct',
            concept: codes.map((c) => ({
              code: c.id,
              display: c.term,
            })),
          },
        ],
      },
    })
  }

  static async getValueSetConcepts(valueSetId: string) {
    const valueSet = await medplum.get(`fhir/R4/ValueSet/${valueSetId}/$expand`)

    const concepts: Record<string, string> = {}

    valueSet.expansion?.contains?.forEach((concept: any) => {
      if (concept.code && concept.display) {
        concepts[concept.code] = concept.display
      }
    })

    return concepts
  }

  static async createCondition(
    patientId: string,
    membershipId: string,
    snomedId: string,
    valueSetId: string 
  ): Promise<Condition> {
    const concepts = await this.getValueSetConcepts(valueSetId)
    const term = concepts[snomedId]

    if (!term) {
      throw new Error(`El código ${snomedId} no se encuentra en el ValueSet ${valueSetId}`)
    }

    return medplum.createResource(
      {
        resourceType: 'Condition',
        subject: { reference: `Patient/${patientId}` },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: snomedId,
              display: term, 
            },
          ],
          text: term, 
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'active',
            },
          ],
        },
      },
      { headers: this.onBehalfOfHeaders(membershipId) }
    )
  }
}
