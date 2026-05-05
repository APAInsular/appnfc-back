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
      show: typeof routes['profile.profile.show']
    }
  }
  bracelets: {
    show: typeof routes['bracelets.show']
    index: typeof routes['bracelets.index']
    showByUser: typeof routes['bracelets.show_by_user']
    banByUid: typeof routes['bracelets.ban_by_uid']
    store: typeof routes['bracelets.store']
    assign: typeof routes['bracelets.assign']
  }
  data: {
    show: typeof routes['data.show']
    allergies: typeof routes['data.allergies']
    medications: typeof routes['data.medications']
    pathologies: typeof routes['data.pathologies']
    inplantDevices: typeof routes['data.inplant_devices']
    neurologicalStatus: typeof routes['data.neurological_status']
    bloodTypes: typeof routes['data.blood_types']
  }
  medplum: {
    index: typeof routes['medplum.index']
    show: typeof routes['medplum.show']
    update: typeof routes['medplum.update']
    destroy: typeof routes['medplum.destroy']
    getInfo: typeof routes['medplum.get_info']
  }
}
