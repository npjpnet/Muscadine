import { type QueryDocumentSnapshot } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions'
import RequestService from '../services/RequestService'

export const onCreateDocumentRequest = functions.firestore
  .document('/documentRequests/{requestId}')
  .onCreate(async (
    _: QueryDocumentSnapshot,
    context: functions.EventContext<{ requestId: string }>) => {
    await RequestService.createDocumentRequestAsync(context.params.requestId)
  })
