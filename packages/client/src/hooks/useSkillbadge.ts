import type { MuscadineSkillbadge } from 'muscadine'

import * as FirestoreDB from 'firebase/firestore'
import useFirebase from './useFirebase'

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
  getSkillbadgeByUserId: (userId: string) => Promise<MuscadineSkillbadge>
  getSkillgradeByScores: (scores: number[]) => Grade
  getSkillgradePMByScore: (score: number) => Grade
}
const useSkillbadge: () => IUseSkillbadge =
  () => {
    const { getFirestore } = useFirebase()

    const getSkillbadgeByUserId: (userId: string) => Promise<MuscadineSkillbadge> =
      async (userId) => {
        const db = getFirestore()
        const skillbadgeRef = FirestoreDB.doc(db, `/skillbadges/${userId}`)
          .withConverter(skillbadgeConverter)
        const skillbadgeDoc = await FirestoreDB.getDoc(skillbadgeRef)
        if (!skillbadgeDoc.exists()) {
          throw new Error('skillbadge not found')
        }
        return skillbadgeDoc.data()
      }

    const getSkillgradeByScores: (scores: number[]) => Grade =
      (scores) => {
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

    const getSkillgradePMByScore: (score: number) => Grade =
      (score) => {
        if (score === PMMaxScore) {
          return 4
        }
        return 0
      }

    return {
      getSkillbadgeByUserId,
      getSkillgradeByScores,
      getSkillgradePMByScore
    }
  }
export default useSkillbadge
