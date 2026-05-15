import vine from '@vinejs/vine'

export const updateConditions = vine.compile(
  vine.object({
    conditions: vine.array(
      vine.object({
        code: vine.string(),
        textValues: vine.array(vine.string()),
      })
    ),
  })
)