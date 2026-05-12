import Bracelet from '#models/bracelet'
import MedPlumUser from '#models/med_plum_user'
import MedplumConfig from '#models/medplum_config'
import User from '#models/user'
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

    let profile = null
    let existingConditions: any = []

    try {
      profile = await MedplumProxyService.getProfile({
        profileType: 'Patient',
        membershipId: medplumUser.medplumMembershipId,
        profileId: medplumUser.profileId!,
      })
    } catch (error) {
      logger.warn(`Profile not found for user ${user.id} in Medplum`)
      profile = null
    }

    try {
      existingConditions = await MedplumProxyService.getResource(
        medplumUser.medplumUserId!,
        'Condition'
      )
    } catch (error) {
      logger.warn(`No conditions found for Medplum ID ${medplumUser.medplumUserId}`)
      existingConditions = []
    }

    return {
      profile,
      conditions: existingConditions,
    }
  }

  /**
   * @showByUid
   * @summary Get user medical data by UID
   */
  async showByUid({ params }: HttpContext) {
    logger.info('Processing user medical request')

    const requested_user = await User.findByOrFail('uid', params.userUid)
    const medplumUser = await MedPlumUser.findByOrFail('userId', requested_user.id)

    let profile = null
    let existingConditions: any = []

    try {
      profile = await MedplumProxyService.getProfile({
        profileType: 'Patient',
        membershipId: medplumUser.medplumMembershipId,
        profileId: medplumUser.profileId!,
      })
    } catch (error) {
      logger.warn(`Profile not found for user ${requested_user.id} in Medplum`)
      profile = null
    }

    try {
      existingConditions = await MedplumProxyService.getResource(
        medplumUser.medplumUserId!,
        'Condition'
      )
    } catch (error) {
      logger.warn(`No conditions found for Medplum ID ${medplumUser.medplumUserId}`)
      existingConditions = []
    }

    return {
      profile,
      conditions: existingConditions,
    }
  }

  /**
   * @showByBraceletUid
   * @summary Get user medical data by UID
   */
  async showByBraceletUid({ params }: HttpContext) {
    logger.info('Processing user medical request')

    logger.debug({ params }, 'Params')

    const requested_bracelet = await Bracelet.findByOrFail('uid', params.braceletUid)
    const requested_user = await User.findByOrFail('id', requested_bracelet.userId)
    const medplumUser = await MedPlumUser.findByOrFail('userId', requested_user.id)

    let profile = null
    let existingConditions: any = []

    try {
      profile = await MedplumProxyService.getProfile({
        profileType: 'Patient',
        membershipId: medplumUser.medplumMembershipId,
        profileId: medplumUser.profileId!,
      })
    } catch (error) {
      logger.warn(`Profile not found for user ${requested_user.id} in Medplum`)
      profile = null
    }

    try {
      existingConditions = await MedplumProxyService.getResource(
        medplumUser.medplumUserId!,
        'Condition'
      )
    } catch (error) {
      logger.warn(`No conditions found for Medplum ID ${medplumUser.medplumUserId}`)
      existingConditions = []
    }

    return {
      profile,
      conditions: existingConditions,
    }
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

  /**
   * @storeByUid
   * @summary Store patient medical conditions by Uid
   * @description Creates allergies, pathologies and other conditions for authenticated user
   * @requestBody <storeCondition>
   * @responseBody 200 - {}
   */
  async storeByUid({ auth, request, params }: HttpContext) {
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

    const target_user = await User.findByOrFail('uid', params.userUid)
    const auth_user = await auth.getUserOrFail()

    const medplumUser = await MedPlumUser.findByOrFail('userId', target_user.id)

    const medplumAuthUser = await MedPlumUser.findByOrFail('userId', auth_user.id)

    const [allergies_vs, medications_vs, pathologies_vs, devices_vs, neuro_vs] =
      await UsController.getAllValueSets()

    await Promise.all([
      MedplumProxyService.updateProfile({
        profileType: 'Patient',
        profileId: medplumUser.profileId!,
        membershipId: medplumAuthUser.medplumMembershipId,
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
              medplumAuthUser.medplumMembershipId,
              code,
              allergies_c
            )
          ),
          ...medications.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumAuthUser.medplumMembershipId,
              code,
              medications_c
            )
          ),
          ...pathologies.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumAuthUser.medplumMembershipId,
              code,
              pathologies_c
            )
          ),
          ...inplantDevices.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumAuthUser.medplumMembershipId,
              code,
              devices_c
            )
          ),
          ...neurologicalStatus.map((code) =>
            MedplumProxyService.createConditionFromConcepts(
              medplumUser.medplumUserId!,
              medplumAuthUser.medplumMembershipId,
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
