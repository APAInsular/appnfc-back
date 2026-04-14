import type { HttpContext } from '@adonisjs/core/http'
import MedplumProxyService from '#services/medplum_proxy_service'
import MedPlumUser from '#models/med_plum_user'
import { UserRole } from '../enums/user_role.ts'
import User from '#models/user'
import { cleanupUser } from '#tests/helpers/auth'
import { requireAdmin } from '../helpers/index.ts'

type ProfileType = 'Patient' | 'Practitioner'

export default class MedplumController {
  private async getMedplumUser(userId: number) {
    return MedPlumUser.findByOrFail('userId', userId)
  }

  // GET /medplum/:profileType
  async index({ auth, params, response }: HttpContext) {
    const profileType = params.profileType as ProfileType
    const user = await auth.getUserOrFail()
    if (profileType === 'Practitioner' && requireAdmin(user, response)) return

    const medplumUser = await this.getMedplumUser(user.id)
    return MedplumProxyService.getProfiles({ membershipId: medplumUser.medplumMembershipId, profileType })
  }

  // GET /medplum/:profileType/:id
  async show({ auth, params, response }: HttpContext) {
    const profileType = params.profileType as ProfileType
    const user = await auth.getUserOrFail()
    if (profileType === 'Practitioner' && requireAdmin(user, response)) return

    const medplumUser = await this.getMedplumUser(user.id)
    return MedplumProxyService.getProfile({ membershipId: medplumUser.medplumMembershipId, profileType, profileId: params.id })
  }

  // PUT /medplum/:profileType/:id
  async update({ auth, params, request, response }: HttpContext) {
    const profileType = params.profileType as ProfileType
    const user = await auth.getUserOrFail()
    if (profileType === 'Practitioner' && requireAdmin(user, response)) return

    const medplumUser = await this.getMedplumUser(user.id)
    return MedplumProxyService.updateProfile({ data: request.all(), membershipId: medplumUser.medplumMembershipId, profileId: params.id, profileType })
  }

  // DELETE /medplum/:profileType/:id
  async destroy({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (requireAdmin(user, response)) return

    const target = await User.findOrFail(params.id)
    await cleanupUser(target.email)
  }
}