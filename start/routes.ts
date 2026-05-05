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

import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

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

    router
      .post('admin/register-once', [controllers.NewAccount, 'storeAdminOnce'])
      .use(middleware.admin_bootstrap())

    router
      .group(() => {
        router.post('register', [controllers.NewAccount, 'storeAdmin'])
      })
      .prefix('admin')
      .as('admin')
      .use([middleware.auth(), middleware.role(['Admin'])])

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
        // router.put('/:id', [controllers.Bracelets, 'update'])
        router.get('/:uid', [controllers.Bracelets, 'show'])
        router.get('/', [controllers.Bracelets, 'index'])
        router.get('/user/:userUid', [controllers.Bracelets, 'showByUser'])
        router.patch('/ban/:braceletUuid', [controllers.Bracelets, 'banByUid'])
        router.post('/create', [controllers.Bracelets, 'store'])
        router.post('/assign', [controllers.Bracelets, 'assign'])
        router.get('/models', [controllers.Bracelets, 'models'])
      })
      .prefix('bracelet')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/', [controllers.Data, 'show'])
        router.get('/allergies', [controllers.Data, 'allergies'])
        router.get('/medications', [controllers.Data, 'medications'])
        router.get('/pathologies', [controllers.Data, 'pathologies'])
        router.get('/implant-devices', [controllers.Data, 'inplantDevices'])
        router.get('/neurological-status', [controllers.Data, 'neurologicalStatus'])
        router.get('/blood-types', [controllers.Data, 'bloodTypes'])
      })
      .prefix('data')

    router
      .group(() => {
        router.get('/', [controllers.Us, 'show'])
        router.put('/', [controllers.Us, 'update'])
        router.post('/', [controllers.Us, 'store'])
      })
      .prefix('me')
      .use(middleware.auth())

    // ? Medplum Proxy
    router
      .group(() => {
        router
          .group(() => {
            router.get('/:profileType', [controllers.Medplum, 'index'])
            router.get('/:profileType/:id', [controllers.Medplum, 'show'])
            router.put('/:profileType/:id', [controllers.Medplum, 'update'])
            router.delete('/:profileType/:id', [controllers.Medplum, 'destroy'])
          })
          .prefix('profiles')

        router
          .group(() => {
            router.get('/:profileType/:id/:resourceType', [controllers.Medplum, 'getInfo'])
          })
          .prefix('clinical')
      })
      .prefix('proxy')
      .use(middleware.auth())

    router.get('/swagger', async () => {
      return AutoSwagger.default.docs(router.toJSON(), swagger)
    })

    router.get('/docs', async () => {
      return AutoSwagger.default.scalar('/api/v1/swagger')
    })
  })
  .prefix('/api/v1')
