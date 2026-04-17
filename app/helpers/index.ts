import User from '#models/user'
import { UserRole } from '../enums/user_role.ts'
import type { HttpContext } from '@adonisjs/core/http'

export function requireAdmin(user: User, response: HttpContext['response']) {
  if (user.role !== UserRole.Admin) {
    return response.forbidden({ message: 'Forbidden' })
  }
}
