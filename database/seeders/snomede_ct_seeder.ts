import MedplumConfig from '#models/medplum_config'
import medplum from '#services/medplum'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    const definitions = [
      {
        key: 'SNOMED_ALLERGIES_VALUESET',
        title: 'Snomed Allergies Collection',
        description: 'Patient allergy status and specific allergies',
        codes: [
          {
            id: '442557003',
            term: 'No known allergies',
            translations: { es: 'Sin alergias conocidas' },
          },
          {
            id: '294505008',
            term: 'Allergy to penicillin',
            translations: { es: 'Alergia a la penicilina' },
          },
          {
            id: '372687004',
            term: 'Allergy to aspirin',
            translations: { es: 'Alergia a la aspirina' },
          },
          { id: '419511003', term: 'Drug allergy', translations: { es: 'Alergia a medicamentos' } },
          { id: '232347008', term: 'Latex allergy', translations: { es: 'Alergia al látex' } },
          {
            id: '300916003',
            term: 'Allergy to bee venom',
            translations: { es: 'Alergia al veneno de abeja' },
          }, 
          { id: '414285001', term: 'Food allergy', translations: { es: 'Alergia alimentaria' } },
          {
            id: '293586001',
            term: 'Allergy to morphine',
            translations: { es: 'Alergia a la morfina' },
          }, 
          { id: '372741009', term: 'Allergy to iodine', translations: { es: 'Alergia al yodo' } }, 
          { id: '416098002', term: 'Allergy to NSAIDs', translations: { es: 'Alergia a AINEs' } },
        ],
      },
      {
        key: 'SNOMED_MEDICATIONS_PROGRESS_VALUESET',
        title: 'Snomed Medications In Progress Collection',
        description: 'Current active therapies and medication groups',
        codes: [
          { id: '260413007', term: 'None', translations: { es: 'Ninguno' } },
          {
            id: '418427003',
            term: 'Patient on anticoagulant therapy',
            translations: { es: 'Paciente en terapia anticoagulante' },
          },
          { id: '31252001', term: 'Insulin therapy', translations: { es: 'Terapia con insulina' } },
          { id: '387207008', term: 'Opioid', translations: { es: 'Opioide' } },
          {
            id: '373264003',
            term: 'Hypoglycemic agent',
            translations: { es: 'Agente hipoglucemiante' },
          },
          { id: '387158006', term: 'Benzodiazepine', translations: { es: 'Benzodiazepina' } },
          { id: '386452003', term: 'Antiepileptic', translations: { es: 'Antiepiléptico' } },
          { id: '387081005', term: 'Corticosteroid', translations: { es: 'Corticosteroide' } },
        ],
      },
      {
        key: 'SNOMED_IMPLANT_DEVICES_VALUESET',
        title: 'Snomed Implant Devices Collection',
        description: 'Cardiac and other implantable medical devices',
        codes: [
          { id: '260413007', term: 'None', translations: { es: 'Ninguno' } },
          {
            id: '14106009',
            term: 'Permanent cardiac pacemaker',
            translations: { es: 'Marcapasos cardíaco permanente' },
          },
          {
            id: '441509002',
            term: 'Implantable cardioverter defibrillator',
            translations: { es: 'Desfibrilador cardioversor implantable' },
          },
          {
            id: '17137000',
            term: 'Cardiac valve prosthesis',
            translations: { es: 'Prótesis de válvula cardíaca' },
          },
          {
            id: '271295000',
            term: 'Ventricular shunt',
            translations: { es: 'Derivación ventricular' },
          },
          {
            id: '700448003',
            term: 'Dialysis device',
            translations: { es: 'Dispositivo de diálisis' },
          },
        ],
      },
      {
        key: 'SNOMED_NEURO_STATUS_VALUESET',
        title: 'Snomed Neurological Status Collection',
        description: 'Consciousness state and dependency levels',
        codes: [
          {
            id: '40739000',
            term: 'Normal conscious state',
            translations: { es: 'Estado de consciencia normal' },
          },
          {
            id: '706868007',
            term: 'Chronic confused state',
            translations: { es: 'Estado confusional crónico' },
          },
          {
            id: '128294001',
            term: 'Chronic nervous system disorder',
            translations: { es: 'Trastorno crónico del sistema nervioso' },
          },
          {
            id: '365061000',
            term: 'Independent in activities of daily living',
            translations: { es: 'Independiente en actividades de la vida diaria' },
          },
          {
            id: '371153006',
            term: 'Partially dependent',
            translations: { es: 'Parcialmente dependiente' },
          },
          { id: '129839007', term: 'Total dependency', translations: { es: 'Dependencia total' } },
        ],
      },
      {
        key: 'SNOMED_PATHOLOGIES_VALUESET',
        title: 'Snomed Pathologies Collection',
        description: 'Common chronic conditions and patient history',
        codes: [
          {
            id: '160245001',
            term: 'No current problems or disability',
            translations: { es: 'Sin problemas ni discapacidad actuales' },
          },
          {
            id: '49436004',
            term: 'Atrial fibrillation',
            translations: { es: 'Fibrilación auricular' },
          },
          { id: '73211009', term: 'Diabetes mellitus', translations: { es: 'Diabetes mellitus' } },
          { id: '195967001', term: 'Asthma', translations: { es: 'Asma' } },
          {
            id: '13645005',
            term: 'Chronic obstructive lung disease',
            translations: { es: 'Enfermedad pulmonar obstructiva crónica' },
          },
          {
            id: '709044004',
            term: 'Chronic kidney disease',
            translations: { es: 'Enfermedad renal crónica' },
          },
          {
            id: '64770001',
            term: 'Blood coagulation disorder',
            translations: { es: 'Trastorno de la coagulación sanguínea' },
          },
          {
            id: '161661002',
            term: 'History of organ transplant',
            translations: { es: 'Antecedente de trasplante de órgano' },
          },
          {
            id: '370388006',
            term: 'Patient immunocompromised',
            translations: { es: 'Paciente inmunodeprimido' },
          },
        ],
      },
    ]

    for (const def of definitions) {
      await this.syncValueSet(def)
    }
  }

  private async syncValueSet(def: { key: string; title: string; codes: any[] }) {
    let config = await MedplumConfig.findBy('key', def.key)
    if (config) {
      console.log(`[${def.key}] Already in DB: ${config.value}`)
      return
    }

    const existing = await medplum.searchResources('ValueSet', { title: def.title })
    let valueSetId: string

    if (existing.length > 0) {
      valueSetId = existing[0].id as string
      console.log(`[${def.key}] Found in Medplum: ${valueSetId}`)
    } else {
      console.log(`[${def.key}] Creating new resource...`)
      const newVS = await medplum.createResource({
        resourceType: 'ValueSet',
        title: def.title,
        status: 'active',
        compose: {
          include: [
            {
              system: 'http://snomed.info/sct',
              concept: def.codes.map((c) => ({ code: c.id, display: c.term })),
            },
          ],
        },
      })
      valueSetId = newVS.id as string
    }

    await MedplumConfig.create({
      key: def.key,
      value: valueSetId,
      description: `Medplum ID for ${def.title}`,
    })
  }
}
