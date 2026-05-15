import TokenService from '#services/token_service'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uid').notNullable().unique().defaultTo(this.raw('gen_random_uuid()'))
      table.string('first_name').notNullable()
      table.string('surnames').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('access_code').notNullable().defaultTo(TokenService.generateAccessCode(8))
      table.enum('role', ['Admin', 'Patient', 'Practitioner']).notNullable().defaultTo('Patient')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
