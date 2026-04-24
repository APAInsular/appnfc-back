import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bracelets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uid').notNullable().unique().defaultTo(this.raw('gen_random_uuid()'))
      table.date('assign_date').nullable()
      table.string('model').nullable()
      table.string('serial_number').nullable()
      table.enum('state', ['unassigned', 'assigned', 'banned']).defaultTo('unassigned')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .nullable()
        .unique()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    // * Avoids assigned state without user_id assigned
    this.schema.raw(`
    ALTER TABLE ${this.tableName}
    ADD CONSTRAINT chk_assigned_user
    CHECK (
      (state = 'assigned' AND user_id IS NOT NULL) OR
      (state != 'assigned')
    )
  `)
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
