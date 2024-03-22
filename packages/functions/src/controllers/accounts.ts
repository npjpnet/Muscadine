import * as functions from 'firebase-functions'
import AccountService from '../services/AccountService'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const onChangeUserRoles = functions.firestore
  .document('/userMetas/{userId}/meta/claims')
  .onUpdate(async (
    snapshot: functions.Change<QueryDocumentSnapshot>,
    context: functions.EventContext<{ userId: string }>) => {
    if (!snapshot.after.exists) {
      return
    }

    const claims = snapshot.after.data()
    await AccountService.changeUserRolesAsync(context.params.userId, claims)
  })
