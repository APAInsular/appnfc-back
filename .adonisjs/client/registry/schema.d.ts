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
  'profile.profile.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['index']>>>
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
  'profile.profile.by_email': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/by-email/:email'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { email: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['byEmail']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['byEmail']>>>
    }
  }
  'profile.profile.update_profile': {
    methods: ["PUT"]
    pattern: '/api/v1/account/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/medical_conditions').updateProfile)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/medical_conditions').updateProfile)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['updateProfile']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['updateProfile']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.update_profile_by_uid': {
    methods: ["PUT"]
    pattern: '/api/v1/account/profile/uid/:userUid'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/medical_conditions').updateProfile)>>
      paramsTuple: [ParamValue]
      params: { userUid: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/medical_conditions').updateProfile)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['updateProfileByUid']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['updateProfileByUid']>>> | { status: 422; response: { errors: SimpleError[] } }
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
  'medical_conditions.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/medical-conditions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['show']>>>
    }
  }
  'medical_conditions.show_catalog': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/medical-conditions/catalog'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['showCatalog']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['showCatalog']>>>
    }
  }
  'medical_conditions.show_by_uid': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/medical-conditions/uid/:userUid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userUid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['showByUid']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['showByUid']>>>
    }
  }
  'medical_conditions.show_by_bracelet_uid': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/medical-conditions/bracelet/:braceletUid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { braceletUid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['showByBraceletUid']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['showByBraceletUid']>>>
    }
  }
  'medical_conditions.update': {
    methods: ["PUT"]
    pattern: '/api/v1/medical-conditions'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/medical_conditions').updateConditions)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/medical_conditions').updateConditions)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'medical_conditions.update_by_uid': {
    methods: ["PUT"]
    pattern: '/api/v1/medical-conditions/uid/:userUid'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/medical_conditions').updateConditions)>>
      paramsTuple: [ParamValue]
      params: { userUid: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/medical_conditions').updateConditions)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['updateByUid']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medical_conditions_controller').default['updateByUid']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'medplum.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/profiles/:profileType/:userUid'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { profileType: ParamValue; userUid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['show']>>>
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
  'medplum.update': {
    methods: ["PUT"]
    pattern: '/api/v1/proxy/profiles/:profileType/:userUid'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { profileType: ParamValue; userUid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['update']>>>
    }
  }
  'medplum.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/proxy/profiles/:profileType/:userUid'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { profileType: ParamValue; userUid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroy']>>>
    }
  }
  'medplum.get_info': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/clinical/:profileType/:userUid/:resourceType'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { profileType: ParamValue; userUid: ParamValue; resourceType: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['getInfo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['getInfo']>>>
    }
  }
}
