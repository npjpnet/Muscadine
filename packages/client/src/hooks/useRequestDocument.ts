import type { MuscadineDocumentRequest, MuscadineDocumentRequestDoc, MuscadineRequestStatus } from 'muscadine'

import * as FirestoreDB from 'firebase/firestore'
import useFirebase from './useFirebase'

const requestConverter: FirestoreDB.FirestoreDataConverter<MuscadineDocumentRequestDoc> = {
  toFirestore: (request: MuscadineDocumentRequestDoc) => ({
    type: request.type,
    reason: request.reason,
    remarks: request.remarks,
    userId: request.userId,
    status: request.status,
    timestamp: FirestoreDB.serverTimestamp()
  }),
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return {
      type: data.type,
      reason: data.reason,
      remarks: data.remarks,
      userId: data.userId,
      status: data.status,
      timestamp: data.timestamp.toDate().getTime()
    }
  }
}
interface IUseRequestDocument {
  createDocumentRequest: (userId: string, request: MuscadineDocumentRequest) => Promise<string>
  getDocumentRequests: () => Promise<Record<string, MuscadineDocumentRequestDoc>>
  getDocumentRequestById: (requestId: string) => Promise<MuscadineDocumentRequestDoc>
  updateDocumentRequestStatusById: (requestId: string, status: MuscadineRequestStatus) => Promise<void>
}
const useRequestDocument: () => IUseRequestDocument =
  () => {
    const { getFirestore } = useFirebase()

    const createDocumentRequest: (userId: string, request: MuscadineDocumentRequest) => Promise<string> =
      async (userId, request) => {
        const db = getFirestore()
        const requestRef = FirestoreDB.collection(db, '/documentRequests')
          .withConverter(requestConverter)
        const requestDoc: MuscadineDocumentRequestDoc = {
          ...request,
          userId,
          status: 0,
          timestamp: 0
        }
        const doc = await FirestoreDB.addDoc(requestRef, requestDoc)
          .catch((err) => {
            throw err
          })
        return doc.id
      }

    const getDocumentRequests: () => Promise<Record<string, MuscadineDocumentRequestDoc>> =
      async () => {
        const db = getFirestore()
        const requestRef = FirestoreDB.collection(db, '/documentRequests')
          .withConverter(requestConverter)
        const requestDocs = await FirestoreDB.getDocs(requestRef)
        const docs = requestDocs.docs.reduce<Record<string, MuscadineDocumentRequestDoc>>((p, c) => ({ ...p, [c.id]: c.data() }), {})
        return docs
      }

    const getDocumentRequestById: (requestId: string) => Promise<MuscadineDocumentRequestDoc> =
      async (requestId: string) => {
        const db = getFirestore()
        const requestRef = FirestoreDB.doc(db, `/documentRequests/${requestId}`)
          .withConverter(requestConverter)
        const requestDoc = await FirestoreDB.getDoc(requestRef)
        if (!requestDoc.exists()) {
          throw new Error('documentRequest not found')
        }
        return requestDoc.data()
      }

    const updateDocumentRequestStatusById: (requestId: string, status: MuscadineRequestStatus) => Promise<void> =
      async (requestId, status) => {
        const db = getFirestore()
        const requestRef = FirestoreDB.doc(db, `/documentRequests/${requestId}`)
          .withConverter(requestConverter)
        FirestoreDB.updateDoc(requestRef, { status })
          .catch(err => {
            throw err
          })
      }

    return {
      createDocumentRequest,
      getDocumentRequests,
      getDocumentRequestById,
      updateDocumentRequestStatusById
    }
  }

export default useRequestDocument
