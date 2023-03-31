import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions'
// import FirebaseAdmin from '../libs/FirebaseAdmin'
// import type { MuscadineDocumentRequestDoc } from 'muscadine'

export const onCreateDocumentRequest = functions.firestore
  .document('/documentRequests/{requestId}')
  .onCreate(async (snapshot: QueryDocumentSnapshot, context: functions.EventContext<{ requestId: string }>) => {
    // const adminApp = FirebaseAdmin.getFirebaseAdmin()

    const webhookURL = process.env.DISCORD_WEBHOOKS_URL
    if (!webhookURL) return

    const id = snapshot.id
    // const doc = snapshot.data() as MuscadineDocumentRequestDoc
    const webhookBody = {
      content: '',
      username: 'Muscadine',
      embeds: [
        {
          title: '書類申請を受け付けました。',
          url: '',
          fields: [
            {
              name: '申請ID',
              value: id
            }
          ]
        }
      ]
    }

    await fetch(webhookURL, {
      method: 'POST',
      body: JSON.stringify(webhookBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
