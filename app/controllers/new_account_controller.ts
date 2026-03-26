import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import MedplumProxyService from '#services/medplum_proxy_service'
import db from '@adonisjs/lucid/services/db'

export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { firstName, surnames, email, password, role } = await request.validateUsing(signupValidator)

    const trx = await db.transaction()

    try {
      const user = await User.create({ firstName, surnames, email, password }, { client: trx })
      await MedplumProxyService.createUser(user, role)
      await trx.commit()

      const token = await User.accessTokens.create(user)

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}