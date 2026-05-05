import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'new_account.store_admin_once': { paramsTuple?: []; params?: {} }
    'admin.new_account.store_admin': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'uid': ParamValue} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'bracelets.ban_by_uid': { paramsTuple: [ParamValue]; params: {'braceletUuid': ParamValue} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
    'bracelets.assign': { paramsTuple?: []; params?: {} }
    'data.show': { paramsTuple?: []; params?: {} }
    'data.allergies': { paramsTuple?: []; params?: {} }
    'data.medications': { paramsTuple?: []; params?: {} }
    'data.pathologies': { paramsTuple?: []; params?: {} }
    'data.inplant_devices': { paramsTuple?: []; params?: {} }
    'data.neurological_status': { paramsTuple?: []; params?: {} }
    'data.blood_types': { paramsTuple?: []; params?: {} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.update': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.get_info': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue,'resourceType': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'uid': ParamValue} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'data.show': { paramsTuple?: []; params?: {} }
    'data.allergies': { paramsTuple?: []; params?: {} }
    'data.medications': { paramsTuple?: []; params?: {} }
    'data.pathologies': { paramsTuple?: []; params?: {} }
    'data.inplant_devices': { paramsTuple?: []; params?: {} }
    'data.neurological_status': { paramsTuple?: []; params?: {} }
    'data.blood_types': { paramsTuple?: []; params?: {} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.get_info': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue,'resourceType': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'uid': ParamValue} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'data.show': { paramsTuple?: []; params?: {} }
    'data.allergies': { paramsTuple?: []; params?: {} }
    'data.medications': { paramsTuple?: []; params?: {} }
    'data.pathologies': { paramsTuple?: []; params?: {} }
    'data.inplant_devices': { paramsTuple?: []; params?: {} }
    'data.neurological_status': { paramsTuple?: []; params?: {} }
    'data.blood_types': { paramsTuple?: []; params?: {} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue} }
    'medplum.get_info': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'profileType': ParamValue,'id': ParamValue,'resourceType': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'new_account.store_admin_once': { paramsTuple?: []; params?: {} }
    'admin.new_account.store_admin': { paramsTuple?: []; params?: {} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
    'bracelets.assign': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'bracelets.ban_by_uid': { paramsTuple: [ParamValue]; params: {'braceletUuid': ParamValue} }
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