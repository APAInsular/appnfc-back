import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import medplum from '#services/medplum'
import MedplumProxyService from '#services/medplum_proxy_service'
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
    const medplumUser = await MedPlumUser.query()
      .whereHas('user', (q) => q.where('email', TEST_USER.email))
      .first()

    if (medplumUser) {
      const profileType = (medplumUser.profileType.charAt(0).toUpperCase() +
        medplumUser.profileType.slice(1)) as 'Patient' | 'Practitioner'

      if (medplumUser.profileId && medplumUser.medplumMembershipId) {
        MedplumProxyService.deletePatient(medplumUser.profileId, medplumUser.medplumMembershipId)
       /*  await medplum.deleteResource(
          profileType as 'Patient' | 'Practitioner',
          medplumUser.profileId
        ) */
      }

/*       if (medplumUser.medplumMembershipId) {
        await medplum.deleteResource('ProjectMembership', medplumUser.medplumMembershipId)
      } */
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
