import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)

  // @no-swagger
  declare currentAccessToken?: AccessToken

  // @format(uuid)
  // @example(550e8400-e29b-41d4-a716-446655440000)
  declare uid: string

  // @example(Pepito)
  declare firstName: string

  // @example(Perez)
  declare surnames: string

  // @format(email)
  declare email: string

  // @example(Patient) 
  declare role: string

  @beforeCreate()
  static assignUid(user: User) {
    user.uid = randomUUID()
  }

  get initials() {
    const first = this.firstName
    const last = this.surnames
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
