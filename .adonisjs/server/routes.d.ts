import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
    'medplum.index_practitioners': { paramsTuple?: []; params?: {} }
    'medplum.show_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.update_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.destroy_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.index_patients': { paramsTuple?: []; params?: {} }
    'medplum.show_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.update_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.destroy_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'medplum.index_practitioners': { paramsTuple?: []; params?: {} }
    'medplum.show_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.index_patients': { paramsTuple?: []; params?: {} }
    'medplum.show_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'medplum.index_practitioners': { paramsTuple?: []; params?: {} }
    'medplum.show_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.index_patients': { paramsTuple?: []; params?: {} }
    'medplum.show_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'medplum.update_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.update_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'medplum.destroy_practitioner': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medplum.destroy_patient': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}