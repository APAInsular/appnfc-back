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
  'new_account.store_admin_once': {
    methods: ["POST"],
    pattern: '/api/v1/admin/register-once',
    tokens: [{"old":"/api/v1/admin/register-once","type":0,"val":"api","end":""},{"old":"/api/v1/admin/register-once","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/register-once","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/register-once","type":0,"val":"register-once","end":""}],
    types: placeholder as Registry['new_account.store_admin_once']['types'],
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
  'bracelets.models': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/models',
    tokens: [{"old":"/api/v1/bracelet/models","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/models","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/models","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/models","type":0,"val":"models","end":""}],
    types: placeholder as Registry['bracelets.models']['types'],
  },
  'data.allergies': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/data/allergies',
    tokens: [{"old":"/api/v1/data/allergies","type":0,"val":"api","end":""},{"old":"/api/v1/data/allergies","type":0,"val":"v1","end":""},{"old":"/api/v1/data/allergies","type":0,"val":"data","end":""},{"old":"/api/v1/data/allergies","type":0,"val":"allergies","end":""}],
    types: placeholder as Registry['data.allergies']['types'],
  },
  'data.medications': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/data/medications',
    tokens: [{"old":"/api/v1/data/medications","type":0,"val":"api","end":""},{"old":"/api/v1/data/medications","type":0,"val":"v1","end":""},{"old":"/api/v1/data/medications","type":0,"val":"data","end":""},{"old":"/api/v1/data/medications","type":0,"val":"medications","end":""}],
    types: placeholder as Registry['data.medications']['types'],
  },
  'data.pathologies': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/data/pathologies',
    tokens: [{"old":"/api/v1/data/pathologies","type":0,"val":"api","end":""},{"old":"/api/v1/data/pathologies","type":0,"val":"v1","end":""},{"old":"/api/v1/data/pathologies","type":0,"val":"data","end":""},{"old":"/api/v1/data/pathologies","type":0,"val":"pathologies","end":""}],
    types: placeholder as Registry['data.pathologies']['types'],
  },
  'data.inplant_devices': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/data/implant-devices',
    tokens: [{"old":"/api/v1/data/implant-devices","type":0,"val":"api","end":""},{"old":"/api/v1/data/implant-devices","type":0,"val":"v1","end":""},{"old":"/api/v1/data/implant-devices","type":0,"val":"data","end":""},{"old":"/api/v1/data/implant-devices","type":0,"val":"implant-devices","end":""}],
    types: placeholder as Registry['data.inplant_devices']['types'],
  },
  'data.neurological_status': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/data/neurological-status',
    tokens: [{"old":"/api/v1/data/neurological-status","type":0,"val":"api","end":""},{"old":"/api/v1/data/neurological-status","type":0,"val":"v1","end":""},{"old":"/api/v1/data/neurological-status","type":0,"val":"data","end":""},{"old":"/api/v1/data/neurological-status","type":0,"val":"neurological-status","end":""}],
    types: placeholder as Registry['data.neurological_status']['types'],
  },
  'us.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/me',
    tokens: [{"old":"/api/v1/me","type":0,"val":"api","end":""},{"old":"/api/v1/me","type":0,"val":"v1","end":""},{"old":"/api/v1/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['us.show']['types'],
  },
  'us.update': {
    methods: ["PUT"],
    pattern: '/api/v1/me',
    tokens: [{"old":"/api/v1/me","type":0,"val":"api","end":""},{"old":"/api/v1/me","type":0,"val":"v1","end":""},{"old":"/api/v1/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['us.update']['types'],
  },
  'us.store': {
    methods: ["POST"],
    pattern: '/api/v1/me',
    tokens: [{"old":"/api/v1/me","type":0,"val":"api","end":""},{"old":"/api/v1/me","type":0,"val":"v1","end":""},{"old":"/api/v1/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['us.store']['types'],
  },
  'medplum.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/profiles/:profileType',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":1,"val":"profileType","end":""}],
    types: placeholder as Registry['medplum.index']['types'],
  },
  'medplum.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/profiles/:profileType/:id',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.show']['types'],
  },
  'medplum.update': {
    methods: ["PUT"],
    pattern: '/api/v1/proxy/profiles/:profileType/:id',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.update']['types'],
  },
  'medplum.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/proxy/profiles/:profileType/:id',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.destroy']['types'],
  },
  'medplum.get_info': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/clinical/:profileType/:id/:resourceType',
    tokens: [{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":0,"val":"clinical","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":1,"val":"id","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:id/:resourceType","type":1,"val":"resourceType","end":""}],
    types: placeholder as Registry['medplum.get_info']['types'],
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
