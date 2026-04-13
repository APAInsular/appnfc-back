import Bracelet from '#models/bracelet'
import User from '#models/user'
import { createBraceletValidator } from '#validators/brecelet'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_role.ts'

export default class BraceletsController {
  async index({ response }: HttpContext) {
    const bracelets = await Bracelet.query()
      .preload('user', (query) => {
        query.select('id', 'username', 'surnames')
      })
      .orderBy('created_at', 'desc')

    return response.json({ bracelets })
  }

  async store({ request, response }: HttpContext) {
    const { user_id, ...data } = await request.validateUsing(createBraceletValidator)

    const user = await User.findOrFail(user_id)

    if (user.role === UserRole.Admin) {
      return response.forbidden({ message: 'Admins cannot have a bracelet.' })
    }

    await Bracelet.create({
      ...data,
      userId: user.id,
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
}
