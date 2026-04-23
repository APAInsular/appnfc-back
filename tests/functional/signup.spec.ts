
import { cleanupUser, registerUser } from '#tests/helpers/auth'
import { test } from '@japa/runner'

export const TEST_MEDIC = {
  firstName: 'John3',
  surnames: 'Doe3',
  email: 'medic3@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Practitioner',
} as const

export const TEST_PATIENT = {
  firstName: 'Jane2',
  surnames: 'Doe',
  email: 'patient2@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const


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
