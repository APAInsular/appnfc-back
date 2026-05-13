import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  /**
   * @show
   * @summary Get your account data
   */
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }

  /**
   * @index
   * @summary Get a list of all existing accounts
   */
  async index({}: HttpContext) {
    return await UserTransformer.transform(await User.all())
  }

  /**
   * @byEmail
   * @summary Find a user by email
   */
  async byEmail({ params }: HttpContext) {
    const user = await User.findByOrFail('email', params.email)
    return new UserTransformer(user).toObject()
  }
}
