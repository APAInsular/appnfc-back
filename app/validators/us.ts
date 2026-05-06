import vine from '@vinejs/vine'

export const storeCondition = vine.create({
  allergies: vine.array(vine.string()),
  medications: vine.array(vine.string()),
  pathologies: vine.array(vine.string()),
  inplantDevices: vine.array(vine.string()),
  neurologicalStatus: vine.array(vine.string()),

  firstName: vine.string(),
  surnames: vine.string(),
  language: vine.enum(["ES", "EN"]),
  biologicalSex: vine.enum(["M", "F"]),
  bloodType: vine.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"])

})
