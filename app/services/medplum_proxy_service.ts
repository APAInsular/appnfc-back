import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import medplum from '#services/medplum'
import env from '#start/env'
import { Account, OperationOutcome, Patient, Practitioner, ProjectMembership } from '@medplum/fhirtypes'

export default class MedplumProxyService {
  /**
   * Creates a medplum user with the provided role.
   */
  static async createUser(
    user: User,
    type: 'Patient' | 'Practitioner' | 'RelatedPerson'
  ): Promise<MedPlumUser> {
    let membership: ProjectMembership | OperationOutcome
    try {
      membership = await medplum.invite(env.get('MEDPLUM_PROJECT_ID')!, {
        resourceType: type,
        firstName: user.firstName,
        lastName: user.surnames,
        email: user.email,
        password: crypto.randomUUID(),
      })
    } catch (error) {
      throw new Error(`Failed to create Medplum user: ${error}`)
    }

    if (membership.resourceType === 'OperationOutcome') {
      throw new Error(`Medplum invite failed: ${membership.issue?.[0]?.details?.text}`)
    }

    const medplumUserId = membership.user!.reference!.split('/')[1]
    const medplumProfileId = membership.profile!.reference!.split('/')[1]

    return await MedPlumUser.create({
      userId: user.id,
      medplumUserId: medplumUserId,
      medplumMembershipId: membership.id!,
      profileId: medplumProfileId,
      profileType: type,
    })
  }

  private static onBehalfOfHeaders(membershipId: string) {
    return {
      'X-Medplum': 'extended',
      'X-Medplum-On-Behalf-Of': `ProjectMembership/${membershipId}`,
    }
  }

  
  // ─── Patient ─────────────────────────────────────────────

  static async getPatient(id: string, membershipId: string): Promise<Patient> {
    return medplum.readResource('Patient', id, {
      headers: this.onBehalfOfHeaders(membershipId),
    })
  }

  static async getPatients(membershipId: string): Promise<Patient[]> {
    const bundle = await medplum.search('Patient', undefined, {
      headers: this.onBehalfOfHeaders(membershipId),
    })
    return bundle.entry?.map((e) => e.resource as Patient) ?? []
  }

  static async updatePatient(
    id: string,
    data: Partial<Patient>,
    membershipId: string
  ): Promise<Patient> {
    const headers = this.onBehalfOfHeaders(membershipId)
    const existing = await medplum.readResource('Patient', id, { headers })
    return medplum.updateResource({ ...existing, ...data }, { headers })
  }

  static async deletePatient(id: string, membershipId: string): Promise<void> {
    return medplum.deleteResource('Patient', id, {
      headers: this.onBehalfOfHeaders(membershipId),
    })
  }

  // ─── Practitioner ─────────────────────────────────────────

  static async getPractitioner(id: string, membershipId: string): Promise<Practitioner> {
    return medplum.readResource('Practitioner', id, {
      headers: this.onBehalfOfHeaders(membershipId),
    })
  }

  static async getPractitioners(membershipId: string): Promise<Practitioner[]> {
    const bundle = await medplum.search('Practitioner', undefined, {
      headers: this.onBehalfOfHeaders(membershipId),
    })
    return bundle.entry?.map((e) => e.resource as Practitioner) ?? []
  }

  static async updatePractitioner(
    id: string,
    data: Partial<Practitioner>,
    membershipId: string
  ): Promise<Practitioner> {
    const headers = this.onBehalfOfHeaders(membershipId)
    const existing = await medplum.readResource('Practitioner', id, { headers })
    return medplum.updateResource({ ...existing, ...data }, { headers })
  }

  static async deletePractitioner(id: string, membershipId: string): Promise<void> {
    return medplum.deleteResource('Practitioner', id, {
      headers: this.onBehalfOfHeaders(membershipId),
    })
  }
}
