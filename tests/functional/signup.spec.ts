import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import MedplumProxyService from '#services/medplum_proxy_service'
import { test } from '@japa/runner'

test.group('Auth - Signup', (group) => {
  group.each.teardown(async () => {
    try {
      const user = await User.findBy('email', 'juan4@example.com')
      console.log('Found user:', user)

      if (!user) return

      const medplumUser = await MedPlumUser.findBy('user_id', user.id)
      if (medplumUser) {
console.log('profileId:', medplumUser.profileId)
console.log('medplumUserId:', medplumUser.medplumUserId)
console.log('medplumMembershipId:', medplumUser.medplumMembershipId)

        await MedplumProxyService.deletePatient(
          medplumUser.profileId!,
          medplumUser.medplumMembershipId!,
          medplumUser.medplumUserId!
        )
        await medplumUser.delete()
      }

      await user.delete()
    } catch (e) {
      console.error('teardown error:', e)
    }
  })

  /*   test('Fail create a session due to missing fields', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      email: '',
      firstName: '',
      password: '',
      passwordConfirmation: '',
      role: 'Patient',
      surnames: '',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        { field: 'firstName' },
        { field: 'email' },
        { field: 'password' },
        { field: 'role' },
      ],
    })
  })
 */
  test('Fail with invalid email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      firstName: 'John',
      surnames: 'Doe',
      email: 'not-an-email',
      password: 'secret123',
      passwordConfirmation: 'secret123',
      role: 'Patient',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ field: 'email' }],
    })
  })

  test('Successfully creates account', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      firstName: 'John',
      surnames: 'Doe',
      email: 'juan4@example.com',
      password: 'secret123',
      passwordConfirmation: 'secret123',
      role: 'Patient',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: 'juan4@example.com' },
        token: response.body().data.token,
      },
    })
  })
})
