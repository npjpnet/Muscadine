import * as FirestoreDB from 'firebase/firestore'
import { skillbadgeConverter } from '../libs/converters'
import useFirebase from './useFirebase'
import type { MuscadineSkillbadge } from 'muscadine'

const PMMaxScore = 9 * 6

export type Grade = 0 | 1 | 2 | 3 | 4
export const GradeText = ['-', 'B', 'B+', 'A', 'PM']

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
