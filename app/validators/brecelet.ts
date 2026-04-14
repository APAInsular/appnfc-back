import vine from '@vinejs/vine'

export const createBraceletValidator = vine.create({
  user_id: vine.number().positive(),
  model: vine.string(),
  serial_number: vine.string().minLength(8),
})
