import type { HttpContext } from '@adonisjs/core/http'

export default class DataController {
  /**
   * @show
   * @summary All SNOMEDE_CT form data
   * @description List all SNOMEDECT supported data
   * @responseBody 200 - {terminology: 'SNOMEDE_CT', language_scope: 'en-US', clinical_data: { allergies: [{}]} }
   */
  async show({}: HttpContext) {
    return {
      terminology: 'SNOMED_CT',
      language_scope: 'en-US',
      clinical_data: {
        allergies: [{ id: '442557003', term: 'No known allergies' }],
        medications_in_progress: [
          { id: '260413007', term: 'None' },
          { id: '418427003', term: 'Patient on anticoagulant therapy' },
          { id: '31252001', term: 'Insulin therapy' },
          { id: '387207008', term: 'Opioid' },
          { id: '373264003', term: 'Hypoglycemic agent' },
          { id: '387158006', term: 'Benzodiazepine' },
          { id: '386452003', term: 'Antiepileptic' },
          { id: '387081005', term: 'Corticosteroid' },
        ],
        implant_devices: [
          { id: '260413007', term: 'None' },
          { id: '14106009', term: 'Permanent cardiac pacemaker' },
          { id: '441509002', term: 'Implantable cardioverter defibrillator' },
          { id: '17137000', term: 'Cardiac valve prosthesis' },
          { id: '271295000', term: 'Ventricular shunt' },
          { id: '700448003', term: 'Dialysis device' },
        ],
        neurological_status: [
          { id: '40739000', term: 'Normal conscious state' },
          { id: '706868007', term: 'Chronic confused state' },
          { id: '128294001', term: 'Chronic nervous system disorder' },
          { id: '365061000', term: 'Independent in activities of daily living' },
          { id: '371153006', term: 'Partially dependent' },
          { id: '129839007', term: 'Total dependency' },
        ],
        pathologies: [
          { id: '160245001', term: 'No current problems or disability' },
          { id: '49436004', term: 'Atrial fibrillation' },
          { id: '73211009', term: 'Diabetes mellitus' },
          { id: '195967001', term: 'Asthma' },
          { id: '13645005', term: 'Chronic obstructive lung disease' },
          { id: '709044004', term: 'Chronic kidney disease' },
          { id: '64770001', term: 'Blood coagulation disorder' },
          { id: '161661002', term: 'History of organ transplant' },
          { id: '370388006', term: 'Patient immunocompromised' },
        ],
      },
    }
  }

  async allergies({}: HttpContext) {
    return []
  }
  async medications({}: HttpContext) {
    return []
  }
  async pathologies({}: HttpContext) {
    return []
  }
  async inplantDevices({}: HttpContext) {
    return []
  }
  async neurologicalStatus({}: HttpContext) {
    return []
  }
  async bloodTypes({}: HttpContext) {
    return []
  }
}
