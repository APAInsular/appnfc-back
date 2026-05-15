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
        router
          .get('/', [controllers.Profile, 'index'])
          .use(middleware.role(['Admin', 'Practitioner']))
        router.get('/profile', [controllers.Profile, 'show'])
        router.get('/by-email/:email', [controllers.Profile, 'byEmail'])
        router.put('/profile', [controllers.Profile, 'updateProfile']) .use(middleware.role(['Patient']))
        router.put('/profile/uid/:userUid', [controllers.Profile, 'updateProfileByUid']) .use(middleware.role(['Practitioner']))
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
        router.get('/', [controllers.MedicalConditions, 'show']).use(middleware.role(['Patient']))
        router.get('/catalog', [controllers.MedicalConditions, 'showCatalog'])
        router
          .get('/uid/:userUid', [controllers.MedicalConditions, 'showByUid'])
          .use(middleware.role(['Practitioner', 'Admin']))
        router
          .get('/bracelet/:braceletUid', [controllers.MedicalConditions, 'showByBraceletUid'])
          .use(middleware.role(['Practitioner', 'Admin']))

        router.put('/', [controllers.MedicalConditions, 'update']).use(middleware.role(['Patient']))
        router
          .put('/uid/:userUid', [controllers.MedicalConditions, 'updateByUid'])
          .use(middleware.role(['Practitioner', 'Admin']))
      })
      .prefix('medical-conditions')
      .use(middleware.auth())

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
