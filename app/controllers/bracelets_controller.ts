import Bracelet from '#models/bracelet'
import User from '#models/user'
import {
  assignBraceletValidator,
  banBraceletValidator,
  createBraceletValidator,
} from '#validators/brecelet'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_role.ts'
import { DateTime } from 'luxon'

export default class BraceletsController {
  /**
   * @index
   * @summary List all bracelets
   * @responseBody 200 - <Bracelet[]>.with(user)
   */
  async index({ response }: HttpContext) {
    const bracelets = await Bracelet.query()
      .preload('user', (query) => {
        query.select('id', 'firstName', 'surnames')
      })
      .orderBy('created_at', 'desc')

    return response.json(bracelets)
  }

  /**
   * @store
   * @summary Create a bracelet
   * @responseBody 200 - <BraceletCreated>
   */
  async store({ request, response, auth }: HttpContext) {
    const { model, serial_number } = await request.validateUsing(createBraceletValidator)

    const auth_user = auth.getUserOrFail()

    if (auth_user.role !== UserRole.Admin && auth_user.role !== UserRole.Practitioner) {
      return response.forbidden({ message: 'Access denied.' })
    }

    const newBracelet = await Bracelet.create({
      model,
      state: 'unassigned',
      serialNumber: serial_number,
    })

    await newBracelet.refresh()

    return response.json({
      uid: newBracelet.uid,
    })
  }

  // TODO: Check security of user UUID from params
  /**
   * @banByUid
   * @summary Bans a bracelet
   */
  async banByUid({ params, response, auth }: HttpContext) {
    const bracelet = await Bracelet.findByOrFail('uid', params.braceletUuid)
    
    const auth_user = auth.getUserOrFail()

    if (auth_user.role !== UserRole.Admin && auth_user.role !== UserRole.Practitioner) {
      return response.forbidden({ message: 'Access denied B.' })
    }

    await bracelet
      .merge({
        state: 'banned',
      })
      .save()
  }

  /**
   * @assign
   * @summary Assign a bracelet to an user
   */
  async assign({ request, response, auth }: HttpContext) {
    const { user_uuid, bracelet_uuid } = await request.validateUsing(assignBraceletValidator)

    const auth_user = auth.getUserOrFail()

    const request_user = await User.findByOrFail('uid', user_uuid)

    if (request_user.role === UserRole.Admin) {
      return response.forbidden({ message: 'Access denied A.' })
    }

    if (auth_user.role !== UserRole.Admin && auth_user.role !== UserRole.Practitioner) {
      return response.forbidden({ message: 'Access denied B.' })
    }

    const bracelet = await Bracelet.findByOrFail('uid', bracelet_uuid)

    await bracelet
      .merge({
        userId: request_user.id,
        state: 'assigned',
        assignDate: DateTime.now(),
      })
      .save()
  }

  /**
   * @show
   * @summary Show bracelet by uid
   * @responseBody 200 - <Bracelet>
   */
  async show({ params }: HttpContext) {
    return await Bracelet.findByOrFail('uid', params.userUid)
  }

  /**
   * @showByUser
   * @summary Show bracelet by user uid
   * @responseBody 200 - <Bracelet>
   */
  async showByUser({ params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.userUid)

    return await Bracelet.query()
      .select('uid', 'assign_date', 'serial_number', 'state')
      .where('user_id', user.id)
      .firstOrFail()
  }

  /*async update({ auth, params, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()

    
 
  }*/
}
