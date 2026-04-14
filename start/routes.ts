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
import { MedplumClient } from '@medplum/core';

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
        router.put('/:id', [controllers.Bracelets, 'update'])
        router.post('/assign', [controllers.Bracelets, 'store'])
      })
      .prefix('bracelet')
      .use(middleware.auth())

    // ? Medplum Proxy
    router
      .group(() => {
        router.get('/medplum/:profileType', [controllers.Medplum, 'index'])
        router.get('/medplum/:profileType/:id', [controllers.Medplum, 'show'])
        router.put('/medplum/:profileType/:id', [controllers.Medplum, 'update'])
        router.delete('/medplum/:profileType/:id', [controllers.Medplum, 'destroy'])
      })
      .prefix('proxy')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
