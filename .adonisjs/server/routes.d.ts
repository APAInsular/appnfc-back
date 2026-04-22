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
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.update': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'medplum.update': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
  }
  DELETE: {
    'medplum.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}