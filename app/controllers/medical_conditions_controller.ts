import Bracelet from '#models/bracelet'
import User from '#models/user'
import { updateConditions } from '#validators/medical_conditions'
import type { HttpContext } from '@adonisjs/core/http'
import ConditionCatalog from '#models/conditions_catalog'
import UserCondition from '#models/user_condition'

export default class MedicalConditionsController {
public static async getConditionsForUser(userId: number) {
    const [catalog, userConditions] = await Promise.all([
      ConditionCatalog.all(),
      UserCondition.query().where('userId', userId)
    ])

    return catalog.map((item) => {
      const uc = userConditions.find((c) => c.catalogId === item.id)

      let formattedTextValues: string[] = []
      
      if (uc?.textValues) {
        if (Array.isArray(uc.textValues)) {
          formattedTextValues = uc.textValues
        } else if (typeof uc.textValues === 'string') {
          try {
            formattedTextValues = JSON.parse(uc.textValues)
          } catch {
            formattedTextValues = [] 
          }
        }
      }

      return {
        code: item.code,
        display: item.display,
        category: item.category,
        allowsText: item.allowsText,
        checked: uc?.checked ?? false,
        textValues: formattedTextValues,
      }
    })
  }

  private static async upsertConditions(
    userId: number,
    conditions: { code: string; textValues: string[] }[]
  ) {
    const catalog = await ConditionCatalog.all()

    await Promise.all(
      catalog.map(async (item) => {
        const incoming = conditions.find((c) => c.code === item.code)
        await UserCondition.updateOrCreate(
          { userId, catalogId: item.id },
          {
            checked: !!incoming,
            textValues: incoming?.textValues ?? [],
          }
        )
      })
    )
  }

  /**
   * @show
   * @summary Get self medical conditions
   * @responseBody 200 - {"conditions":[{"code":"14106009","display":"Marcapasos / DAI","category":"implant","allowsText":true,"checked":true,"textValues":["St. Jude 2019"]},{"code":"73211009","display":"Diabetes mellitus","category":"pathology","allowsText":false,"checked":false,"textValues":[]}]}
   */
  async show({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const conditions = await MedicalConditionsController.getConditionsForUser(user.id)
    return { conditions }
  }

  /**
   * @showCatalog
   * @summary Get full condition catalog
   * @responseBody 200 - [{"id":1,"code":"14106009","display":"Marcapasos / DAI","category":"implant","allowsText":true}]
   */
  async showCatalog({}: HttpContext) {
    return ConditionCatalog.all()
  }

  /**
   * @showByUid
   * @summary Get user medical conditions by UID
   * @responseBody 200 - {"conditions":[{"code":"14106009","display":"Marcapasos / DAI","category":"implant","allowsText":true,"checked":true,"textValues":["St. Jude 2019"]},{"code":"73211009","display":"Diabetes mellitus","category":"pathology","allowsText":false,"checked":false,"textValues":[]}]}
   */
  async showByUid({ params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.userUid)
    const conditions = await MedicalConditionsController.getConditionsForUser(user.id)
    return { conditions }
  }

  /**
   * @showByBraceletUid
   * @summary Get user medical conditions by bracelet UID
   * @responseBody 200 - {"conditions":[{"code":"14106009","display":"Marcapasos / DAI","category":"implant","allowsText":true,"checked":true,"textValues":["St. Jude 2019"]},{"code":"73211009","display":"Diabetes mellitus","category":"pathology","allowsText":false,"checked":false,"textValues":[]}]}
   */
  async showByBraceletUid({ params, response }: HttpContext) {
    const bracelet = await Bracelet.findByOrFail('uid', params.braceletUid)

    if (bracelet.state === 'banned') return response.forbidden({ message: 'Bracelet banned.' })

    if (bracelet.state === 'unassigned')
      return response.unprocessableEntity({ message: 'Bracelet unassigned.' })

    const user = await User.findByOrFail('id', bracelet.userId)
    const conditions = await MedicalConditionsController.getConditionsForUser(user.id)
    return { conditions }
  }

  /**
   * @update
   * @summary Update self medical conditions
   * @requestBody <updateConditions>
   * @responseBody 200 - {}
   */
  async update({ auth, request }: HttpContext) {
    const { conditions } = await request.validateUsing(updateConditions)
    const user = await auth.getUserOrFail()
    await MedicalConditionsController.upsertConditions(user.id, conditions)
    return {}
  }

  /**
   * @updateByUid
   * @summary Update medical conditions by user UID
   * @requestBody <updateConditions>
   * @responseBody 200 - {}
   */
  async updateByUid({ request, params }: HttpContext) {
    const { conditions } = await request.validateUsing(updateConditions)
    const user = await User.findByOrFail('uid', params.userUid)
    await MedicalConditionsController.upsertConditions(user.id, conditions)
    return {}
  }
}
