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
  'admin.new_account.store_admin': {
    methods: ["POST"],
    pattern: '/api/v1/admin/register',
    tokens: [{"old":"/api/v1/admin/register","type":0,"val":"api","end":""},{"old":"/api/v1/admin/register","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/register","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['admin.new_account.store_admin']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'bracelets.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/:uid',
    tokens: [{"old":"/api/v1/bracelet/:uid","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/:uid","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/:uid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/:uid","type":1,"val":"uid","end":""}],
    types: placeholder as Registry['bracelets.show']['types'],
  },
  'bracelets.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet',
    tokens: [{"old":"/api/v1/bracelet","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet","type":0,"val":"bracelet","end":""}],
    types: placeholder as Registry['bracelets.index']['types'],
  },
  'bracelets.show_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/user/:userUid',
    tokens: [{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"user","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['bracelets.show_by_user']['types'],
  },
  'bracelets.ban_by_uid': {
    methods: ["PATCH"],
    pattern: '/api/v1/bracelet/ban/:braceletUuid',
    tokens: [{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"ban","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":1,"val":"braceletUuid","end":""}],
    types: placeholder as Registry['bracelets.ban_by_uid']['types'],
  },
  'bracelets.store': {
    methods: ["POST"],
    pattern: '/api/v1/bracelet/create',
    tokens: [{"old":"/api/v1/bracelet/create","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/create","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/create","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['bracelets.store']['types'],
  },
  'bracelets.assign': {
    methods: ["POST"],
    pattern: '/api/v1/bracelet/assign',
    tokens: [{"old":"/api/v1/bracelet/assign","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/assign","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/assign","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/assign","type":0,"val":"assign","end":""}],
    types: placeholder as Registry['bracelets.assign']['types'],
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
