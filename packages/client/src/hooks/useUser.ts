import type { MuscadineIDCardHistory, MuscadineUser, MuscadineUserMeta } from 'muscadine'
import * as FirestoreDB from 'firebase/firestore'

import useFirebase from './useFirebase'

const userConveter: FirestoreDB.FirestoreDataConverter<MuscadineUser> = {
  toFirestore: () => {
    return {}
  },
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return {
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
        main: data.team.main,
        sub: data.team.sub,
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
  toFirestore: () => {
    return {}
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
  getUserById: (userId: string) => Promise<MuscadineUser>
  getUserMetaByUserId: (userId: string) => Promise<MuscadineUserMeta>
  getIDCardHistoryByUserId: (userId: string) => Promise<MuscadineIDCardHistory[]>
}
const useUser: () => IUseUser = () => {
  const { getFirestore } = useFirebase()

  const getUserById: (userId: string) => Promise<MuscadineUser> =
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
      console.log(historyDocs)
      return historyDocs
    }

  return {
    getUserById,
    getUserMetaByUserId,
    getIDCardHistoryByUserId
  }
}
export default useUser
