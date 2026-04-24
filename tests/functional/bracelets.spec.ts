import { cleanupUser, loginUser, registerUser } from '#tests/helpers/auth'
import { test } from '@japa/runner'
import { TEST_MEDIC, TEST_PATIENT } from './signup.spec.ts'
import Bracelet from '#models/bracelet'

// test.group('Create a bracelet', (group) => {})

test.group('Bracelet - Index', (group) => {
  let token: string
  let user_uid: string | null = null

  group.each.setup(async () => {
    await registerUser(TEST_MEDIC)
    const { token: t } = await loginUser(TEST_MEDIC.email, TEST_MEDIC.password)
    token = t

    const { user: u } = await registerUser(TEST_PATIENT)
    user_uid = u.uid
  })

  group.each.teardown(async () => {
    await Bracelet.query()
      .whereNotNull('user_id')
      .update({ user_id: null, state: 'unassigned', assign_date: null })
    
    await cleanupUser(TEST_MEDIC.email)
    await cleanupUser(TEST_PATIENT.email)
  })

  test('Creates a bracelet', async ({ client }) => {
    const response = await client
      .post('/api/v1/bracelet/create')
      .header('Authorization', `Bearer ${token}`)
      .json({
        serial_number: 'testtest',
        model: 'Test',
      })

    response.assertStatus(200)
  })

  test('Assigns a bracelet to an user', async ({ client }) => {
    const createResponse = await client
      .post('/api/v1/bracelet/create')
      .header('Authorization', `Bearer ${token}`)
      .json({ serial_number: 'testtest', model: 'Test' })

    createResponse.assertStatus(200)
    const { uid: bracelet_uuid } = createResponse.body()

    const response = await client
      .post('/api/v1/bracelet/assign')
      .header('Authorization', `Bearer ${token}`)
      .json({ user_uuid: user_uid, bracelet_uuid } as any)

    console.log(response.body())

    const deleteResponse = await client
      .patch(`/api/v1/bracelet/ban/${bracelet_uuid}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
  })
})
