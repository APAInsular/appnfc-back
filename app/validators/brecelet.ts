import vine from '@vinejs/vine'

export const createBraceletValidator = vine.create({
  model: vine.string(),
  serial_number: vine.string().minLength(8),
})

export const assignBraceletValidator = vine.create({
  user_uuid: vine.string().uuid(),
  bracelet_uuid: vine.string().uuid(),
})

export const banBraceletValidator = vine.create({
  bracelet_uuid: vine.string().uuid(),
})