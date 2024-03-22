import * as FirestoreDB from 'firebase/firestore'
import useFirebase from './useFirebase'
import type { MuscadineDocumentRequest, MuscadineDocumentRequestDoc, MuscadineRequestStatus } from 'muscadine'

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
  createDocumentRequestAsync: (userId: string, request: MuscadineDocumentRequest) => Promise<string>
  getDocumentRequestsAsync: () => Promise<Record<string, MuscadineDocumentRequestDoc>>
  getDocumentRequestByIdAsync: (requestId: string) => Promise<MuscadineDocumentRequestDoc>
  updateDocumentRequestStatusByIdAsync: (requestId: string, status: MuscadineRequestStatus) => Promise<void>
}
const useRequestDocument: () => IUseRequestDocument =
  () => {
    const { getFirestore } = useFirebase()

    const createDocumentRequestAsync = async (userId: string, request: MuscadineDocumentRequest): Promise<string> => {
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

    const getDocumentRequestsAsync = async (): Promise<Record<string, MuscadineDocumentRequestDoc>> => {
      const db = getFirestore()
      const requestRef = FirestoreDB.collection(db, '/documentRequests')
        .withConverter(requestConverter)
      const requestDocs = await FirestoreDB.getDocs(requestRef)
      const docs = requestDocs.docs.reduce<Record<string, MuscadineDocumentRequestDoc>>((p, c) => ({ ...p, [c.id]: c.data() }), {})
      return docs
    }

    const getDocumentRequestByIdAsync = async (requestId: string): Promise<MuscadineDocumentRequestDoc> => {
      const db = getFirestore()
      const requestRef = FirestoreDB.doc(db, `/documentRequests/${requestId}`)
        .withConverter(requestConverter)
      const requestDoc = await FirestoreDB.getDoc(requestRef)
      if (!requestDoc.exists()) {
        throw new Error('documentRequest not found')
      }
      return requestDoc.data()
    }

    const updateDocumentRequestStatusByIdAsync = async (requestId: string, status: MuscadineRequestStatus): Promise<void> => {
      const db = getFirestore()
      const requestRef = FirestoreDB.doc(db, `/documentRequests/${requestId}`)
        .withConverter(requestConverter)
      console.log({ status })
      FirestoreDB.updateDoc(requestRef, { status })
        .catch(err => { throw err })
    }

    return {
      createDocumentRequestAsync,
      getDocumentRequestsAsync,
      getDocumentRequestByIdAsync,
      updateDocumentRequestStatusByIdAsync
    }
  }

export default useRequestDocument
