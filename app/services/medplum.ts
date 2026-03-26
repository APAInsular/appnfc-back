import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { MedplumClient } from '@medplum/core'

let medplum: MedplumClient

await app.booted(async () => {
  medplum = new MedplumClient({
    baseUrl: env.get('MEDPLUM_URL'),
    clientId: env.get('MEDPLUM_CLIENT_ID'),
    clientSecret: env.get('MEDPLUM_CLIENT_SECRET'),
  })
})

export { medplum as default }