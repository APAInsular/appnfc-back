import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import MedplumProxyService from '#services/medplum_proxy_service'
import { test } from '@japa/runner'

/*  const profileType = (medplumUser.profileType.charAt(0).toUpperCase() +
        medplumUser.profileType.slice(1)) as 'Patient' | 'Practitioner' */

/*  await medplum.deleteResource(
          profileType as 'Patient' | 'Practitioner',
          medplumUser.profileId
        ) */

/*       if (medplumUser.medplumMembershipId) {
        await medplum.deleteResource('ProjectMembership', medplumUser.medplumMembershipId)
      } */

const TEST_MEDIC = {
  firstName: 'John',
  surnames: 'Doe',
  email: 'juan@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

const TEST_PATIENT = {
  firstName: 'John',
  surnames: 'Doe',
  email: 'juan@example.com',
  password: 'secret123',
  passwordConfirmation: 'secret123',
  role: 'Patient',
} as const

const teardown = async () => {
  const medplumUser = await MedPlumUser.query()
    .whereHas('user', (q) => q.where('email', TEST_MEDIC.email))
    .first()

  if (medplumUser) {
    if (medplumUser.profileId && medplumUser.medplumMembershipId) {
      MedplumProxyService.deleteAsAdmin({
        profileId: medplumUser.profileId,
        membershipId: medplumUser.medplumMembershipId,
        profileType: 'Patient',
      })
    }
  }

  await User.query().where('email', TEST_MEDIC.email).delete()
  await MedPlumUser.query()
    .whereHas('user', (q) => q.where('email', TEST_MEDIC.email))
    .delete()
}

test.group('Auth - Signup fails', (group) => {
  group.each.teardown(teardown)

  test('Fail with invalid email', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      ...TEST_MEDIC,
      email: 'not-an-email',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ field: 'email' }],
    })
  })
})

test.group('Auth - Signup Succesfully', async (group) => {
  group.each.teardown(teardown)

  test('Successfully creates a patient account', async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json(TEST_MEDIC)

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: { email: TEST_MEDIC.email },
        token: response.body().data.token,
      },
    })
  })
})


test.group('Auth - Login', async (group) => {
  group.each.teardown(teardown)


  test('Successfully logins account', async ({ client }) => {

  })
   

  test('Successfully logins and create a patient account', async ({ client }) => {

  })
   

})

