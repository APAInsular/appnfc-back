import { cleanupUser, loginUser, registerUser } from '#tests/helpers/auth'
import { test } from '@japa/runner'
import { TEST_MEDIC, TEST_PATIENT } from './signup.spec.ts'

// test.group('Create a bracelet', (group) => {})

test.group('Assign a bracelet', (group) => {
  let token: string
  let user_id: number | null = null
  group.each.setup(async () => {
    await registerUser(TEST_MEDIC)
    const { token: t } = await loginUser(TEST_MEDIC.email, TEST_MEDIC.password)
    token = t

    const { user: u } = await registerUser(TEST_PATIENT)
    user_id = u.id
  })

  group.each.teardown(async () => {
    await cleanupUser(TEST_MEDIC.email)
    await cleanupUser(TEST_PATIENT.email)
  })

  test('creates an bracelete', async ({ client }) => {
    const response = await client
      .post('/api/v1/bracelet/assign')
      .header('Authorization', `Bearer ${token}`)
      .json({
        user_id,
        serial_number: 'testtest',
        model: 'Test',
      })

    console.log(response.body())

    response.assertStatus(200)
  })
})
