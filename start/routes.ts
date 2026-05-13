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
        router.get('/', [controllers.Profile, 'index']).use(middleware.role(['Admin', 'Practitioner']))
        router.get('/profile', [controllers.Profile, 'show'])
        router.get('/by-email/:email', [controllers.Profile, 'byEmail'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    // ? Bracelets routes
    router
      .group(() => {
        // router.put('/:id', [controllers.Bracelets, 'update'])
        router.get('/', [controllers.Bracelets, 'index'])
        router.get('/models', [controllers.Bracelets, 'models'])
        router.get('/user/:userUid', [controllers.Bracelets, 'showByUser'])
        router.get('/:uid', [controllers.Bracelets, 'show'])

        router.post('/create', [controllers.Bracelets, 'store'])
        router.post('/assign', [controllers.Bracelets, 'assign'])

        router.patch('/ban/:braceletUuid', [controllers.Bracelets, 'banByUid'])
      })
      .prefix('bracelet')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/allergies', [controllers.Data, 'allergies'])
        router.get('/medications', [controllers.Data, 'medications'])
        router.get('/pathologies', [controllers.Data, 'pathologies'])
        router.get('/implant-devices', [controllers.Data, 'inplantDevices'])
        router.get('/neurological-status', [controllers.Data, 'neurologicalStatus'])
        // router.get('/blood-types', [controllers.Data, 'bloodTypes'])
      })
      .prefix('data')

    router
      .group(() => {
        router.get('/', [controllers.Us, 'show'])
        router.get('/uid/:userUid', [controllers.Us, 'showByUid'])
        router.get('/bracelet/:braceletUid', [controllers.Us, 'showByBraceletUid'])

        router.put('/', [controllers.Us, 'update'])
        router.post('/', [controllers.Us, 'store'])
        router.put('/uid/:userUid', [controllers.Us, 'updateByUid'])
        router.post('/uid/:userUid', [controllers.Us, 'storeByUid'])
      })
      .prefix('me')
      .use([middleware.auth(), middleware.role(['Patient', 'Practitioner'])])

    // ? Medplum Proxy
    router
      .group(() => {
        router
          .group(() => {
            router
              .get('/:profileType/:userUid', [controllers.Medplum, 'show'])
              .use(middleware.role(['Admin', 'Practitioner']))

            router
              .get('/:profileType', [controllers.Medplum, 'index'])
              .use(middleware.role(['Admin', 'Practitioner']))

            router
              .put('/:profileType/:userUid', [controllers.Medplum, 'update'])
              .use(middleware.role(['Admin', 'Practitioner']))

            router
              .delete('/:profileType/:userUid', [controllers.Medplum, 'destroy'])
              .use(middleware.role(['Admin']))
          })
          .prefix('profiles')

        router
          .group(() => {
            router.get('/:profileType/:userUid/:resourceType', [controllers.Medplum, 'getInfo'])
          })
          .prefix('clinical')
          .use(middleware.role(['Admin', 'Practitioner']))
      })
      .prefix('proxy')
      .use([middleware.auth()])

    router.get('/swagger', async () => {
      return AutoSwagger.default.docs(router.toJSON(), swagger)
    })

    router.get('/docs', async () => {
      return AutoSwagger.default.scalar('/api/v1/swagger')
    })
  })
  .prefix('/api/v1')
