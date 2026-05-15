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
  'profile.profile.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account',
    tokens: [{"old":"/api/v1/account","type":0,"val":"api","end":""},{"old":"/api/v1/account","type":0,"val":"v1","end":""},{"old":"/api/v1/account","type":0,"val":"account","end":""}],
    types: placeholder as Registry['profile.profile.index']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.profile.by_email': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/by-email/:email',
    tokens: [{"old":"/api/v1/account/by-email/:email","type":0,"val":"api","end":""},{"old":"/api/v1/account/by-email/:email","type":0,"val":"v1","end":""},{"old":"/api/v1/account/by-email/:email","type":0,"val":"account","end":""},{"old":"/api/v1/account/by-email/:email","type":0,"val":"by-email","end":""},{"old":"/api/v1/account/by-email/:email","type":1,"val":"email","end":""}],
    types: placeholder as Registry['profile.profile.by_email']['types'],
  },
  'bracelets.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet',
    tokens: [{"old":"/api/v1/bracelet","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet","type":0,"val":"bracelet","end":""}],
    types: placeholder as Registry['bracelets.index']['types'],
  },
  'bracelets.models': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/models',
    tokens: [{"old":"/api/v1/bracelet/models","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/models","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/models","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/models","type":0,"val":"models","end":""}],
    types: placeholder as Registry['bracelets.models']['types'],
  },
  'bracelets.show_by_user': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/user/:userUid',
    tokens: [{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":0,"val":"user","end":""},{"old":"/api/v1/bracelet/user/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['bracelets.show_by_user']['types'],
  },
  'bracelets.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/bracelet/:uid',
    tokens: [{"old":"/api/v1/bracelet/:uid","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/:uid","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/:uid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/:uid","type":1,"val":"uid","end":""}],
    types: placeholder as Registry['bracelets.show']['types'],
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
  'bracelets.ban_by_uid': {
    methods: ["PATCH"],
    pattern: '/api/v1/bracelet/ban/:braceletUuid',
    tokens: [{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":0,"val":"ban","end":""},{"old":"/api/v1/bracelet/ban/:braceletUuid","type":1,"val":"braceletUuid","end":""}],
    types: placeholder as Registry['bracelets.ban_by_uid']['types'],
  },
  'medical_conditions.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/medical-conditions',
    tokens: [{"old":"/api/v1/medical-conditions","type":0,"val":"api","end":""},{"old":"/api/v1/medical-conditions","type":0,"val":"v1","end":""},{"old":"/api/v1/medical-conditions","type":0,"val":"medical-conditions","end":""}],
    types: placeholder as Registry['medical_conditions.show']['types'],
  },
  'medical_conditions.show_catalog': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/medical-conditions/catalog',
    tokens: [{"old":"/api/v1/medical-conditions/catalog","type":0,"val":"api","end":""},{"old":"/api/v1/medical-conditions/catalog","type":0,"val":"v1","end":""},{"old":"/api/v1/medical-conditions/catalog","type":0,"val":"medical-conditions","end":""},{"old":"/api/v1/medical-conditions/catalog","type":0,"val":"catalog","end":""}],
    types: placeholder as Registry['medical_conditions.show_catalog']['types'],
  },
  'medical_conditions.show_by_uid': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/medical-conditions/uid/:userUid',
    tokens: [{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"medical-conditions","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"uid","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['medical_conditions.show_by_uid']['types'],
  },
  'medical_conditions.show_by_bracelet_uid': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/medical-conditions/bracelet/:braceletUid',
    tokens: [{"old":"/api/v1/medical-conditions/bracelet/:braceletUid","type":0,"val":"api","end":""},{"old":"/api/v1/medical-conditions/bracelet/:braceletUid","type":0,"val":"v1","end":""},{"old":"/api/v1/medical-conditions/bracelet/:braceletUid","type":0,"val":"medical-conditions","end":""},{"old":"/api/v1/medical-conditions/bracelet/:braceletUid","type":0,"val":"bracelet","end":""},{"old":"/api/v1/medical-conditions/bracelet/:braceletUid","type":1,"val":"braceletUid","end":""}],
    types: placeholder as Registry['medical_conditions.show_by_bracelet_uid']['types'],
  },
  'medical_conditions.update': {
    methods: ["PUT"],
    pattern: '/api/v1/medical-conditions',
    tokens: [{"old":"/api/v1/medical-conditions","type":0,"val":"api","end":""},{"old":"/api/v1/medical-conditions","type":0,"val":"v1","end":""},{"old":"/api/v1/medical-conditions","type":0,"val":"medical-conditions","end":""}],
    types: placeholder as Registry['medical_conditions.update']['types'],
  },
  'medical_conditions.update_by_uid': {
    methods: ["PUT"],
    pattern: '/api/v1/medical-conditions/uid/:userUid',
    tokens: [{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"medical-conditions","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":0,"val":"uid","end":""},{"old":"/api/v1/medical-conditions/uid/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['medical_conditions.update_by_uid']['types'],
  },
  'medplum.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/profiles/:profileType/:userUid',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['medplum.show']['types'],
  },
  'medplum.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/profiles/:profileType',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType","type":1,"val":"profileType","end":""}],
    types: placeholder as Registry['medplum.index']['types'],
  },
  'medplum.update': {
    methods: ["PUT"],
    pattern: '/api/v1/proxy/profiles/:profileType/:userUid',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['medplum.update']['types'],
  },
  'medplum.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/proxy/profiles/:profileType/:userUid',
    tokens: [{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":0,"val":"profiles","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/profiles/:profileType/:userUid","type":1,"val":"userUid","end":""}],
    types: placeholder as Registry['medplum.destroy']['types'],
  },
  'medplum.get_info': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/clinical/:profileType/:userUid/:resourceType',
    tokens: [{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":0,"val":"clinical","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":1,"val":"profileType","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":1,"val":"userUid","end":""},{"old":"/api/v1/proxy/clinical/:profileType/:userUid/:resourceType","type":1,"val":"resourceType","end":""}],
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
