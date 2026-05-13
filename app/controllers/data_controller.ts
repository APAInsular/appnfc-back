import MedplumConfig from '#models/medplum_config'
import MedplumProxyService from '#services/medplum_proxy_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DataController {
  /**
   * @allergies
   * @summary Available allergies
   * @description List all allergies in SNOMEDE_CT estandard
   */
  async allergies({}: HttpContext) {
    const valueset_id = await MedplumConfig.findByOrFail('key', 'SNOMED_ALLERGIES_VALUESET')
    return await MedplumProxyService.getValueSetConcepts(valueset_id.value)
  }

  /**
   * @medications
   * @summary Available medications
   * @description List all medications in SNOMEDE_CT estandard
   */
  async medications({}: HttpContext) {
    const valueset_id = await MedplumConfig.findByOrFail(
      'key',
      'SNOMED_MEDICATIONS_PROGRESS_VALUESET'
    )
    return await MedplumProxyService.getValueSetConcepts(valueset_id.value)
  }

  /**
   * @pathologies
   * @summary Available pathologies
   * @description List all pathologies in SNOMEDE_CT estandard
   */
  async pathologies({}: HttpContext) {
    const valueset_id = await MedplumConfig.findByOrFail('key', 'SNOMED_PATHOLOGIES_VALUESET')
    return await MedplumProxyService.getValueSetConcepts(valueset_id.value)
  }

  /**
   * @inplantDevices
   * @summary Available inplant devices
   * @description List all inplant devices in SNOMEDE_CT estandard
   */
  async inplantDevices({}: HttpContext) {
    const valueset_id = await MedplumConfig.findByOrFail('key', 'SNOMED_IMPLANT_DEVICES_VALUESET')
    return await MedplumProxyService.getValueSetConcepts(valueset_id.value)
  }

  /**
   * @neurologicalStatus
   * @summary Available neurological status devices
   * @description List all neurological status in SNOMEDE_CT estandard
   */
  async neurologicalStatus({}: HttpContext) {
    const valueset_id = await MedplumConfig.findByOrFail('key', 'SNOMED_NEURO_STATUS_VALUESET')
    return await MedplumProxyService.getValueSetConcepts(valueset_id.value)
  }
}
