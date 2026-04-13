import vine from "@vinejs/vine";

export const idParamValidator = vine.create(
  {
    id: vine.number().positive(),
  }
)
