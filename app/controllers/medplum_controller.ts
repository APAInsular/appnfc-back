import type { HttpContext } from '@adonisjs/core/http'
import MedplumProxyService from '#services/medplum_proxy_service'
import MedPlumUser from '#models/med_plum_user'
import { UserRole } from '../enums/user_role.ts'

export default class MedplumController {
  // GET /medplum/patients
  async indexPatients({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    return MedplumProxyService.getPatients(medplumUser.medplumMembershipId)
  }

  // GET /medplum/practitioners
  async indexPractitioners({ auth, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (user.role !== UserRole.Admin) {
      return response.forbidden({ message: 'Forbidden' })
    }
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    return MedplumProxyService.getPractitioners(medplumUser.medplumMembershipId)
  }

  // GET /medplum/patients/:id
  async showPatient({ auth, params}: HttpContext) {
    const user = await auth.getUserOrFail()
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    return MedplumProxyService.getPatient(params.id, medplumUser.medplumMembershipId)
  }

  // GET /medplum/practitioners/:id
  async showPractitioner({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (user.role !== UserRole.Admin) {
      return response.forbidden({ message: 'Forbidden' })
    }
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    return MedplumProxyService.getPractitioner(params.id, medplumUser.medplumMembershipId)
  }

  // PUT /medplum/patients/:id
  async updatePatient({ auth, params, request }: HttpContext) {
    const user = await auth.getUserOrFail()
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    const data = request.all()
    return MedplumProxyService.updatePatient(params.id, data, medplumUser.medplumMembershipId)
  }

  // PUT /medplum/practitioners/:id
  async updatePractitioner({ auth, params, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (user.role !== UserRole.Admin) {
      return response.forbidden({ message: 'Forbidden' })
    }
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    const data = request.all()
    return MedplumProxyService.updatePractitioner(params.id, data, medplumUser.medplumMembershipId)
  }

  // DELETE /medplum/patients/:id
  async destroyPatient({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (user.role !== UserRole.Admin) {
      return response.forbidden({ message: 'Forbidden' })
    }
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    return MedplumProxyService.deletePatient(params.id, medplumUser.medplumMembershipId)
  }

  // DELETE /medplum/practitioners/:id
  async destroyPractitioner({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    if (user.role !== UserRole.Admin) {
      return response.forbidden({ message: 'Forbidden' })
    }
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)
    return MedplumProxyService.deletePractitioner(params.id, medplumUser.medplumMembershipId)
  }
}