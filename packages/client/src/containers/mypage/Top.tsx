import { useEffect, useState } from 'react'
import type { MuscadineIDCardHistory, MuscadineUser, MuscadineUserMeta } from 'muscadine'

import styled from 'styled-components'
import DefaultLayout from '../../components/layouts/Default/DefaultLayout'
import useFirebase from '../../hooks/useFirebase'
import useUser from '../../hooks/useUser'

import shared from '@muscadine/shared'

const MyPageTop: React.FC = () => {
  const { user } = useFirebase()
  const {
    getUserById,
    getUserMetaByUserId,
    getIDCardHistoryByUserId
  } = useUser()

  const [userData, setUserData] = useState<MuscadineUser>()
  const [userMetaData, setUserMetaData] = useState<MuscadineUserMeta>()
  const [idCardHistory, setIDCardHistory] = useState<MuscadineIDCardHistory | null>()

  const onInitialize: () => void =
    () => {
      const fetchUserAsync: () => Promise<void> = async () => {
        if (!user) return

        const fetchedUser = await getUserById(user.uid)
        setUserData(fetchedUser)

        const fetchedUserMeta = await getUserMetaByUserId(user.uid)
        setUserMetaData(fetchedUserMeta)

        const fetchedIDCardHistory = await getIDCardHistoryByUserId(user.uid)
        const lastIDCardHistory = fetchedIDCardHistory
          .sort((a, b) => Number(b.cardNumber) - Number(a.cardNumber))[0] ?? null
        setIDCardHistory(lastIDCardHistory)
      }
      fetchUserAsync()
        .catch(err => {
          throw err
        })
    }
  useEffect(onInitialize, [user])

  return (
    <DefaultLayout>
      <h1>登録情報表示</h1>
      <p>
        N-Pointに登録している情報を表示しています。
      </p>

      {userData && userMetaData && idCardHistory !== undefined &&
        <Layout>
          <Column>

            <h2>基本情報</h2>
            <table>
              <tbody>
                <tr>
                  <th>登録名</th>
                  <td>{userData.name}</td>
                </tr>
                <tr>
                  <th>登録名(よみ)</th>
                  <td>{userData.nameYomi}</td>
                </tr>
                <tr>
                  <th>登録名(英語表記)</th>
                  <td>{userData.nameAlphabet}</td>
                </tr>
                <tr>
                  <th>Discordユーザ名</th>
                  <td>{userData.discordTag}</td>
                </tr>
              </tbody>
            </table>

            <h2>個人情報</h2>
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
                  <th>個人メールアドレス</th>
                  <td>{userData.personalEmail}</td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>{userData.telephone}</td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>〒{userData.postalCode}</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>{userData.address}</td>
                </tr>
              </tbody>
            </table>

            <h2>経費振込先情報</h2>
            <table>
              <tbody>
                <tr>
                  <th>銀行名</th>
                  <td>- TBD -</td>
                </tr>
                <tr>
                  <th>支店名</th>
                  <td>- TBD -</td>
                </tr>
                <tr>
                  <th>口座番号</th>
                  <td>- TBD -</td>
                </tr>
              </tbody>
            </table>
          </Column>

          <Column>

            <h2>所属情報</h2>
            <table>
              <tbody>
                <tr>
                  <th>メンバーコード</th>
                  <td>{userMetaData.code}</td>
                </tr>
                <tr>
                  <th>メンバーID</th>
                  <td>{userMetaData.uuid}</td>
                </tr>
                <tr>
                  <th>親所属</th>
                  <td>{shared.constants.mainTeam[userMetaData.team.mainId]}</td>
                </tr>
                <tr>
                  <th>子所属</th>
                  <td>{(userMetaData.team.subId && shared.constants.subTeam[userMetaData.team.subId]) ?? '-'}</td>
                </tr>
                <tr>
                  <th>補職</th>
                  <td>{userMetaData.team.remarks}</td>
                </tr>
              </tbody>
            </table>

            <h2>メンバーIDカード発行情報</h2>
            {idCardHistory !== null
              ? <table>
                <tbody>
                  <tr>
                    <th>メンバーIDカードNo.</th>
                    <td>{idCardHistory.cardNumber}</td>
                  </tr>
                  <tr>
                    <th>表示名</th>
                    <td>
                      {idCardHistory.canUseRealNameForDisplay
                        ? `氏名(${userData.realName})`
                        : `登録名(${userData.name})`}
                    </td>
                  </tr>
                  <tr>
                    <th>顔出し可？</th>
                    <td>{idCardHistory.allowShownFace ? 'はい' : 'いいえ'}</td>
                  </tr>
                  <tr>
                    <th>発行回数</th>
                    <td>{userMetaData.idCardIssuedCount}回</td>
                  </tr>
                  <tr>
                    <th>発行時コメント</th>
                    <td>{idCardHistory.remarks || '(空欄)'}</td>
                  </tr>
                </tbody>
              </table>
              : <p>IDカードは発行されていません</p>}

            <h2>登録システム情報</h2>
            <table>
              <tbody>
                <tr>
                  <th>メール</th>
                  <td>{userMetaData.services.email}</td>
                </tr>
                <tr>
                  <th>GIJI</th>
                  <td>{userMetaData.services.giji ?? '未登録'}</td>
                </tr>
                <tr>
                  <th>Redmine</th>
                  <td>{userMetaData.services.redmine ?? '未登録'}</td>
                </tr>
                <tr>
                  <th>えなれっじ</th>
                  <td>{userMetaData.services.knowledge ?? '未登録'}</td>
                </tr>
                <tr>
                  <th>N-Memkan</th>
                  <td>{userMetaData.services.memkan ?? '未登録'}</td>
                </tr>
              </tbody>
            </table>

          </Column>
        </Layout>}

    </DefaultLayout>
  )
}

export default MyPageTop

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
  }
`
const Column = styled.section``
