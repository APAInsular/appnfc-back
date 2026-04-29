import { cleanupUser, loginUser, registerUser } from '#tests/helpers/auth'
import { test } from '@japa/runner'
import Bracelet from '#models/bracelet'

const TEST_MEDIC = {
  firstName: 'JohnBracelet',
  surnames: 'DoeTest',
  email: 'medic_bracelet@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Practitioner',
} as const

const TEST_PATIENT = {
  firstName: 'JaneBracelet',
  surnames: 'DoeTest',
  email: 'patient_bracelet@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

test.group('Bracelet - Index', (group) => {
  let token: string
  let user_uid: string | null = null

  group.setup(async () => {
    await cleanupUser(TEST_MEDIC.email).catch(() => {})
    await cleanupUser(TEST_PATIENT.email).catch(() => {})

    await registerUser(TEST_MEDIC)
    const { token: t } = await loginUser(TEST_MEDIC.email, TEST_MEDIC.password)
    token = t

    const { user: u } = await registerUser(TEST_PATIENT)
    user_uid = u.uid
  })

  group.teardown(async () => {
    await Bracelet.query().where('serial_number', 'testtest').delete()
    await cleanupUser(TEST_MEDIC.email)
    await cleanupUser(TEST_PATIENT.email)
  })

  test('Creates a bracelet', async ({ client }) => {
    const response = await client
      .post('/api/v1/bracelet/create')
      .header('Authorization', `Bearer ${token}`)
      .json({ serial_number: 'testtest', model: 'Test' })

    response.assertStatus(200)
  })

  test('Assigns a bracelet to an user', async ({ client }) => {
    const createResponse = await client
      .post('/api/v1/bracelet/create')
      .header('Authorization', `Bearer ${token}`)
      .json({ serial_number: 'testtest', model: 'Test' })

    createResponse.assertStatus(200)
    const { uid: bracelet_uuid } = createResponse.body()

    const assignResponse = await client
      .post('/api/v1/bracelet/assign')
      .header('Authorization', `Bearer ${token}`)
      .json({ user_uuid: user_uid!, bracelet_uuid })

    assignResponse.assertStatus(200)

    const banResponse = await client
      .patch(`/api/v1/bracelet/ban/${bracelet_uuid}`)
      .header('Authorization', `Bearer ${token}`)

    banResponse.assertStatus(200)
  })
})
