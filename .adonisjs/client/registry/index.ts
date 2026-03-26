/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
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
    pattern: '/api/v1/bracelet',
    tokens: [{"old":"/api/v1/bracelet","type":0,"val":"api","end":""},{"old":"/api/v1/bracelet","type":0,"val":"v1","end":""},{"old":"/api/v1/bracelet","type":0,"val":"bracelet","end":""}],
    types: placeholder as Registry['bracelets.store']['types'],
  },
  'medplum.index_practitioners': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/practitioners',
    tokens: [{"old":"/api/v1/proxy/practitioners","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/practitioners","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/practitioners","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/practitioners","type":0,"val":"practitioners","end":""}],
    types: placeholder as Registry['medplum.index_practitioners']['types'],
  },
  'medplum.show_practitioner': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/practitioners/:id',
    tokens: [{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"practitioners","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.show_practitioner']['types'],
  },
  'medplum.update_practitioner': {
    methods: ["PUT"],
    pattern: '/api/v1/proxy/practitioners/:id',
    tokens: [{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"practitioners","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.update_practitioner']['types'],
  },
  'medplum.destroy_practitioner': {
    methods: ["DELETE"],
    pattern: '/api/v1/proxy/practitioners/:id',
    tokens: [{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":0,"val":"practitioners","end":""},{"old":"/api/v1/proxy/practitioners/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.destroy_practitioner']['types'],
  },
  'medplum.index_patients': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/patients',
    tokens: [{"old":"/api/v1/proxy/patients","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/patients","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/patients","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/patients","type":0,"val":"patients","end":""}],
    types: placeholder as Registry['medplum.index_patients']['types'],
  },
  'medplum.show_patient': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/proxy/patients/:id',
    tokens: [{"old":"/api/v1/proxy/patients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"patients","end":""},{"old":"/api/v1/proxy/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.show_patient']['types'],
  },
  'medplum.update_patient': {
    methods: ["PUT"],
    pattern: '/api/v1/proxy/patients/:id',
    tokens: [{"old":"/api/v1/proxy/patients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"patients","end":""},{"old":"/api/v1/proxy/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.update_patient']['types'],
  },
  'medplum.destroy_patient': {
    methods: ["DELETE"],
    pattern: '/api/v1/proxy/patients/:id',
    tokens: [{"old":"/api/v1/proxy/patients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"proxy","end":""},{"old":"/api/v1/proxy/patients/:id","type":0,"val":"patients","end":""},{"old":"/api/v1/proxy/patients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medplum.destroy_patient']['types'],
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
