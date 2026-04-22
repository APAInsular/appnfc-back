/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'bracelets.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet',
    tokens: [{"old":"/api/v1/bracelet","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet","type":0,"val":"bracelet","end":""}],
    types: placeholder as Registry['bracelets.index']['types'],
  },
  'bracelets.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/:id',
    tokens: [{"old":"/api/v1/bracelet/:id","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/:id","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['bracelets.show']['types'],
  },
  'bracelets.show_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/user/:userId',
    tokens: [{"old":"/api/v1/bracelet/user/:userId","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/user/:userId","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/user/:userId","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/user/:userId","type":0,"val":"user","end":""},{"old":"/api/v1/bracelet/user/:userId","type":1,"val":"userId","end":""}],
    types: placeholder as Registry['bracelets.show_by_user']['types'],
  },
  'bracelets.store': {
    methods: ["POST"],
    pattern: '/api/v1/bracelet/assign',
    tokens: [{"old":"/api/v1/bracelet/assign","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/assign","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/assign","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/assign","type":0,"val":"assign","end":""}],
    types: placeholder as Registry['bracelets.store']['types'],
  },
  'medplum.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/medplum/:profileType',
    tokens: [{"old":"/api/v1/proxy/medplum/:profileType","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/medplum/:profileType","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/medplum/:profileType","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/medplum/:profileType","type":0,"val":"medplum","end":""},{"old":"/api/v1/proxy/medplum/:profileType","type":1,"val":"profileType","end":""}],
    types: placeholder as Registry['medplum.index']['types'],
  },
  'medplum.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/medplum/:profileType/:id',
    tokens: [{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"medplum","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.show']['types'],
  },
  'medplum.update': {
    methods: ["PUT"],
    pattern: '/api/v1/proxy/medplum/:profileType/:id',
    tokens: [{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"medplum","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.update']['types'],
  },
  'medplum.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/proxy/medplum/:profileType/:id',
    tokens: [{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":0,"val":"medplum","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/medplum/:profileType/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
