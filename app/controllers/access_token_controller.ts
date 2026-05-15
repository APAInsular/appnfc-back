import User from '#models/user'
import { loginCodeValidator, loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import logger from '@adonisjs/core/services/logger'

export default class AccessTokenController {
  /**
   * @store
   * @summary Login an account
   * @requestBody <loginValidator>
   */
  async store({ request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    logger.debug('Processing login request', { email })

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  /**
   * @accessWithCode
   * @summary Login an account through code
   * @requestBody <loginCodeValidator>
   */
  async accessWithCode({ request, serialize }: HttpContext) {
    const { code } = await request.validateUsing(loginCodeValidator)

    const user = await User.findByOrFail('access_code', code);
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  /**
   * @destroy
   * @summary Logout
   */
  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail()

    logger.debug('Processing logout request', { email: user.email })

    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}
