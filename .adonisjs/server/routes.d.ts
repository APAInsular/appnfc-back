import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.access_with_code': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'new_account.store_admin_once': { paramsTuple?: []; params?: {} }
    'admin.new_account.store_admin': { paramsTuple?: []; params?: {} }
    'profile.profile.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show_access_code': { paramsTuple?: []; params?: {} }
    'profile.profile.by_email': { paramsTuple: [ParamValue]; params: {'email': ParamValue} }
    'profile.profile.update_profile': { paramsTuple?: []; params?: {} }
    'profile.profile.update_profile_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.models': { paramsTuple?: []; params?: {} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'uid': ParamValue} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
    'bracelets.assign': { paramsTuple?: []; params?: {} }
    'bracelets.ban_by_uid': { paramsTuple: [ParamValue]; params: {'braceletUuid': ParamValue} }
    'medical_conditions.show': { paramsTuple?: []; params?: {} }
    'medical_conditions.show_catalog': { paramsTuple?: []; params?: {} }
    'medical_conditions.show_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'medical_conditions.show_by_bracelet_uid': { paramsTuple: [ParamValue]; params: {'braceletUid': ParamValue} }
    'medical_conditions.update': { paramsTuple?: []; params?: {} }
    'medical_conditions.update_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.update': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
    'medplum.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
    'medplum.get_info': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue,'resourceType': ParamValue} }
  }
  GET: {
    'profile.profile.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show_access_code': { paramsTuple?: []; params?: {} }
    'profile.profile.by_email': { paramsTuple: [ParamValue]; params: {'email': ParamValue} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.models': { paramsTuple?: []; params?: {} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'uid': ParamValue} }
    'medical_conditions.show': { paramsTuple?: []; params?: {} }
    'medical_conditions.show_catalog': { paramsTuple?: []; params?: {} }
    'medical_conditions.show_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'medical_conditions.show_by_bracelet_uid': { paramsTuple: [ParamValue]; params: {'braceletUid': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.get_info': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue,'resourceType': ParamValue} }
  }
  HEAD: {
    'profile.profile.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show_access_code': { paramsTuple?: []; params?: {} }
    'profile.profile.by_email': { paramsTuple: [ParamValue]; params: {'email': ParamValue} }
    'bracelets.index': { paramsTuple?: []; params?: {} }
    'bracelets.models': { paramsTuple?: []; params?: {} }
    'bracelets.show_by_user': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'bracelets.show': { paramsTuple: [ParamValue]; params: {'uid': ParamValue} }
    'medical_conditions.show': { paramsTuple?: []; params?: {} }
    'medical_conditions.show_catalog': { paramsTuple?: []; params?: {} }
    'medical_conditions.show_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'medical_conditions.show_by_bracelet_uid': { paramsTuple: [ParamValue]; params: {'braceletUid': ParamValue} }
    'medplum.show': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
    'medplum.index': { paramsTuple: [ParamValue]; params: {'profileType': ParamValue} }
    'medplum.get_info': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue,'resourceType': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.access_with_code': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'new_account.store_admin_once': { paramsTuple?: []; params?: {} }
    'admin.new_account.store_admin': { paramsTuple?: []; params?: {} }
    'bracelets.store': { paramsTuple?: []; params?: {} }
    'bracelets.assign': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profile.profile.update_profile': { paramsTuple?: []; params?: {} }
    'profile.profile.update_profile_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'medical_conditions.update': { paramsTuple?: []; params?: {} }
    'medical_conditions.update_by_uid': { paramsTuple: [ParamValue]; params: {'userUid': ParamValue} }
    'medplum.update': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
  }
  PATCH: {
    'bracelets.ban_by_uid': { paramsTuple: [ParamValue]; params: {'braceletUuid': ParamValue} }
  }
  DELETE: {
    'medplum.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'profileType': ParamValue,'userUid': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}