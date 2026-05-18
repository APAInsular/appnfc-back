import { UserConditionSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class UserCondition extends UserConditionSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  declare id: number
  declare category: 'allergy' | 'medication' | 'pathology' | 'implant' | 'neuro'
  declare checked: boolean


  declare textValues: string[]
  declare userId: number
}
