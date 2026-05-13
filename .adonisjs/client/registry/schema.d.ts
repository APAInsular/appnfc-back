/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'new_account.store_admin_once': {
    methods: ["POST"]
    pattern: '/api/v1/admin/register-once'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').onceAdminSignupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').onceAdminSignupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['storeAdminOnce']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['storeAdminOnce']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.new_account.store_admin': {
    methods: ["POST"]
    pattern: '/api/v1/admin/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').adminSignupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').adminSignupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['storeAdmin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['storeAdmin']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'bracelets.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bracelet/:uid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { uid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['show']>>>
    }
  }
  'bracelets.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bracelet'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['index']>>>
    }
  }
  'bracelets.show_by_user': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bracelet/user/:userUid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userUid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['showByUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['showByUser']>>>
    }
  }
  'bracelets.ban_by_uid': {
    methods: ["PATCH"]
    pattern: '/api/v1/bracelet/ban/:braceletUuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { braceletUuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['banByUid']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['banByUid']>>>
    }
  }
  'bracelets.store': {
    methods: ["POST"]
    pattern: '/api/v1/bracelet/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/brecelet').createBraceletValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/brecelet').createBraceletValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'bracelets.assign': {
    methods: ["POST"]
    pattern: '/api/v1/bracelet/assign'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/brecelet').assignBraceletValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/brecelet').assignBraceletValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['assign']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['assign']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'bracelets.models': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bracelet/models'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['models']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['models']>>>
    }
  }
  'data.allergies': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/data/allergies'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/data_controller').default['allergies']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/data_controller').default['allergies']>>>
    }
  }
  'data.medications': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/data/medications'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/data_controller').default['medications']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/data_controller').default['medications']>>>
    }
  }
  'data.pathologies': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/data/pathologies'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/data_controller').default['pathologies']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/data_controller').default['pathologies']>>>
    }
  }
  'data.inplant_devices': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/data/implant-devices'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/data_controller').default['inplantDevices']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/data_controller').default['inplantDevices']>>>
    }
  }
  'data.neurological_status': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/data/neurological-status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/data_controller').default['neurologicalStatus']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/data_controller').default['neurologicalStatus']>>>
    }
  }
  'us.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/us_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/us_controller').default['show']>>>
    }
  }
  'us.update': {
    methods: ["PUT"]
    pattern: '/api/v1/me'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/us').storeCondition)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/us').storeCondition)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/us_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/us_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'us.store': {
    methods: ["POST"]
    pattern: '/api/v1/me'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/us').storeCondition)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/us').storeCondition)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/us_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/us_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'medplum.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/profiles/:profileType'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { profileType: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['index']>>>
    }
  }
  'medplum.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/profiles/:profileType/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { profileType: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['show']>>>
    }
  }
  'medplum.update': {
    methods: ["PUT"]
    pattern: '/api/v1/proxy/profiles/:profileType/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { profileType: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['update']>>>
    }
  }
  'medplum.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/proxy/profiles/:profileType/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { profileType: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroy']>>>
    }
  }
  'medplum.get_info': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/clinical/:profileType/:id/:resourceType'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { profileType: ParamValue; id: ParamValue; resourceType: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['getInfo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['getInfo']>>>
    }
  }
}
