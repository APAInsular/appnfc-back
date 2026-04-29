import env from "#start/env"
import { NextFn } from "@adonisjs/core/types/http"
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminBootstrapSecretMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const secret = request.header('x-admin-secret')
    if (!secret || secret !== env.get('ADMIN_BOOTSTRAP_SECRET')) {
      return response.unauthorized({ message: 'Unauthorized' })
    }
    await next()
  }
}