import type { HttpContext } from '@adonisjs/core/http'
import MedplumProxyService from '#services/medplum_proxy_service'
import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import { cleanupUser } from '#tests/helpers/auth'
import { requireAdmin } from '../helpers/index.ts'
import logger from '@adonisjs/core/services/logger'

// TODO:
// ! Avoid Q-Vida Admins consult medplum's users data
// ! rethink medplum_proxy_service.ts code
// ! Add audit logging

type ProfileType = 'Patient' | 'Practitioner'

export default class MedplumController {
  private async getMedplumUser(userId: number) {
    return MedPlumUser.findByOrFail('userId', userId)
  }

  /**
   * @index
   * @summary List all medplum profiles
   * @description List all profiles from a specific role
   * @responseBody 200 - [{ "membershipId": "123", "profileType": "Practitioner" }]
   */
  async index({ auth, params }: HttpContext) {
    const profileType = params.profileType as ProfileType

    logger.info('Listing medplum profiles', { profileType })

    const user = await auth.getUserOrFail()
    logger.debug('Authenticated user', { userId: user.id })

    /* const medplumUser = await this.getMedplumUser(user.id).catch((err) => {
      logger.warn('Medplum user not found', { userId: user.id, error: err.message })
      throw err
    }) 
    
    logger.debug('Medplum user resolved', {
      userId: user.id,
      medplumMembershipId: medplumUser.medplumMembershipId,
    })

    const result = await MedplumProxyService.getProfiles({
      membershipId: medplumUser.medplumMembershipId,
      profileType,
    })
    logger.debug('Profiles fetched', {
      profileType,
      count: Array.isArray(result) ? result.length : undefined,
    })*/

    const result = await MedplumProxyService.getProfilesAdmin({ profileType })

    return result
  }

  /**
   * @show
   * @summary Show all medplum users
   * @responseBody 200 - { "membershipId": "123", "profileType": "Practitioner", profileId: 1 }
   */
  async show({ params }: HttpContext) {
    const profileType = params.profileType as ProfileType
    // const user = await auth.getUserOrFail()

    // const medplumUser = await this.getMedplumUser(user.id)
    return MedplumProxyService.getProfileAdmin({
      profileType,
      profileId: params.id,
    })
  }

  /**
   * @update
   * @summary Update profile data
   * @responseBody 200 - { data: {}, "membershipId": "123", "profileType": "Practitioner", profileId: 1 }
   */
  async update({ auth, params, request, response }: HttpContext) {
    const profileType = params.profileType as ProfileType
    const user = await auth.getUserOrFail()
    if (profileType === 'Practitioner' && requireAdmin(user, response)) return

    const medplumUser = await this.getMedplumUser(user.id)
    return MedplumProxyService.updateProfile({
      data: request.all(),
      membershipId: medplumUser.medplumMembershipId,
      profileId: params.id,
      profileType,
    })
  }

  /**
   * @destroy
   * @summary Deletes an medplum user
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (requireAdmin(user, response)) return

    const target = await User.findOrFail(params.id)
    await cleanupUser(target.email)
  }

  /**
   * @getInfo
   * @summary Gets info
   */
  async getInfo({ params }: HttpContext) {
    const resourceType = params.resourceType

    const medplumUser = await this.getMedplumUser(params.id)

    const content = await MedplumProxyService.getResource(medplumUser.profileId!, resourceType)

    return content
  }
}
