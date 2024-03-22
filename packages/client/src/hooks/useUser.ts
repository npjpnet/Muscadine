import * as FirestoreDB from 'firebase/firestore'
import useFirebase from './useFirebase'
import type { MuscadineIDCardHistory, MuscadineUserDoc, MuscadineUserMeta } from 'muscadine'

const userConveter: FirestoreDB.FirestoreDataConverter<MuscadineUserDoc> = {
  toFirestore: (user: MuscadineUserDoc) => {
    return {
      name: user.name,
      nameYomi: user.nameYomi,
      nameAlphabet: user.nameAlphabet,
      realName: user.realName,
      realNameYomi: user.realNameYomi,
      personalEmail: user.personalEmail,
      telephone: user.telephone,
      postalCode: user.postalCode,
      address: user.address,
      birthday: user.birthday,
      discordTag: user.discordTag,
      canUseRealNameForDisplay: user.canUseRealNameForDisplay,
      allowShownFace: user.allowShownFace
    }
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
      birthday: data.birthday,
      discordTag: data.discordTag,
      canUseRealNameForDisplay: data.canUseRealNameForDisplay,
      allowShownFace: data.allowShownFace
    }
  }
}
const userMetaConveter: FirestoreDB.FirestoreDataConverter<MuscadineUserMeta> = {
  toFirestore: (userMeta: MuscadineUserMeta) => {
    return {
      uuid: userMeta.uuid,
      code: userMeta.code,
      team: {
        mainId: userMeta.team.mainId,
        subId: userMeta.team.subId,
        remarks: userMeta.team.remarks
      },
      services: {
        email: userMeta.services.email,
        giji: userMeta.services.giji,
        redmine: userMeta.services.redmine,
        knowledge: userMeta.services.knowledge,
        memkan: userMeta.services.memkan
      }
    }
  },
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return {
      uuid: data.uuid,
      code: data.code,
      idCardIssuedCount: data.idCardIssuedCount,
      team: {
        mainId: data.team.mainId,
        subId: data.team.subId ?? '',
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
  getUsersAsync: () => Promise<Record<string, MuscadineUserDoc>>
  getUserMetasAsync: () => Promise<Record<string, MuscadineUserMeta>>
  getUserByIdAsync: (userId: string) => Promise<MuscadineUserDoc>
  updateUserByIdAsync: (userId: string, userData: MuscadineUserDoc) => Promise<void>
  updateUserMetaByIdAsync: (userId: string, userMeta: MuscadineUserMeta) => Promise<void>
  getUserMetaByUserIdAsync: (userId: string) => Promise<MuscadineUserMeta>
  getIDCardHistoryByUserIdAsync: (userId: string) => Promise<MuscadineIDCardHistory[]>
  updateIDCardHistoryByUserIdAsync: (userId: string, history: MuscadineIDCardHistory) => Promise<void>
}
const useUser = (): IUseUser => {
  const { getFirestore } = useFirebase()

  const getUsersAsync = async (): Promise<Record<string, MuscadineUserDoc>> => {
    const db = getFirestore()
    const usersRef = FirestoreDB.collection(db, 'users')
      .withConverter(userConveter)
    const usersDoc = await FirestoreDB.getDocs(usersRef)
    const docs = usersDoc.docs.reduce<Record<string, MuscadineUserDoc>>((p, c) => ({ ...p, [c.id]: c.data() }), {})
    return docs
  }

  const getUserMetasAsync = async (): Promise<Record<string, MuscadineUserMeta>> => {
    const db = getFirestore()
    const usersRef = FirestoreDB.collection(db, 'userMetas')
      .withConverter(userMetaConveter)
    const usersDoc = await FirestoreDB.getDocs(usersRef)
    const docs = usersDoc.docs.reduce<Record<string, MuscadineUserMeta>>((p, c) => ({ ...p, [c.id]: c.data() }), {})
    return docs
  }

  const getUserByIdAsync = async (userId: string): Promise<MuscadineUserDoc> => {
    const db = getFirestore()
    const userRef = FirestoreDB
      .doc(db, `users/${userId}`)
      .withConverter(userConveter)
    const userDoc = await FirestoreDB.getDoc(userRef)
    if (!userDoc.exists()) {
      throw new Error('user not found')
    }
    return userDoc.data()
  }

  const updateUserByIdAsync = async (userId: string, userData: MuscadineUserDoc): Promise<void> => {
    const db = getFirestore()
    const userRef = FirestoreDB.doc(db, `users/${userId}`)
      .withConverter(userConveter)
    FirestoreDB.setDoc(userRef, userData, { merge: true })
      .catch(err => { throw err })
  }

  const updateUserMetaByIdAsync = async (userId: string, userData: MuscadineUserMeta): Promise<void> => {
    const db = getFirestore()
    const userRef = FirestoreDB.doc(db, `userMetas/${userId}`)
      .withConverter(userMetaConveter)
    FirestoreDB.setDoc(userRef, userData, { merge: true })
      .catch(err => { throw err })
  }

  const getUserMetaByUserIdAsync = async (userId: string): Promise<MuscadineUserMeta> => {
    const db = getFirestore()
    const userMetaRef = FirestoreDB
      .doc(db, `userMetas/${userId}`)
      .withConverter(userMetaConveter)
    const userMetaDoc = await FirestoreDB.getDoc(userMetaRef)
    if (!userMetaDoc.exists()) {
      throw new Error('user not found')
    }
    return userMetaDoc.data()
  }

  const getIDCardHistoryByUserIdAsync = async (userId: string): Promise<MuscadineIDCardHistory[]> => {
    const db = getFirestore()
    const historyRef = FirestoreDB
      .collection(db, `userMetas/${userId}/idcards`)
      .withConverter(idCardHistoryConveter)
    const historySnapshot = await FirestoreDB.getDocs(historyRef)
    const historyDocs = historySnapshot.docs
      .map(snapshot => snapshot.data())
    return historyDocs
  }

  const updateIDCardHistoryByUserIdAsync = async (userId: string, history: MuscadineIDCardHistory): Promise<void> => {
    const db = getFirestore()
    const userMetaRef = FirestoreDB.doc(db, `userMetas/${userId}`)
      .withConverter(userMetaConveter)
    const historyRef = FirestoreDB.collection(db, `userMetas/${userId}/idcards`)
      .withConverter(idCardHistoryConveter)

    await FirestoreDB.addDoc(historyRef, history)
      .catch(err => { throw err })
    await FirestoreDB.updateDoc(
      userMetaRef,
      { idCardIssuedCount: FirestoreDB.increment(1) })
      .catch(err => { throw err })
  }

  return {
    getUsersAsync,
    getUserMetasAsync,
    getUserByIdAsync,
    updateUserByIdAsync,
    updateUserMetaByIdAsync,
    getUserMetaByUserIdAsync,
    getIDCardHistoryByUserIdAsync,
    updateIDCardHistoryByUserIdAsync
  }
}
export default useUser
