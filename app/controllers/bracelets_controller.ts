import Bracelet from '#models/bracelet'
import User from '#models/user'
import { createBraceletValidator } from '#validators/brecelet'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_role.ts'
import { DateTime } from 'luxon'
import { requireAdmin } from '../helpers/index.ts'

export default class BraceletsController {
  async index({ response }: HttpContext) {
    const bracelets = await Bracelet.query()
      .preload('user', (query) => {
        query.select('id', 'username', 'surnames')
      })
      .orderBy('created_at', 'desc')

    return response.json({ bracelets })
  }

  async store({ request, response, auth }: HttpContext) {
    const { user_id, model, serial_number } = await request.validateUsing(createBraceletValidator)

    const auth_user = auth.getUserOrFail()

    const request_user = await User.findOrFail(user_id)

    if (request_user.role === UserRole.Admin) {
      return response.forbidden({ message: 'Access denied A.' })
    }

    if (auth_user.role !== UserRole.Admin && auth_user.role !== UserRole.Practitioner) {
      return response.forbidden({ message: 'Access denied B.' })
    }

    await Bracelet.create({
      model,
      serialNumer: serial_number,
      userId: request_user.id,
      assignDate: DateTime.now(),
    })
  }

  async show({ params }: HttpContext) {
    return await Bracelet.query()
      .select('id', 'assing_date', 'serial_numer', 'state')
      .where('id', params.id)
      .preload('user', (query) => {
        query.select('id', 'username', 'surnames')
      })
      .firstOrFail()
  }

  async showByUser({ params }: HttpContext) {
    return await Bracelet.query()
      .select('id', 'assing_date', 'serial_numer', 'state')
      .where('user_id', params.userId)
      .preload('user', (query) => {
        query.select('id', 'username', 'surnames')
      })
      .firstOrFail()
  }

  /*async update({ auth, params, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()

    
 
  }*/
}

