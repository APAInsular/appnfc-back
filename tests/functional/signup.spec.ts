import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import medplum from '#services/medplum'
import env from '#start/env'
import { test } from '@japa/runner'

const TEST_USER = {
  firstName: 'John',
  surnames: 'Doe',
  email: 'juan@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

test.group('Auth - Signup', (group) => {
  group.each.teardown(async () => {
    const memberships = await medplum.searchResources('ProjectMembership', {
      project: `Project/${env.get('MEDPLUM_PROJECT_ID')}`,
    })

    const testMemberships = memberships.filter(
      (m) => (m.profile as any)?.display === TEST_USER.email
        || (m.user as any)?.display === TEST_USER.email
    )

    for (const m of testMemberships) {
      await medplum.deleteResource('ProjectMembership', m.id!)
    }

    await User.query().where('email', TEST_USER.email).delete()
    await MedPlumUser.query()
      .whereHas('user', (q) => q.where('email', TEST_USER.email))
      .delete()
  })

  test('Fail with invalid email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      ...TEST_USER,
      email: 'not-an-email',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ field: 'email' }],
    })
  })

  test('Successfully creates account', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json(TEST_USER)
    console.log(response.body())

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: TEST_USER.email },
        token: response.body().data.token,
      },
    })
  })
})