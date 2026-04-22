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
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
  }
  bracelets: {
    index: typeof routes['bracelets.index']
    show: typeof routes['bracelets.show']
    showByUser: typeof routes['bracelets.show_by_user']
    store: typeof routes['bracelets.store']
  }
  medplum: {
    index: typeof routes['medplum.index']
    show: typeof routes['medplum.show']
    update: typeof routes['medplum.update']
    destroy: typeof routes['medplum.destroy']
  }
}
