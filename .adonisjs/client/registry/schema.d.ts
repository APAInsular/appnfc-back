/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
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
  'bracelets.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bracelet/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['show']>>>
    }
  }
  'bracelets.show_by_user': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/bracelet/user/:userId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['showByUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['showByUser']>>>
    }
  }
  'bracelets.store': {
    methods: ["POST"]
    pattern: '/api/v1/bracelet'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/brecelet').createBraceletValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/brecelet').createBraceletValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/bracelets_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'medplum.index_practitioners': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/practitioners'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['indexPractitioners']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['indexPractitioners']>>>
    }
  }
  'medplum.show_practitioner': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/practitioners/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['showPractitioner']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['showPractitioner']>>>
    }
  }
  'medplum.update_practitioner': {
    methods: ["PUT"]
    pattern: '/api/v1/proxy/practitioners/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['updatePractitioner']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['updatePractitioner']>>>
    }
  }
  'medplum.destroy_practitioner': {
    methods: ["DELETE"]
    pattern: '/api/v1/proxy/practitioners/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroyPractitioner']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroyPractitioner']>>>
    }
  }
  'medplum.index_patients': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/patients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['indexPatients']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['indexPatients']>>>
    }
  }
  'medplum.show_patient': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/proxy/patients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['showPatient']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['showPatient']>>>
    }
  }
  'medplum.update_patient': {
    methods: ["PUT"]
    pattern: '/api/v1/proxy/patients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['updatePatient']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['updatePatient']>>>
    }
  }
  'medplum.destroy_patient': {
    methods: ["DELETE"]
    pattern: '/api/v1/proxy/patients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroyPatient']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/medplum_controller').default['destroyPatient']>>>
    }
  }
}
