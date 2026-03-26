import vine from "@vinejs/vine";

export const createBraceletValidator = vine.create(
  {
    user_id: vine.string(),
    table: vine.string(),
    serial_numer: vine.string().minLength(8),
  }
)
