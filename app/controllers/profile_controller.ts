import MedPlumUser from '#models/med_plum_user'
import User from '#models/user'
import MedplumProxyService from '#services/medplum_proxy_service'
import UserTransformer from '#transformers/user_transformer'
import { updateProfile } from '#validators/medical_conditions'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  /**
   * @show
   * @summary Get your account data
   */
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }

  /**
   * @index
   * @summary Get a list of all existing accounts
   */
  async index({}: HttpContext) {
    return await UserTransformer.transform(await User.all())
  }


  /**
  * @showAccessCode
  * @summary Show access code to the user that owns it
  */
  async showAccessCode({ auth }: HttpContext) {
    return auth.getUserOrFail().accessCode
  }


  /**
   * @byEmail
   * @summary Find a user by email
   */
  async byEmail({ params }: HttpContext) {
    const user = await User.findByOrFail('email', params.email)
    return new UserTransformer(user).toObject()
  }

   /**
   * @updateProfile
   * @summary Update patient FHIR profile
   * @requestBody <updateProfile>
   * @responseBody 200 - {}
   */
  async updateProfile({ auth, request }: HttpContext) {
    const { firstName, surnames, biologicalSex, language, bloodType } =
      await request.validateUsing(updateProfile)

    const user = await auth.getUserOrFail()
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)

    await MedplumProxyService.updateProfile({
      profileType: 'Patient',
      profileId: medplumUser.profileId!,
      membershipId: medplumUser.medplumMembershipId,
      data: {
        name: [{ family: surnames, given: [firstName] }],
        gender: biologicalSex === 'M' ? 'male' : 'female',
        communication: [
          { language: { coding: [{ system: 'urn:ietf:bcp:47', code: language.toLowerCase() }] } },
        ],
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/patient-bloodType',
            valueCodeableConcept: {
              coding: [{ system: 'http://snomed.info/sct', code: bloodType }],
            },
          },
        ],
      },
    })

    return {}
  }

  /**
   * @updateProfileByUid
   * @summary Update patient FHIR profile by user UID
   * @requestBody <updateProfile>
   * @responseBody 200 - {}
   */
  async updateProfileByUid({ request, params }: HttpContext) {
    const { firstName, surnames, biologicalSex, language, bloodType } =
      await request.validateUsing(updateProfile)

    const user = await User.findByOrFail('uid', params.userUid)
    const medplumUser = await MedPlumUser.findByOrFail('userId', user.id)

    await MedplumProxyService.updateProfile({
      profileType: 'Patient',
      profileId: medplumUser.profileId!,
      membershipId: medplumUser.medplumMembershipId,
      data: {
        name: [{ family: surnames, given: [firstName] }],
        gender: biologicalSex === 'M' ? 'male' : 'female',
        communication: [
          { language: { coding: [{ system: 'urn:ietf:bcp:47', code: language.toLowerCase() }] } },
        ],
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/patient-bloodType',
            valueCodeableConcept: {
              coding: [{ system: 'http://snomed.info/sct', code: bloodType }],
            },
          },
        ],
      },
    })

    return {}
  }
}
