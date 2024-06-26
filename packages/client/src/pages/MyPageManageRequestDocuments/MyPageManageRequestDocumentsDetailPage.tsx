import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import shared from '@muscadine/shared'

import FormButton from '../../components/form/FormButton'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormSection from '../../components/form/FormSection'
import FormTextarea from '../../components/form/FormTextarea'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import useRequestDocument from '../../hooks/useRequestDocument'
import useUser from '../../hooks/useUser'
import { getTypeTextByValue, getReasonTextByValue } from '../MyPageRequestDocuments/StepContainer/StepContainer'
import { getStatusText } from './MyPageManageRequestDocumentsListPage'
import type { MuscadineDocumentRequestDoc, MuscadineRequestStatus, MuscadineUser, MuscadineUserMeta } from 'muscadine'

const MyPageManageRequestDocumentsDetailPage: React.FC = () => {
  const { getDocumentRequestByIdAsync, updateDocumentRequestStatusByIdAsync } = useRequestDocument()
  const { getUserByIdAsync, getUserMetaByUserIdAsync, updateIDCardHistoryByUserIdAsync } = useUser()

  const { requestId } = useParams<{ requestId: string }>()
  const [request, setRequest] = useState<MuscadineDocumentRequestDoc>()
  const [userData, setUserData] = useState<MuscadineUser>()
  const [userMeta, setUserMeta] = useState<MuscadineUserMeta>()

  const [idCardRemarks, setIDCardRemarks] = useState<string>()

  const nextIdCardNumber = useMemo(() => {
    if (!request || request.type !== 'id-card') return
    if (!userMeta) return
    const year = new Date().getFullYear()
    const nextIssuedCount = userMeta.idCardIssuedCount + 1
    const issuedCountText = nextIssuedCount.toString().padStart(2, '0')
    const code = `${year}${userMeta.code}${issuedCountText}`
    return code
  }, [request, userMeta])

  const handleChangeStatus = useCallback((status: MuscadineRequestStatus) => {
    if (!requestId || !request || !userData) return
    if (request.type === 'id-card' && nextIdCardNumber && idCardRemarks) {
      updateIDCardHistoryByUserIdAsync(request.userId, {
        cardNumber: nextIdCardNumber,
        remarks: idCardRemarks,
        canUseRealNameForDisplay: userData.canUseRealNameForDisplay,
        allowShownFace: userData.allowShownFace
      })
        .catch(err => { throw err })
    }

    updateDocumentRequestStatusByIdAsync(requestId, status)
      .then(() => setRequest(s => (s && { ...s, status })))
      .catch(err => {
        throw err
      })
  }, [requestId, request, userData, nextIdCardNumber, idCardRemarks])

  useEffect(() => {
    const fetchDocumentRequestAsync = async (): Promise<void> => {
      if (!requestId) return
      const fetchedRequest = await getDocumentRequestByIdAsync(requestId)
      setRequest(fetchedRequest)
      const fetchedUserData = await getUserByIdAsync(fetchedRequest.userId)
      setUserData(fetchedUserData)
      const fetchedUserMeta = await getUserMetaByUserIdAsync(fetchedRequest.userId)
      setUserMeta(fetchedUserMeta)
    }
    fetchDocumentRequestAsync()
      .catch(err => { throw err })
  }, [requestId])

  return (
    <DefaultLayout>
      <h1>書類発行申請照会</h1>
      {(request && userData && userMeta && <>
        {(request.status !== 3) && <FormSection>
          {request.type === 'id-card' && request.status === 1 && <FormItem>
            <FormLabel>IDカード更新理由</FormLabel>
            <FormTextarea value={idCardRemarks} onChange={e => setIDCardRemarks(e.target.value)} placeholder='更新理由を簡潔に記入してください' />
          </FormItem>}
          <FormItem>
            {request.status === 0 && <FormButton onClick={() => handleChangeStatus(1)}>承認する</FormButton>}
            {request.status === 1 && <FormButton onClick={() => handleChangeStatus(3)} disabled={!idCardRemarks}>処理済みにする</FormButton>}
            {request.status !== 2 && <FormButton onClick={() => handleChangeStatus(2)} color="default">却下する</FormButton>}
          </FormItem>
        </FormSection>}

        <Layout>
          <Column>
            <h2>申請情報</h2>
            <table>
              <tbody>
                <tr>
                  <th>申請ID</th>
                  <td>{requestId}</td>
                </tr>
                <tr>
                  <th>申請ステータス</th>
                  <td>{getStatusText(request.status)}</td>
                </tr>
                <tr>
                  <th>申請元</th>
                  <td>{userData.name}(No.{userMeta.code})</td>
                </tr>
                <tr>
                  <th>申請日時</th>
                  <td>{new Date(request.timestamp).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>申請書類</th>
                  <td>{getTypeTextByValue(request.type)}</td>
                </tr>
                <tr>
                  <th>申請理由</th>
                  <td>{getReasonTextByValue(request.reason)}</td>
                </tr>
                <tr>
                  <th>備考</th>
                  <td>{request.remarks || '(空欄)'}</td>
                </tr>
              </tbody>
            </table>
          </Column>

          <Column>
            {request.type === 'business-card' && <>
              <h2>名刺発行情報</h2>
              <table>
                <tbody>
                  <tr>
                    <th>氏名</th>
                    <td>{userData.realName}</td>
                  </tr>
                  <tr>
                    <th>氏名(よみ)</th>
                    <td>{userData.realNameYomi}</td>
                  </tr>
                  <tr>
                    <th>メールアドレス</th>
                    <td>{userMeta.services.email}</td>
                  </tr>
                  <tr>
                    <th>親所属</th>
                    <td>{shared.constants.mainTeam[userMeta.team.mainId]}</td>
                  </tr>
                  <tr>
                    <th>子所属</th>
                    <td>{(userMeta.team.subId && shared.constants.subTeam[userMeta.team.subId]) ?? '-'}</td>
                  </tr>
                  <tr>
                    <th>補職</th>
                    <td>{userMeta.team.remarks}</td>
                  </tr>
                </tbody>
              </table>
            </>}
            {request.type === 'id-card' && <>
              <h2>メンバーIDカード発行情報</h2>
              <table>
                <tbody>
                  <tr>
                    <th>次回発行メンバーIDカードNo.</th>
                    <td>No.{nextIdCardNumber}</td>
                  </tr>
                  <tr>
                    <th>表示名</th>
                    <td>{userData.canUseRealNameForDisplay ? userData.realName : userData.name}</td>
                  </tr>
                  <tr>
                    <th>表示名(よみ)</th>
                    <td>{userData.canUseRealNameForDisplay ? userData.realNameYomi : userData.nameYomi}</td>
                  </tr>
                  <tr>
                    <th>顔出し可？</th>
                    <td>{userData.allowShownFace ? 'はい' : 'いいえ'}</td>
                  </tr>
                  <tr>
                    <th>親所属</th>
                    <td>{shared.constants.mainTeam[userMeta.team.mainId]}</td>
                  </tr>
                  <tr>
                    <th>現時点での再発行回数</th>
                    <td>{userMeta.idCardIssuedCount === 0 ? '未発行' : `${userMeta.idCardIssuedCount - 1}回`}</td>
                  </tr>
                </tbody>
              </table>

              <h3>トロフィー</h3>
              <p>
                - TBD -
              </p>
            </>}
          </Column>
        </Layout>
      </>) ?? null}

    </DefaultLayout>
  )
}

export default MyPageManageRequestDocumentsDetailPage

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
  }
`
const Column = styled.section``
