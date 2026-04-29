import { cleanupUser, registerUser } from '#tests/helpers/auth'
import { test } from '@japa/runner'

const TEST_MEDIC = {
  firstName: 'JohnTest',
  surnames: 'DoeTest',
  email: 'medic_reg@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Practitioner',
} as const

const TEST_PATIENT = {
  firstName: 'JaneTest',
  surnames: 'DoeTest',
  email: 'patient_reg@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

const TEST_PATIENT_LOGIN = {
  firstName: 'JaneLogin',
  surnames: 'DoeTest',
  email: 'patient_login@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

// Register - Failures

test.group('Auth - Register - Failures', (group) => {
  group.each.teardown(async () => {
    await cleanupUser(TEST_PATIENT.email)
  })

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

test.group('Auth - Register - Success', (group) => {
  group.each.teardown(async () => {
    await cleanupUser(TEST_PATIENT.email)
    await cleanupUser(TEST_MEDIC.email)
  })

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
    await registerUser(TEST_PATIENT_LOGIN)
  })

  group.each.teardown(async () => {
    await cleanupUser(TEST_PATIENT_LOGIN.email)
  })

  test('logs in with valid credentials', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').json({
      email: TEST_PATIENT_LOGIN.email,
      password: TEST_PATIENT_LOGIN.password,
      passwordConfirmation: TEST_PATIENT_LOGIN.password,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: TEST_PATIENT_LOGIN.email },
      },
    })
    response.assertBodyContains({ data: { token: response.body().data?.token } })
  })

  test('fails with wrong password', async ({ client }) => {
    const response = await client.post('/api/v1/auth/login').json({
      email: TEST_PATIENT_LOGIN.email,
      password: 'wrongpassword',
      passwordConfirmation: 'wrongpassword',
    })

    response.assertStatus(400)
  })
})