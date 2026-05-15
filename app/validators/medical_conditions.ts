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

export const updateProfile = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    surnames: vine.string().trim(),
    biologicalSex: vine.enum(['M', 'F']),
    language: vine.string().trim().minLength(2).maxLength(5),
    bloodType: vine.string().trim(),
  })
)