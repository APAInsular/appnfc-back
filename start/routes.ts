/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // ? Auth routes
    router
      .group(() => {
        router.post('register', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    // ? Profile management routes
    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    // ? Bracelets routes
    router
      .group(() => {
        router.get('/', [controllers.Bracelets, 'index'])
        router.get('/:id', [controllers.Bracelets, 'show'])
        router.get('/user/:userId', [controllers.Bracelets, 'showByUser'])
        router.post('/', [controllers.Bracelets, 'store'])
      })
      .prefix('bracelet')
      .use(middleware.auth())

    // ? Medplum Proxy
    router
      .group(() => {
        router.get('/practitioners', [controllers.Medplum, 'indexPractitioners'])
        router.get('/practitioners/:id', [controllers.Medplum, 'showPractitioner'])
        router.put('/practitioners/:id', [controllers.Medplum, 'updatePractitioner'])
        router.delete('/practitioners/:id', [controllers.Medplum, 'destroyPractitioner'])

        router.get('/patients', [controllers.Medplum, 'indexPatients'])
        router.get('/patients/:id', [controllers.Medplum, 'showPatient'])
        router.put('/patients/:id', [controllers.Medplum, 'updatePatient'])
        router.delete('/patients/:id', [controllers.Medplum, 'destroyPatient'])
      })
      .prefix('proxy')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
