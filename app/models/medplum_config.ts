import { MedplumConfigSchema } from '#database/schema'
import { DateTime } from 'luxon'

export default class MedplumConfig extends MedplumConfigSchema {
  declare id: number
  declare key: string
  declare value: string
  declare description: string | null
  declare createdAt: DateTime<boolean>
  declare updatedAt: DateTime<boolean>
}
