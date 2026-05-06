import MedPlumUser from "#models/med_plum_user"
import User from "#models/user"
import medplum from "#services/medplum"
import MedplumProxyService from "#services/medplum_proxy_service"

export async function cleanupPatientConditions(email: string) {
  const user = await User.findBy('email', email)
  if (!user) return
  const medplumUser = await MedPlumUser.findBy('userId', user.id)
  if (!medplumUser) return

  const conditions = await MedplumProxyService.getResource(medplumUser.medplumUserId!, 'Condition')
  await Promise.all(
    conditions.map((c) => medplum.deleteResource('Condition', c.id!))
  )
}