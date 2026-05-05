import MedplumProxyService from '#services/medplum_proxy_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsController {
  async show({}: HttpContext) {
    return {}
  }

  async update({}: HttpContext) {
    return {}
  }

  async store({ }: HttpContext) {
    // const { } = await request.validateUsing()
    // MedplumProxyService.createCondition()
    return {}
  }
}
