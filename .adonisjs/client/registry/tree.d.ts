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
    indexPractitioners: typeof routes['medplum.index_practitioners']
    showPractitioner: typeof routes['medplum.show_practitioner']
    updatePractitioner: typeof routes['medplum.update_practitioner']
    destroyPractitioner: typeof routes['medplum.destroy_practitioner']
    indexPatients: typeof routes['medplum.index_patients']
    showPatient: typeof routes['medplum.show_patient']
    updatePatient: typeof routes['medplum.update_patient']
    destroyPatient: typeof routes['medplum.destroy_patient']
  }
}
