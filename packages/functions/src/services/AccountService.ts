import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions'
import { type Change } from 'firebase-functions'
import FirebaseAdmin from '../libs/FirebaseAdmin'

export const onChangeUserRoles = functions.firestore
  .document('/userMetas/{userId}/meta/claims')
  .onUpdate(
    async (
      snapshot: Change<QueryDocumentSnapshot>,
      context: functions.EventContext<{ userId: string }>
    ) => {
      const adminApp = FirebaseAdmin.getFirebaseAdmin()
      const adminAuth = adminApp.auth()

      if (!snapshot.after.exists) {
        return
      }

      const claims = snapshot.after.data()
      await adminAuth.setCustomUserClaims(context.params.userId, {
        accessLevel: claims.accessLevel
      })
    }
  )
