import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  firstName: vine.string(),
  surnames: vine.string(),
  email: email().unique({ table: 'users', column: 'email' }),
  role: vine.enum(['Patient', 'Practitioner']),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use when performing admin-signup
 */
export const adminSignupValidator = vine.create({
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

