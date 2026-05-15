import crypto from 'node:crypto'

export default class TokenService {
  public static generateAccessCode(): string {
    const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

    const bytes = crypto.randomBytes(8)

    let raw = ''
    for (let i = 0; i < 8; i++) {
      raw += charset[bytes[i] % charset.length]
    }

    return `${raw.slice(0, 4)}-${raw.slice(4, 8)}`
  }
}