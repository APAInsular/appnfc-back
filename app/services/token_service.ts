import crypto from 'node:crypto'

export default class TokenService {
  public static generateAccessCode(length: number = 8): string {

    const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
    let result = ''
    
    const randomBytes = crypto.randomBytes(length)

    for (let i = 0; i < length; i++) {
      result += charset.charAt(randomBytes[i] % charset.length)
    }

    return result
  }
}