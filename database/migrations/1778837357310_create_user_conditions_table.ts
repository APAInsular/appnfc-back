import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_conditions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('catalog_id').unsigned().references('id').inTable('condition_catalogs').onDelete('CASCADE').notNullable()
      table.boolean('checked').defaultTo(false)
      table.jsonb('text_values').nullable()
      table.timestamps()
      table.unique(['user_id', 'catalog_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}