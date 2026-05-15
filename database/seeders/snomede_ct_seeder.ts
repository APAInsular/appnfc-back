import ConditionCatalog from '#models/conditions_catalog'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    const catalog: {
      code: string
      display: string
      category: 'allergy' | 'medication' | 'pathology' | 'implant' | 'neuro'
      allowsText: boolean
    }[] = [
      // ALLERGIES
      { code: '442557003', display: 'Sin alergias conocidas',             category: 'allergy',    allowsText: false },
      { code: '294505008', display: 'Alergia a la penicilina',            category: 'allergy',    allowsText: false },
      { code: '372687004', display: 'Alergia a la aspirina',              category: 'allergy',    allowsText: false },
      { code: '419511003', display: 'Alergia a medicamentos',             category: 'allergy',    allowsText: true  },
      { code: '232347008', display: 'Alergia al látex',                   category: 'allergy',    allowsText: false },
      { code: '300916003', display: 'Alergia al veneno de abeja',         category: 'allergy',    allowsText: false },
      { code: '414285001', display: 'Alergia alimentaria',                category: 'allergy',    allowsText: true  },
      { code: '293586001', display: 'Alergia a la morfina',               category: 'allergy',    allowsText: false },
      { code: '372741009', display: 'Alergia al yodo',                    category: 'allergy',    allowsText: false },
      { code: '416098002', display: 'Alergia a AINEs',                    category: 'allergy',    allowsText: false },

      // MEDICATIONS
      { code: '260413007', display: 'Ninguno',                            category: 'medication', allowsText: false },
      { code: '418427003', display: 'Anticoagulantes',                    category: 'medication', allowsText: false },
      { code: '31252001',  display: 'Insulina',                           category: 'medication', allowsText: false },
      { code: '387207008', display: 'Opioides',                           category: 'medication', allowsText: false },
      { code: '373264003', display: 'Hipoglucemiantes orales',            category: 'medication', allowsText: false },
      { code: '387158006', display: 'Benzodiazepina',                     category: 'medication', allowsText: false },
      { code: '386452003', display: 'Antiepilépticos',                    category: 'medication', allowsText: false },
      { code: '387081005', display: 'Corticosónicos',                     category: 'medication', allowsText: false },

      // PATHOLOGIES
      { code: '160245001', display: 'Sin problemas actuales',             category: 'pathology',  allowsText: false },
      { code: '49436004',  display: 'Cardiopatía',                        category: 'pathology',  allowsText: true  },
      { code: '73211009',  display: 'Diabetes mellitus',                  category: 'pathology',  allowsText: false },
      { code: '195967001', display: 'Asma',                               category: 'pathology',  allowsText: false },
      { code: '13645005',  display: 'EPOC',                               category: 'pathology',  allowsText: false },
      { code: '709044004', display: 'Insuficiencia renal',                category: 'pathology',  allowsText: false },
      { code: '64770001',  display: 'Trastornos de la coagulación',       category: 'pathology',  allowsText: false },
      { code: '161661002', display: 'Trasplantes',                        category: 'pathology',  allowsText: true  },
      { code: '370388006', display: 'Inmunodepresión',                    category: 'pathology',  allowsText: true  },
      { code: 'PATHOLOGY_OTHER', display: 'Otro',                         category: 'pathology',  allowsText: true  },

      // IMPLANTS
      { code: '14106009',  display: 'Marcapasos / DAI',                   category: 'implant',    allowsText: true  },
      { code: '17137000',  display: 'Prótesis valvular',                  category: 'implant',    allowsText: false },
      { code: '271295000', display: 'Derivación ventricular',             category: 'implant',    allowsText: false },
      { code: '700448003', display: 'Diálisis',                           category: 'implant',    allowsText: false },
      { code: 'IMPLANT_OTHER', display: 'Otro',                           category: 'implant',    allowsText: true  },

      // NEURO
      { code: '40739000',  display: 'Brillante normal',                   category: 'neuro',      allowsText: false },
      { code: '706868007', display: 'Confusión crónica',                  category: 'neuro',      allowsText: false },
      { code: '128294001', display: 'Déficits neurológicos preexistentes', category: 'neuro',     allowsText: false },
      { code: '365061000', display: 'Autónomo',                           category: 'neuro',      allowsText: false },
      { code: '371153006', display: 'Parcialmente dependiente',           category: 'neuro',      allowsText: false },
      { code: '129839007', display: 'No autónomo / Asistido',             category: 'neuro',      allowsText: false },
    ]

    for (const item of catalog) {
      await ConditionCatalog.updateOrCreate({ code: item.code }, item)
    }
  }
}