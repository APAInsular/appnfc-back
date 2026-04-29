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
  medplum: {
    index: typeof routes['medplum.index']
    show: typeof routes['medplum.show']
    update: typeof routes['medplum.update']
    destroy: typeof routes['medplum.destroy']
  }
}
