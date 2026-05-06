import { BraceletSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import { DateTime } from 'luxon'

export default class Bracelet extends BraceletSchema {
  // @format(uuid)
  // @example(550e8400-e29b-41d4-a716-446655440000)
  declare uid: string

  // @enum(unassigned, assigned, banned)
  declare state: string

  // @example(2024-01-15)
  declare assignDate: DateTime | null

  // @example(ABC123456)
  declare serialNumber: string

  // @example(desfire_EV3_4K)
  declare model: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}