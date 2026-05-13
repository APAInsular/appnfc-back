import { cleanupUser, registerUser } from '#tests/helpers/auth'
import { cleanupPatientConditions } from '#tests/helpers/medplum'
import { test } from '@japa/runner'

const TEST_PATIENT = {
  firstName: 'ConditionTest',
  surnames: 'PatientTest',
  email: 'condition_test@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

const VALID_PAYLOAD = {
  firstName: 'ConditionTest',
  surnames: 'PatientTest',
  biologicalSex: 'M',
  bloodType: 'A+',
  language: 'ES',
  allergies: [],
  medications: ['387207008'],
  pathologies: [],
  inplantDevices: ['14106009', '700448003'],
  neurologicalStatus: [],
}

test.group('Conditions - Store', (group) => {
  let token: string

  group.each.setup(async () => {
    const data = await registerUser(TEST_PATIENT)
    token = data.token
  })

  group.each.teardown(async () => {
    await cleanupPatientConditions(TEST_PATIENT.email)
    await cleanupUser(TEST_PATIENT.email)
  })

  test('fails without auth', async ({ client }) => {
    const response = await client.post('/api/v1/me').json(VALID_PAYLOAD)
    response.assertStatus(401)
  })

  test('fails with missing required fields', async ({ client }) => {
    const response = await client.post('/api/v1/me').bearerToken(token).json({ firstName: 'Only' })

    response.assertStatus(422)
  })

  test('fails with invalid enum', async ({ client }) => {
    const response = await client
      .post('/api/v1/me')
      .bearerToken(token)
      .json({ ...VALID_PAYLOAD, biologicalSex: 'X' })

    response.assertStatus(422)
    response.assertBodyContains({ errors: [{ field: 'biologicalSex' }] })
  })

  test('stores conditions with empty arrays', async ({ client }) => {
    const response = await client.post('/api/v1/me').bearerToken(token).json(VALID_PAYLOAD)

    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('stores conditions with valid snomed codes', async ({ client }) => {
    const response = await client
      .post('/api/v1/me')
      .bearerToken(token)
      .json({
        ...VALID_PAYLOAD,
      })

/*  const response2 = await client
      .get('/api/v1/me')
      .bearerToken(token)

    console.log(response2.body()); */

    response.assertStatus(200)
  })

/*   test('show stored conditions', async ({ client }) => {
    const response = await client
      .get('/api/v1/me')
      .bearerToken(token)

    console.log(response.body());
    
    response.assertStatus(200)
  })
 */
  test('fails with invalid snomed code', async ({ client }) => {
    const response = await client
      .post('/api/v1/me')
      .bearerToken(token)
      .json({ ...VALID_PAYLOAD, allergies: ['000000000'] })

    response.assertStatus(500)
  })
})
