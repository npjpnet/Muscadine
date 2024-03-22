import * as FirestoreDB from 'firebase/firestore'
import useFirebase from './useFirebase'
import type { MuscadineSkillbadge } from 'muscadine'

const PMMaxScore = 9 * 6

export type Grade = 0 | 1 | 2 | 3 | 4
export const GradeText = ['-', 'B', 'B+', 'A', 'PM']

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

interface IUseSkillbadge {
  getSkillbadgeByUserIdAsync: (userId: string) => Promise<MuscadineSkillbadge>
  calculateSkillgradeByScores: (scores: number[]) => Grade
  calculateSkillgradePMByScore: (score: number) => Grade
}
const useSkillbadge = (): IUseSkillbadge => {
  const { getFirestore } = useFirebase()

  const getSkillbadgeByUserIdAsync = async (userId: string): Promise<MuscadineSkillbadge> => {
    const db = getFirestore()
    const skillbadgeRef = FirestoreDB.doc(db, `/skillbadges/${userId}`)
      .withConverter(skillbadgeConverter)
    const skillbadgeDoc = await FirestoreDB.getDoc(skillbadgeRef)
    if (!skillbadgeDoc.exists()) {
      throw new Error('skillbadge not found')
    }
    return skillbadgeDoc.data()
  }

  const calculateSkillgradeByScores = (scores: number[]): Grade => {
    const average = scores.reduce((p, c) => p + c) / scores.length
    if (average >= 2.5) {
      return 3
    } else if (average >= 1.5) {
      return 2
    } else if (average >= 0.5) {
      return 1
    } else {
      return 0
    }
  }

  const calculateSkillgradePMByScore = (score: number): Grade => {
    if (score === PMMaxScore) {
      return 4
    }
    return 0
  }

  return {
    getSkillbadgeByUserIdAsync,
    calculateSkillgradeByScores,
    calculateSkillgradePMByScore
  }
}
export default useSkillbadge
