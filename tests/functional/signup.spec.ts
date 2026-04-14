import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import MedplumProxyService from '#services/medplum_proxy_service'
import { test } from '@japa/runner'

const TEST_MEDIC = {
  firstName: 'John',
  surnames: 'Doe',
  email: 'medic@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Practitioner',
} as const

const TEST_PATIENT = {
  firstName: 'Jane',
  surnames: 'Doe',
  email: 'patient@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

const capitalizeProfileType = (type: string): 'Patient' | 'Practitioner' => {
  return (type.charAt(0).toUpperCase() + type.slice(1)) as 'Patient' | 'Practitioner'
}


const registerUser = async (payload: typeof TEST_PATIENT) => {
  return fetch('http://localhost:3333/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

const cleanupUser = async (email: string) => {
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

  await User.query().where('email', email).delete()
}

const teardown = async () => {
  await cleanupUser(TEST_MEDIC.email)
  await cleanupUser(TEST_PATIENT.email)
}

// Register - Failures

test.group('Auth - Register', (group) => {
  group.each.teardown(teardown)

  test('fails with invalid email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      ...TEST_PATIENT,
      email: 'not-an-email',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ field: 'email' }],
    })
  })

  test('fails with mismatched passwords', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      ...TEST_PATIENT,
      passwordConfirmation: 'wrong',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ field: 'passwordConfirmation' }],
    })
  })
})

// Register - Success

test.group('Auth - Register', (group) => {
  group.each.teardown(teardown)

  test('creates a patient account', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json(TEST_PATIENT)

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: TEST_PATIENT.email },
      },
    })
    response.assertBodyContains({ data: { token: response.body().data?.token } })
  })

  test('creates a practitioner account', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json(TEST_MEDIC)

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: TEST_MEDIC.email },
      },
    })
  })
})

// Login - Success

test.group('Auth - Login', (group) => {
  group.each.setup(async () => {
    await registerUser(TEST_PATIENT)
  })
  group.each.teardown(teardown)

  test('logs in with valid credentials', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').json({
      email: TEST_PATIENT.email,
      password: TEST_PATIENT.password,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: TEST_PATIENT.email },
      },
    })
    response.assertBodyContains({ data: { token: response.body().data?.token } })
  })

  test('fails with wrong password', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').json({
      email: TEST_PATIENT.email,
      password: 'wrongpassword',
    })

    response.assertStatus(400)
  })
})
