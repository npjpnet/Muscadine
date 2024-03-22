import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormRadio from '../../components/form/FormRadio'
import FormSection from '../../components/form/FormSection'
import FormSelect from '../../components/form/FormSelect'
import DefaultLayout from '../../components/layouts/DefaultLayout/DefaultLayout'
import useUser from '../../hooks/useUser'
import type { MuscadineUserDoc, MuscadineUserMeta } from 'muscadine'

const canUseRealNameForDisplayOption = [
  {
    value: 'yes',
    text: '氏名'
  },
  {
    value: 'no',
    text: '登録名'
  }
]
const allowShownFaceOption = [
  {
    value: 'yes',
    text: '顔出しOK!'
  },
  {
    value: 'no',
    text: 'ぼかしてほしい'
  }
]
const mainTeamOption = [
  {
    value: 'hqTm',
    text: '総務部'
  },
  {
    value: 'plTm',
    text: '企画構成チーム'
  },
  {
    value: 'pbTm',
    text: '音響配信チーム'
  },
  {
    value: 'd2Tm',
    text: 'D2(開発デザイン)チーム'
  },
  {
    value: 'dpTm',
    text: 'Dep.チーム'
  },
  {
    value: 'lgTm',
    text: 'ロジスティクスチーム'
  }
]
const subTeamOption = [
  {
    value: 'pbTmVpaSc',
    text: '音響配信/音響セクション'
  },
  {
    value: 'pbTmBrdSc',
    text: '音響配信/配信セクション'
  },
  {
    value: 'pbTmStgSc',
    text: '音響配信/ステージセクション'
  },
  {
    value: 'd2TmSysSc',
    text: 'D2/システムセクション'
  },
  {
    value: 'd2TmDesSc',
    text: 'D2/デザインセクション'
  },
  {
    value: 'd2TmNetSc',
    text: 'D2/ネットワークセクション'
  }
]

const MyPageManageUsersPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const { getUserByIdAsync, getUserMetaByUserIdAsync, updateUserByIdAsync, updateUserMetaByIdAsync } = useUser()

  const [userData, setUserData] = useState<MuscadineUserDoc>()
  const [userMeta, setUserMeta] = useState<MuscadineUserMeta>()

  useEffect(() => {
    const fetchUserAsync: () => Promise<void> =
      async () => {
        if (!userId) return
        const fetchedUserData = await getUserByIdAsync(userId)
        setUserData(fetchedUserData)
        const fetchedUserMeta = await getUserMetaByUserIdAsync(userId)
        setUserMeta(fetchedUserMeta)
      }
    fetchUserAsync()
      .catch(err => {
        throw err
      })
  }, [userId])

  const handleChange = useCallback(() => {
    if (!userId || !userData || !userMeta) return
    updateUserByIdAsync(userId, userData)
      .then(async () => {
        await updateUserMetaByIdAsync(userId, userMeta)
        alert('更新しました')
      })
      .catch(err => { throw err })
  }, [userId, userData, userMeta])

  return (
    <DefaultLayout requiredAccessLevel={2}>
      <h1>メンバー情報管理</h1>
      {userId && userData && userMeta && <>
        <h2>{userData.name} / No.{userMeta.code} / {userId}</h2>

        <FormSection>
          <FormItem>
            <FormButton onClick={handleChange}>更新</FormButton>
          </FormItem>
        </FormSection>

        <h3>基礎情報</h3>
        <Layout>
          <Column>
            <h4>基本情報</h4>
            <FormSection>
              <FormItem>
                <FormLabel>登録名</FormLabel>
                <FormInput value={userData.name} onChange={e => setUserData(s => (s && { ...s, name: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>登録名(よみ)</FormLabel>
                <FormInput value={userData.nameYomi} onChange={e => setUserData(s => (s && { ...s, nameYomi: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>登録名(英語表記)</FormLabel>
                <FormInput value={userData.nameAlphabet} onChange={e => setUserData(s => (s && { ...s, nameAlphabet: e.target.value }))} />
              </FormItem>
            </FormSection>
          </Column>
          <Column>
            <h4>連絡先</h4>
            <FormSection>
              <FormItem>
                <FormLabel>Discordユーザ名</FormLabel>
                <FormInput value={userData.discordTag} onChange={e => setUserData(s => (s && { ...s, discordTag: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormInput value={userData.personalEmail} onChange={e => setUserData(s => (s && { ...s, personalEmail: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>電話番号</FormLabel>
                <FormInput value={userData.telephone} onChange={e => setUserData(s => (s && { ...s, telephone: e.target.value }))} />
              </FormItem>
            </FormSection>
          </Column>
          <Column>
            <h4>個人情報</h4>
            <FormSection>
              <FormItem>
                <FormLabel>氏名</FormLabel>
                <FormInput value={userData.realName} onChange={e => setUserData(s => (s && { ...s, realName: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>氏名(よみ)</FormLabel>
                <FormInput value={userData.realNameYomi} onChange={e => setUserData(s => (s && { ...s, realNameYomi: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>郵便番号</FormLabel>
                <FormInput value={userData.postalCode} onChange={e => setUserData(s => (s && { ...s, postalCode: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>住所</FormLabel>
                <FormInput value={userData.address} onChange={e => setUserData(s => (s && { ...s, address: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>生年月日</FormLabel>
                <FormInput type="date" value={userData.birthday} onChange={e => setUserData(s => (s && { ...s, birthday: e.target.value }))} />
              </FormItem>
            </FormSection>
          </Column>
          <Column>
            <h4>プライバシー情報</h4>
            <p>
              別途メンバーIDカードの再発行申請が必要です。
            </p>
            <FormSection>
              <FormItem>
                <FormLabel>メンバーIDカードに表示する名前</FormLabel>
                <FormRadio
                  name="canUseRealNameForDisplay"
                  values={canUseRealNameForDisplayOption}
                  value={userData.canUseRealNameForDisplay ? 'yes' : 'no'}
                  onChange={v => setUserData(s => s && ({ ...s, canUseRealNameForDisplay: v === 'yes' }))} />
              </FormItem>
              <FormItem>
                <FormLabel>広報画像でのモザイク配慮</FormLabel>
                <FormRadio
                  name="allowShownFace"
                  values={allowShownFaceOption}
                  value={userData.allowShownFace ? 'yes' : 'no'}
                  onChange={v => setUserData(s => s && ({ ...s, allowShownFace: v === 'yes' }))} />
              </FormItem>
            </FormSection>
          </Column>
        </Layout>

        <h3>メタ情報</h3>
        <Layout>
          <Column>
            <h4>基本情報</h4>
            <FormSection>
              <FormItem>
                <FormLabel>UUID</FormLabel>
                <FormInput value={userMeta.uuid} onChange={e => setUserMeta(s => (s && { ...s, uuid: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>メンバーID</FormLabel>
                <FormInput value={userMeta.code} onChange={e => setUserMeta(s => (s && { ...s, code: e.target.value }))} />
              </FormItem>
            </FormSection>

            <h4>チーム</h4>
            <FormSection>
              <FormItem>
                <FormLabel>親所属</FormLabel>
                <FormSelect
                  value={userMeta.team.mainId}
                  onChange={e => setUserMeta(s => (s && { ...s, team: { ...s.team, mainId: e.target.value } }))} >
                  <option>選択してください</option>
                  {mainTeamOption.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
                </FormSelect>
              </FormItem>
              <FormItem>
                <FormLabel>子所属</FormLabel>
                <FormSelect
                  value={userMeta.team.subId}
                  onChange={e => setUserMeta(s => (s && { ...s, team: { ...s.team, subId: e.target.value ?? '' } }))} >
                  <option value="">選択してください</option>
                  {subTeamOption.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
                </FormSelect>
              </FormItem>
              <FormItem>
                <FormLabel>補職</FormLabel>
                <FormInput
                  value={userMeta.team.remarks}
                  onChange={e => setUserMeta(s => (s && { ...s, team: { ...s.team, remarks: e.target.value } }))} />
              </FormItem>
            </FormSection>
          </Column>
          <Column>
            <h4>サービス情報</h4>
            <FormSection>
              <FormItem>
                <FormLabel>メール</FormLabel>
                <FormInput
                  value={userMeta.services.email}
                  onChange={e => setUserMeta(s => (s && { ...s, services: { ...s.services, email: e.target.value } }))} />
              </FormItem>
              <FormItem>
                <FormLabel>GIJI</FormLabel>
                <FormInput
                  value={userMeta.services.giji}
                  onChange={e => setUserMeta(s => (s && { ...s, services: { ...s.services, giji: e.target.value } }))} />
              </FormItem>
              <FormItem>
                <FormLabel>Redmine</FormLabel>
                <FormInput
                  value={userMeta.services.redmine}
                  onChange={e => setUserMeta(s => (s && { ...s, services: { ...s.services, redmine: e.target.value } }))} />
              </FormItem>
              <FormItem>
                <FormLabel>えなれっじ</FormLabel>
                <FormInput
                  value={userMeta.services.knowledge}
                  onChange={e => setUserMeta(s => (s && { ...s, services: { ...s.services, knowledge: e.target.value } }))} />
              </FormItem>
              <FormItem>
                <FormLabel>N-Memkan</FormLabel>
                <FormInput
                  value={userMeta.services.memkan}
                  onChange={e => setUserMeta(s => (s && { ...s, services: { ...s.services, memkan: e.target.value } }))} />
              </FormItem>
            </FormSection>
          </Column>
          <Column>
            <h4>メンバーIDカード</h4>
            <FormSection>
              <FormItem>
                <FormLabel>メンバーIDカード発行回数</FormLabel>
                <FormInput
                  type="number"
                  value={userMeta.idCardIssuedCount}
                  onChange={e => setUserMeta(s => (s && { ...s, idCardIssuedCount: Number(e.target.value) }))} />
              </FormItem>
            </FormSection>
          </Column>
        </Layout>
      </>}
    </DefaultLayout>
  )
}

export default MyPageManageUsersPage

const Layout = styled.section`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
  }
`
const Column = styled.section``
