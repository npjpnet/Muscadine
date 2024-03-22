import { useEffect, useState } from 'react'
import styled from 'styled-components'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import useFirebase from '../../hooks/useFirebase'
import useSkillbadge, { type Grade, GradeText } from '../../hooks/useSkillbadge'

const MyPageSkillBadgesPage: React.FC = () => {
  const { user } = useFirebase()
  const {
    getSkillbadgeByUserIdAsync,
    calculateSkillgradeByScores,
    calculateSkillgradePMByScore
  } = useSkillbadge()

  const [skillbadge, setSkillbadge] = useState<Array<{
    title: string
    code: string
    scoreSum: number
    grade: Grade
    skills: Array<{
      detail: string
      score: number
    }>
  }>>()

  useEffect(() => {
    const fetchSkillbadgeAsync = async (): Promise<void> => {
      if (!user) return
      const fetchedSkillbadge = await getSkillbadgeByUserIdAsync(user.uid)

      const pmSumScore = Object.values(fetchedSkillbadge.projectManager).reduce((p, c) => p + c, 0)
      const paScores = Object.values(fetchedSkillbadge.publicAddress)
      const sgScores = Object.values(fetchedSkillbadge.stage)
      const goScores = Object.values(fetchedSkillbadge.guestOperator)
      const paSumScore = paScores.reduce((p, c) => p + c, 0)
      const sgSumScore = sgScores.reduce((p, c) => p + c, 0)
      const goSumScore = goScores.reduce((p, c) => p + c, 0)

      setSkillbadge([
        {
          title: 'プロジェクトマネージャ',
          code: 'PM',
          scoreSum: pmSumScore,
          grade: calculateSkillgradePMByScore(pmSumScore),
          skills: [
            {
              detail: 'プロジェクトの進行',
              score: fetchedSkillbadge.projectManager.projectManagement
            },
            {
              detail: '人員配置',
              score: fetchedSkillbadge.projectManager.memberAllocation
            },
            {
              detail: '現場意思決定',
              score: fetchedSkillbadge.projectManager.decisionMaking
            },
            {
              detail: '指示出し',
              score: fetchedSkillbadge.projectManager.instructionGiving
            },
            {
              detail: '緊急対応',
              score: fetchedSkillbadge.projectManager.emergencyResponse
            },
            {
              detail: '実施記録作成',
              score: fetchedSkillbadge.projectManager.implementationRecordKeeping
            }
          ]
        },
        {
          title: '配信・音響',
          code: 'PA',
          scoreSum: paSumScore,
          grade: calculateSkillgradeByScores(paScores),
          skills: [
            {
              detail: '映像設営',
              score: fetchedSkillbadge.publicAddress.videoSetup
            },
            {
              detail: '音響設営',
              score: fetchedSkillbadge.publicAddress.audioSetup
            },
            {
              detail: '映像運用',
              score: fetchedSkillbadge.publicAddress.videoOperation
            },
            {
              detail: '音響運用',
              score: fetchedSkillbadge.publicAddress.audioOperation
            },
            {
              detail: 'ステージ連携',
              score: fetchedSkillbadge.publicAddress.stageCoordination
            },
            {
              detail: 'カメラ',
              score: fetchedSkillbadge.publicAddress.camera
            },
            {
              detail: '配信サイト運営',
              score: fetchedSkillbadge.publicAddress.livestreamPlatformManagement
            }
          ]
        },
        {
          title: 'ステージ',
          code: 'SG',
          scoreSum: sgSumScore,
          grade: calculateSkillgradeByScores(sgScores),
          skills: [
            {
              detail: '司会',
              score: fetchedSkillbadge.stage.MC
            },
            {
              detail: '登壇者対応',
              score: fetchedSkillbadge.stage.speakerSupport
            },
            {
              detail: '進行管理',
              score: fetchedSkillbadge.stage.progressManagement
            },
            {
              detail: '配信音響連携',
              score: fetchedSkillbadge.stage.livestreamAudioCoordination
            },
            {
              detail: 'コメント等反応対応',
              score: fetchedSkillbadge.stage.responseToCommentsAndOtherFeedback
            }
          ]
        },
        {
          title: 'ゲストオペレータ',
          code: 'GO',
          scoreSum: goSumScore,
          grade: calculateSkillgradeByScores(goScores),
          skills: [
            {
              detail: '来場者対応',
              score: fetchedSkillbadge.guestOperator.attendeeSupport
            },
            {
              detail: '関係者対応',
              score: fetchedSkillbadge.guestOperator.stakeholderManagement
            },
            {
              detail: 'レジ・決済',
              score: fetchedSkillbadge.guestOperator.cashRegisterPayment
            }
          ]
        }
      ])
    }

    fetchSkillbadgeAsync()
      .catch(err => { throw err })
  }, [user])

  return (
    <DefaultLayout>
      <h1>スキルバッジ</h1>
      <p>
        あなたが保有しているスキルバッジの詳細を表示します。
      </p>

      <Layout>
        {skillbadge?.map(section => <CardContainer key={section.code} grade={section.grade}>
          <CardMeta>
            <CardTitle>{section.code}</CardTitle>
            <CardSubTitle>{section.title}</CardSubTitle>
            <CardGrade>{GradeText[section.grade]}</CardGrade>
          </CardMeta>
          <CardContent>
            <table>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>スコア</th>
                </tr>
              </thead>
              <tbody>
                {section.skills.map((skill, i) => <tr key={i}>
                  <td>{skill.detail}</td>
                  <td>{skill.score}</td>
                </tr>)}
              </tbody>
            </table>
          </CardContent>
        </CardContainer>)}
      </Layout>
    </DefaultLayout>
  )
}

export default MyPageSkillBadgesPage

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
  }
`

const CardContainer = styled.section<{ grade: Grade }>`
  padding: 20px;
  ${props => {
    switch (props.grade) {
      case 0:
        return { backgroundColor: '#d0d0d0' }
      case 1:
        return { backgroundColor: '#ffcaa9' }
      case 2:
        return { backgroundColor: '#f8f8f8' }
      case 3:
        return { backgroundColor: '#ffe8a5' }
      case 4:
        return { backgroundColor: '#ffb0b0' }
    }
  }}
`
const CardMeta = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  margin-bottom: 10px;
`
const CardTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`
const CardSubTitle = styled.div`
  grid-row: 2;
`
const CardGrade = styled.div`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  font-size: 2em;
  font-weight: bold;
`
const CardContent = styled.div``
