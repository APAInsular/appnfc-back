import Bracelet from '#models/bracelet'
import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import MedplumProxyService from '#services/medplum_proxy_service'
import { TEST_MEDIC, TEST_PATIENT } from '#tests/functional/signup.spec'

const BASE_URL = 'http://localhost:3333/api/v1/auth'

interface RegisterPayload {
  firstName: string
  surnames: string
  email: string
  password: string
  passwordConfirmation: string
  role: string
}

export const registerUser = async (payload: RegisterPayload) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = await response.json()
  
  return { token: body.data.token as string, user: body.data.user }
}

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const body = await response.json()
  return { token: body.data.token as string, user: body.data.user }
}

export const cleanupUser = async (email: string) => {
  const medplumUser = await MedPlumUser.query()
    .whereHas('user', (q) => q.where('email', email))
    .preload('user')
    .first()

  if (medplumUser?.profileId && medplumUser?.medplumMembershipId) {
    await MedplumProxyService.deleteAsAdmin({
      profileId: medplumUser.profileId,
      membershipId: medplumUser.medplumMembershipId,
      profileType: capitalizeProfileType(medplumUser.profileType),
    })
  }

   const user = await User.findBy('email', email)
  if (user) {
    await Bracelet.query().where('user_id', user.id)
      .update({ user_id: null, state: 'unassigned', assign_date: null })
    await user.delete()
  }
}

export const capitalizeProfileType = (type: string): 'Patient' | 'Practitioner' => {
  return (type.charAt(0).toUpperCase() + type.slice(1)) as 'Patient' | 'Practitioner'
}
