import type { MuscadineUser, MuscadineUserMeta } from 'muscadine'
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
      canUseRealNameForDisplay: data.canUseRealNameForDisplay
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

interface IUseUser {
  getUserById: (userId: string) => Promise<MuscadineUser>
  getUserMetaByUserId: (userId: string) => Promise<MuscadineUserMeta>
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
      const userRef = FirestoreDB
        .doc(db, `/userMetas/${userId}`)
        .withConverter(userMetaConveter)
      const userDoc = await FirestoreDB.getDoc(userRef)
      if (!userDoc.exists()) {
        throw new Error('user not found')
      }
      return userDoc.data()
    }

  return {
    getUserById,
    getUserMetaByUserId
  }
}
export default useUser
