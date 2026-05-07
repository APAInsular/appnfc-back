import MedPlumUser from '#models/med_plum_user'
import MedplumConfig from '#models/medplum_config'
import MedplumProxyService from '#services/medplum_proxy_service'
import { storeCondition } from '#validators/us'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsController {
  private static async getAllValueSets() {
    return await Promise.all([
      MedplumConfig.findByOrFail('key', 'SNOMED_ALLERGIES_VALUESET'),
      MedplumConfig.findByOrFail('key', 'SNOMED_MEDICATIONS_PROGRESS_VALUESET'),
      MedplumConfig.findByOrFail('key', 'SNOMED_PATHOLOGIES_VALUESET'),
      MedplumConfig.findByOrFail('key', 'SNOMED_IMPLANT_DEVICES_VALUESET'),
      MedplumConfig.findByOrFail('key', 'SNOMED_NEURO_STATUS_VALUESET'),
    ])
  }

  private static async getAllConcepts(
    allergies_vs: MedplumConfig,
    medications_vs: MedplumConfig,
    pathologies_vs: MedplumConfig,
    devices_vs: MedplumConfig,
    neuro_vs: MedplumConfig
  ) {
    return await Promise.all([
      MedplumProxyService.getValueSetConcepts(allergies_vs.value),
      MedplumProxyService.getValueSetConcepts(medications_vs.value),
      MedplumProxyService.getValueSetConcepts(pathologies_vs.value),
      MedplumProxyService.getValueSetConcepts(devices_vs.value),
      MedplumProxyService.getValueSetConcepts(neuro_vs.value),
    ])
  }

  /**
   * @show
   * @summary Get self medical data
   */
  async show({ auth }: HttpContext) {
    logger.info('Processing user medical request')
    const user = await auth.getUserOrFail()

    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)

    logger.debug(`User with medplum profileId: ${medplumUser.profileId}`)

    const profile = await MedplumProxyService.getProfile({
      profileType: 'Patient',
      membershipId: medplumUser.medplumMembershipId,
      profileId: medplumUser.profileId!,
    })

    logger.debug(
      `Medplum user id: ${medplumUser.medplumUserId}`
    )

    let existingConditions = null
    try {
      existingConditions = await MedplumProxyService.getResource(
        medplumUser.medplumUserId!,
        'Condition'
      )
    } catch (error: any) {
      if (error.status === 404 || error.outcome?.id === 'not-found') {
        logger.warn(`The user ${medplumUser.medplumUserId} does not have Condition type resources in Medplum.`)
        existingConditions = [] 
      } else {
       
        logger.error('Error in obtaining unexpected clinical data:', error)
        existingConditions = null 
      }
    }
    

    return { profile, conditions: existingConditions }
  }

  /**
   * @update
   * @summary Update self medical data
   * @description Replace all data (be careful bro)
   * @requestBody <storeCondition>
   * @responseBody 200 - {}
   */
  async update({ auth, request }: HttpContext) {
    const {
      allergies,
      biologicalSex,
      inplantDevices,
      medications,
      neurologicalStatus,
      pathologies,
      bloodType,
      firstName,
      surnames,
      language,
    } = await request.validateUsing(storeCondition)

    const user = await auth.getUserOrFail()
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)

    const [allergies_vs, medications_vs, pathologies_vs, devices_vs, neuro_vs] =
      await UsController.getAllValueSets()

    const existingConditions = await MedplumProxyService.getResource(
      medplumUser.medplumUserId!,
      'Condition'
    )
    await Promise.all(
      existingConditions.map((c) =>
        MedplumProxyService.deleteResource('Condition', c.id!, medplumUser.medplumMembershipId)
      )
    )

    await Promise.all([
      MedplumProxyService.updateProfile({
        profileType: 'Patient',
        profileId: medplumUser.profileId!,
        membershipId: medplumUser.medplumMembershipId,
        data: {
          name: [{ family: surnames, given: [firstName] }],
          gender: biologicalSex === 'M' ? 'male' : 'female',
          communication: [
            { language: { coding: [{ system: 'urn:ietf:bcp:47', code: language.toLowerCase() }] } },
          ],
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/patient-bloodType',
              valueCodeableConcept: {
                coding: [{ system: 'http://snomed.info/sct', code: bloodType }],
              },
            },
          ],
        },
      }),

      (async () => {
        const [allergies_c, medications_c, pathologies_c, devices_c, neuro_c] =
          await UsController.getAllConcepts(
            allergies_vs,
            medications_vs,
            pathologies_vs,
            devices_vs,
            neuro_vs
          )
        await Promise.all([
          ...allergies.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              allergies_c
            )
          ),
          ...medications.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              medications_c
            )
          ),
          ...pathologies.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              pathologies_c
            )
          ),
          ...inplantDevices.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              devices_c
            )
          ),
          ...neurologicalStatus.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              neuro_c
            )
          ),
        ])
      })(),
    ])

    return {}
  }

  /**
   * @store
   * @summary Store patient medical conditions
   * @description Creates allergies, pathologies and other conditions for authenticated user
   * @requestBody <storeCondition>
   * @responseBody 200 - {}
   */
  async store({ auth, request }: HttpContext) {
    const {
      allergies,
      biologicalSex,
      inplantDevices,
      medications,
      neurologicalStatus,
      pathologies,
      bloodType,
      firstName,
      surnames,
      language,
    } = await request.validateUsing(storeCondition)

    const user = await auth.getUserOrFail()
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)

    const [allergies_vs, medications_vs, pathologies_vs, devices_vs, neuro_vs] =
      await UsController.getAllValueSets()

    await Promise.all([
      MedplumProxyService.updateProfile({
        profileType: 'Patient',
        profileId: medplumUser.profileId!,
        membershipId: medplumUser.medplumMembershipId,
        data: {
          name: [{ family: surnames, given: [firstName] }],
          gender: biologicalSex === 'M' ? 'male' : 'female',
          communication: [
            { language: { coding: [{ system: 'urn:ietf:bcp:47', code: language.toLowerCase() }] } },
          ],
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/patient-bloodType',
              valueCodeableConcept: {
                coding: [{ system: 'http://snomed.info/sct', code: bloodType }],
              },
            },
          ],
        },
      }),

      (async () => {
        const [allergies_c, medications_c, pathologies_c, devices_c, neuro_c] =
          await UsController.getAllConcepts(
            allergies_vs,
            medications_vs,
            pathologies_vs,
            devices_vs,
            neuro_vs
          )
        await Promise.all([
          ...allergies.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              allergies_c
            )
          ),
          ...medications.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              medications_c
            )
          ),
          ...pathologies.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              pathologies_c
            )
          ),
          ...inplantDevices.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              devices_c
            )
          ),
          ...neurologicalStatus.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumUser.medplumMembershipId,
              code,
              neuro_c
            )
          ),
        ])
      })(),
    ])
    return {}
  }
}
