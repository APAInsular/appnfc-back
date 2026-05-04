import User from '#models/user'
import { adminSignupValidator, onceAdminSignupValidator, signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import MedplumProxyService from '#services/medplum_proxy_service'
import db from '@adonisjs/lucid/services/db'
import MedPlumUser from '#models/med_plum_user'
import logger from '@adonisjs/core/services/logger'

export default class NewAccountController {
  // TODO: Split into two endpoints for security reasons.
  /**
   * @store
   * @summary Register an account
   * @requestBody <signupValidator>
   */
  async store({ request, serialize }: HttpContext) {
    const { firstName, surnames, email, password, role } =
      await request.validateUsing(signupValidator)

    logger.info({ email, role }, 'Processing new account.')

    const trx = await db.transaction()
    let medplumUser: MedPlumUser | null = null

    try {
      const user = await User.create(
        { firstName, surnames, email, password, role },
        { client: trx }
      )
      medplumUser = await MedplumProxyService.createUser(user, role, trx)
      await trx.commit()

      const token = await User.accessTokens.create(user)

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      await trx.rollback()

      if (medplumUser) {
        await MedplumProxyService.deleteAsAdmin({
          profileId: medplumUser.profileId!,
          membershipId: medplumUser.medplumMembershipId!,
          profileType: role,
        }).catch(() => {})
      }

      throw error
    }
  }

  /**
   * @storeAdminOnce
   * @summary Register once an admin.
   * @description Register an admin account if there are no admins
   * @requestBody <onceAdminSignupValidator>
   */
  async storeAdminOnce({ request, serialize, response }: HttpContext) {
    const { email, password } = await request.validateUsing(onceAdminSignupValidator)

    logger.warn({ email }, 'Processing first Admin request.')

    const trx = await db.transaction()

    const adminExists = await User.query().where('role', 'Admin').first()
    if (adminExists) return response.forbidden({ message: 'Forbidden' })

    try {
      const user = await User.create(
        { firstName: 'Root', surnames: 'Admin', email, password, role: 'Admin' },
        { client: trx }
      )

      await trx.commit()

      const token = await User.accessTokens.create(user)

      logger.debug('First admin created: ', {
        firstName: user.firstName,
        surnames: user.surnames,
        email,
        role: user.role,
      })

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      await trx.rollback()
      logger.error({ error }, 'Failed to create first Admin account.')
      return response.internalServerError({ message: 'Something went wrong' })
    }
  }

  /**
   * @storeAdmin
   * @summary Register an admin.
   * @description Register an admin account if you are an admin
   * @requestBody <adminSignupValidator>
   */
  async storeAdmin({ auth, request, serialize, response }: HttpContext) {
    const { name, email, password } = await request.validateUsing(adminSignupValidator)

    logger.warn({ name, email, by: { name: auth.user?.firstName } }, 'Processing Admin account creation request.')

    const trx = await db.transaction()

    try {
      const user = await User.create(
        { firstName: name, surnames: 'Admin', email, password, role: 'Admin' },
        { client: trx }
      )

      await trx.commit()

      const token = await User.accessTokens.create(user)

      logger.debug('New Admin account created: ', {
        firstName: user.firstName,
        surnames: user.surnames,
        email,
        role: user.role,
        by: { email: auth.user?.email }
      })

      return serialize({
        user: UserTransformer.transform(user),
        token: token.value!.release(),
      })
    } catch (error) {
      await trx.rollback()
      logger.error({ error }, 'Failed to create an Admin account.')
      return response.internalServerError({ message: 'Something went wrong' })
    }
  }
}
