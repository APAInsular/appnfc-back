import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bracelets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('assing_date').notNullable()
      table.string('model')
      table.string('serial_numer')
      table.enum('state', ["unassigned", "assigned", "banned"])
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL').nullable().unique()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}