import * as FirestoreDB from 'firebase/firestore'
import type {
  MuscadineDocumentRequestDoc,
  MuscadineExpenseDoc,
  MuscadineIDCardHistory,
  MuscadineSkillbadge,
  MuscadineUserDoc,
  MuscadineUserMeta
} from 'muscadine'

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

const skillbadgeConverter: FirestoreDB.FirestoreDataConverter<MuscadineSkillbadge> = {
  toFirestore: () => ({
  }),
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot) => {
    const data = snapshot.data()
    return {
      projectManager: {
        projectManagement: data.projectManager.projectManagement,
        memberAllocation: data.projectManager.memberAllocation,
        decisionMaking: data.projectManager.decisionMaking,
        instructionGiving: data.projectManager.instructionGiving,
        emergencyResponse: data.projectManager.emergencyResponse,
        implementationRecordKeeping: data.projectManager.implementationRecordKeeping
      },
      publicAddress: {
        videoSetup: data.publicAddress.videoSetup,
        audioSetup: data.publicAddress.audioSetup,
        videoOperation: data.publicAddress.videoOperation,
        audioOperation: data.publicAddress.audioOperation,
        stageCoordination: data.publicAddress.stageCoordination,
        camera: data.publicAddress.camera,
        livestreamPlatformManagement: data.publicAddress.livestreamPlatformManagement
      },
      stage: {
        MC: data.stage.MC,
        speakerSupport: data.stage.speakerSupport,
        progressManagement: data.stage.progressManagement,
        livestreamAudioCoordination: data.stage.livestreamAudioCoordination,
        responseToCommentsAndOtherFeedback: data.stage.responseToCommentsAndOtherFeedback
      },
      guestOperator: {
        attendeeSupport: data.guestOperator.attendeeSupport,
        stakeholderManagement: data.guestOperator.stakeholderManagement,
        cashRegisterPayment: data.guestOperator.cashRegisterPayment
      }
    }
  }
}

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
      allowShownFace: user.allowShownFace,
      bankAccount: user.bankAccount
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
      allowShownFace: data.allowShownFace,
      bankAccount: data.bankAccount
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

const expenseConverter: FirestoreDB.FirestoreDataConverter<MuscadineExpenseDoc> = {
  toFirestore: (expense: MuscadineExpenseDoc) => ({
    userId: expense.userId,
    purpose: expense.purpose,
    store: expense.store,
    remarks: expense.remarks,
    price: expense.price,
    status: expense.status,
    createdAt: FirestoreDB.serverTimestamp()
  }),
  fromFirestore: (snapshot: FirestoreDB.QueryDocumentSnapshot): MuscadineExpenseDoc => {
    const expense = snapshot.data()
    return {
      id: snapshot.id,
      userId: expense.userId,
      purpose: expense.purpose,
      store: expense.store,
      remarks: expense.remarks,
      price: expense.price,
      status: expense.status,
      createdAt: expense.createdAt?.toDate() ?? new Date(0)
    }
  }
}
export {
  requestConverter,
  skillbadgeConverter,
  userConveter,
  userMetaConveter,
  idCardHistoryConveter,
  expenseConverter
}
