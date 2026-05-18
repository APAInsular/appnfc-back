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

  @column({
    prepare: (v: string[] | null) => v || [],
    consume: (v: any) => {
      if (!v) return []
      if (typeof v === 'string') {
        try {
          return JSON.parse(v)
        } catch {
          return []
        }
      }
      return v;
    },
  })
  declare textValues: string[]
  declare userId: number
}
