import type { MuscadineIDCardHistory, MuscadineUserDoc, MuscadineUserMeta } from 'muscadine'

import * as FirestoreDB from 'firebase/firestore'
import useFirebase from './useFirebase'

const userConveter: FirestoreDB.FirestoreDataConverter<MuscadineUserDoc> = {
  toFirestore: () => {
    return {}
  },
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const userId = snapshot.id
    const data = snapshot.data()
    return {
      userId,
      name: data.name,
      nameYomi: data.nameYomi,
      nameAlphabet: data.nameAlphabet,
      realName: data.realName,
      realNameYomi: data.realNameYomi,
      personalEmail: data.personalEmail,
      telephone: data.telephone,
      postalCode: data.postalCode,
      address: data.address,
      discordTag: data.discordTag,
      canUseRealNameForDisplay: data.canUseRealNameForDisplay,
      allowShownFace: data.allowShownFace
    }
  }
}
const userMetaConveter: FirestoreDB.FirestoreDataConverter<MuscadineUserMeta> = {
  toFirestore: () => {
    return {}
  },
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return {
      uuid: data.uuid,
      code: data.code,
      idCardIssuedCount: data.idCardIssuedCount,
      team: {
        mainId: data.team.mainId,
        subId: data.team.subId,
        remarks: data.team.remarks
      },
      services: {
        email: data.services.email,
        giji: data.services.giji,
        redmine: data.services.redmine,
        knowledge: data.services.knowledge,
        memkan: data.services.memkan
      }
    }
  }
}
const idCardHistoryConveter: FirestoreDB.FirestoreDataConverter<MuscadineIDCardHistory> = {
  toFirestore: (history: MuscadineIDCardHistory) => {
    return {
      cardNumber: history.cardNumber,
      remarks: history.remarks,
      canUseRealNameForDisplay: history.canUseRealNameForDisplay,
      allowShownFace: history.allowShownFace
    }
  },
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return {
      cardNumber: data.cardNumber,
      remarks: data.remarks,
      canUseRealNameForDisplay: data.canUseRealNameForDisplay,
      allowShownFace: data.allowShownFace
    }
  }
}

interface IUseUser {
  getUserById: (userId: string) => Promise<MuscadineUserDoc>
  getUserMetaByUserId: (userId: string) => Promise<MuscadineUserMeta>
  getIDCardHistoryByUserId: (userId: string) => Promise<MuscadineIDCardHistory[]>
  updateIDCardHistoryByUserId: (userId: string, history: MuscadineIDCardHistory) => Promise<void>
}
const useUser: () => IUseUser = () => {
  const { getFirestore } = useFirebase()

  const getUserById: (userId: string) => Promise<MuscadineUserDoc> =
    async (userId) => {
      const db = getFirestore()
      const userRef = FirestoreDB
        .doc(db, `/users/${userId}`)
        .withConverter(userConveter)
      const userDoc = await FirestoreDB.getDoc(userRef)
      if (!userDoc.exists()) {
        throw new Error('user not found')
      }
      return userDoc.data()
    }

  const getUserMetaByUserId: (userId: string) => Promise<MuscadineUserMeta> =
    async (userId) => {
      const db = getFirestore()
      const userMetaRef = FirestoreDB
        .doc(db, `/userMetas/${userId}`)
        .withConverter(userMetaConveter)
      const userMetaDoc = await FirestoreDB.getDoc(userMetaRef)
      if (!userMetaDoc.exists()) {
        throw new Error('user not found')
      }
      return userMetaDoc.data()
    }

  const getIDCardHistoryByUserId: (userId: string) => Promise<MuscadineIDCardHistory[]> =
    async (userId) => {
      const db = getFirestore()
      const historyRef = FirestoreDB
        .collection(db, `/userMetas/${userId}/idcards`)
        .withConverter(idCardHistoryConveter)
      const historySnapshot = await FirestoreDB.getDocs(historyRef)
      const historyDocs = historySnapshot.docs
        .map(snapshot => snapshot.data())
      return historyDocs
    }

  const updateIDCardHistoryByUserId: (userId: string, history: MuscadineIDCardHistory) => Promise<void> =
    async (userId, history) => {
      const db = getFirestore()
      const userMetaRef = FirestoreDB.doc(db, `/userMetas/${userId}`)
        .withConverter(userMetaConveter)
      const historyRef = FirestoreDB.collection(db, `/userMetas/${userId}/idcards`)
        .withConverter(idCardHistoryConveter)
      FirestoreDB.addDoc(historyRef, history)
        .then(async () => await FirestoreDB.updateDoc(userMetaRef, {
          idCardIssuedCount: FirestoreDB.increment(1)
        }))
        .catch(err => {
          throw err
        })
    }

  return {
    getUserById,
    getUserMetaByUserId,
    getIDCardHistoryByUserId,
    updateIDCardHistoryByUserId
  }
}
export default useUser
