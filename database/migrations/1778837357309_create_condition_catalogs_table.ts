import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'condition_catalogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable().unique()
      table.string('display').notNullable()
      table.enum('category', ['allergy', 'medication', 'pathology', 'implant', 'neuro']).notNullable()
      table.boolean('allows_text').defaultTo(false)
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}