/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  newAccount: {
    storeAdminOnce: typeof routes['new_account.store_admin_once']
  }
  admin: {
    newAccount: {
      storeAdmin: typeof routes['admin.new_account.store_admin']
    }
  }
  profile: {
    profile: {
      index: typeof routes['profile.profile.index']
      show: typeof routes['profile.profile.show']
      byEmail: typeof routes['profile.profile.by_email']
      updateProfile: typeof routes['profile.profile.update_profile']
      updateProfileByUid: typeof routes['profile.profile.update_profile_by_uid']
    }
  }
  bracelets: {
    index: typeof routes['bracelets.index']
    models: typeof routes['bracelets.models']
    showByUser: typeof routes['bracelets.show_by_user']
    show: typeof routes['bracelets.show']
    store: typeof routes['bracelets.store']
    assign: typeof routes['bracelets.assign']
    banByUid: typeof routes['bracelets.ban_by_uid']
  }
  medicalConditions: {
    show: typeof routes['medical_conditions.show']
    showCatalog: typeof routes['medical_conditions.show_catalog']
    showByUid: typeof routes['medical_conditions.show_by_uid']
    showByBraceletUid: typeof routes['medical_conditions.show_by_bracelet_uid']
    update: typeof routes['medical_conditions.update']
    updateByUid: typeof routes['medical_conditions.update_by_uid']
  }
  medplum: {
    show: typeof routes['medplum.show']
    index: typeof routes['medplum.index']
    update: typeof routes['medplum.update']
    destroy: typeof routes['medplum.destroy']
    getInfo: typeof routes['medplum.get_info']
  }
}
