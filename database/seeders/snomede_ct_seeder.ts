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
        codes: [{ id: '442557003', term: 'No known allergies' }],
      },
      {
        key: 'SNOMED_MEDICATIONS_PROGRESS_VALUESET',
        title: 'Snomed Medications In Progress Collection',
        description: 'Current active therapies and medication groups',
        codes: [
          { id: '260413007', term: 'None' },
          { id: '418427003', term: 'Patient on anticoagulant therapy' },
          { id: '31252001', term: 'Insulin therapy' },
          { id: '387207008', term: 'Opioid' },
          { id: '373264003', term: 'Hypoglycemic agent' },
          { id: '387158006', term: 'Benzodiazepine' },
          { id: '386452003', term: 'Antiepileptic' },
          { id: '387081005', term: 'Corticosteroid' },
        ],
      },
      {
        key: 'SNOMED_IMPLANT_DEVICES_VALUESET',
        title: 'Snomed Implant Devices Collection',
        description: 'Cardiac and other implantable medical devices',
        codes: [
          { id: '260413007', term: 'None' },
          { id: '14106009', term: 'Permanent cardiac pacemaker' },
          { id: '441509002', term: 'Implantable cardioverter defibrillator' },
          { id: '17137000', term: 'Cardiac valve prosthesis' },
          { id: '271295000', term: 'Ventricular shunt' },
          { id: '700448003', term: 'Dialysis device' },
        ],
      },
      {
        key: 'SNOMED_NEURO_STATUS_VALUESET',
        title: 'Snomed Neurological Status Collection',
        description: 'Consciousness state and dependency levels',
        codes: [
          { id: '40739000', term: 'Normal conscious state' },
          { id: '706868007', term: 'Chronic confused state' },
          { id: '128294001', term: 'Chronic nervous system disorder' },
          { id: '365061000', term: 'Independent in activities of daily living' },
          { id: '371153006', term: 'Partially dependent' },
          { id: '129839007', term: 'Total dependency' },
        ],
      },
      {
        key: 'SNOMED_PATHOLOGIES_VALUESET',
        title: 'Snomed Pathologies Collection',
        description: 'Common chronic conditions and patient history',
        codes: [
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
