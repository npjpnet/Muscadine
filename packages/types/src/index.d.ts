export interface MuscadineUser {
  name: string
  nameYomi: string
  nameAlphabet: string
  realName: string
  realNameYomi: string
  personalEmail: string
  telephone: string
  postalCode: string
  address: string
  discordTag: string
  canUseRealNameForDisplay: boolean
  allowShownFace: boolean
}

export interface MuscadineUserMeta {
  uuid: string
  code: string
  idCardIssuedCount: number
  team: {
    main: string
    sub: string
    remarks: string
  }
  services: {
    email: string
    giji?: string
    redmine?: string
    knowledge?: string
    memkan?: string
  }
}

export interface MuscadineIDCardHistory {
  cardNumber: string
  remarks: string
  canUseRealNameForDisplay: boolean
  allowShownFace: boolean
}

export interface MuscadineSkillbadge {
  projectManager: {
    projectManagement: number
    memberAllocation: number
    decisionMaking: number
    instructionGiving: number
    emergencyResponse: number
    implementationRecordKeeping: number
  }
  publicAddress: {
    videoSetup: number
    audioSetup: number
    videoOperation: number
    audioOperation: number
    stageCoordination: number
    camera: number
    livestreamPlatformManagement: number
  }
  stage: {
    MC: number
    speakerSupport: number
    progressManagement: number
    livestreamAudioCoordination: number
    responseToCommentsAndOtherFeedback: number
  }
  guestOperator: {
    attendeeSupport: number
    stakeholderManagement: number
    cashRegisterPayment: number
  }
}

export type valueOf<T> = T[keyof T]
