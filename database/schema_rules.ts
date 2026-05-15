import { type SchemaRules } from '@adonisjs/lucid/types/schema_generator'

export default {
  tables: {
    user_conditions: {
      columns: {
        text_values: {
          decorator: '@column',
          tsType: 'string[] | null',
        },
      },
    },
  },
} satisfies SchemaRules