import env from "#start/env"
import { NextFn } from "@adonisjs/core/types/http"
import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  async handle(
    { auth, response }: HttpContext,
    next: () => Promise<void>,
    required: string[] = []
  ) {
    const user = auth.user

    if (!user || !required.includes(user.role)) {
      return response.unauthorized({ message: 'Unauthorized' })
    }

    await next()
  }
}