import Bracelet from '#models/bracelet'
import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import MedplumProxyService from '#services/medplum_proxy_service'

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
  // console.log('--- [AuthService] Register Start ---')
  // console.log('Payload:', payload)

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // console.log('Response Status:', response.status, response.statusText)

    const body = await response.json()
    // console.log('Response Body:', body)

    if (!response.ok) {
      throw new Error(body.message || 'Error en el registro')
    }

    const token = body.data?.token as string
    const user = body.data?.user

    // console.log('Register Success: User ID', user?.uid)
    // console.log('--- [AuthService] Register End ---')

    return { token, user }
    
  } catch (error) {
    console.error('--- [AuthService] Register Error ---')
    console.error(error)
    throw error 
  }
}

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(`Login failed for ${email}: ${JSON.stringify(body)}`)
  }

  return { token: body.data.token as string, user: body.data.user }
}

export const cleanupUser = async (email: string) => {
  const medplumUser = await MedPlumUser.query()
    .whereHas('user', (q) => q.where('email', email))
    .preload('user')
    .first()

  if (medplumUser?.profileId && medplumUser?.medplumMembershipId) {
    try {
      await MedplumProxyService.deleteAsAdmin({
        profileId: medplumUser.profileId,
        membershipId: medplumUser.medplumMembershipId,
        profileType: capitalizeProfileType(medplumUser.profileType),
      })
    } catch (error) {
      console.error(`[cleanupUser] Medplum delete failed for ${email}:`, error)
      throw error
    }
  } else {
    console.warn(`[cleanupUser] No Medplum record found for ${email}`)
  }

  const user = await User.findBy('email', email)
  if (user) {
    await Bracelet.query()
      .where('user_id', user.id)
      .update({ user_id: null, state: 'unassigned', assign_date: null })

    await user.delete()
  } else {
    console.warn(`[cleanupUser] No local user found for ${email}`)
  }
}

export const capitalizeProfileType = (type: string): 'Patient' | 'Practitioner' => {
  return (type.charAt(0).toUpperCase() + type.slice(1)) as 'Patient' | 'Practitioner'
}
