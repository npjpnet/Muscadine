import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { type MuscadineBankAccount, type MuscadineUserDoc } from 'muscadine'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormRadio from '../../components/form/FormRadio'
import FormSection from '../../components/form/FormSection'
import useFirebase from '../../hooks/useFirebase'
import useUser from '../../hooks/useUser'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'

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

const MyPageEditPage: React.FC = () => {
  const { user } = useFirebase()
  const { getUserByIdAsync, updateUserByIdAsync } = useUser()

  const [userData, setUserData] = useState<MuscadineUserDoc>()

  const [bankAccount, setBankAccount] = useState<MuscadineBankAccount>({
    bankName: '',
    branchName: '',
    bankAccountNumber: ''
  })

  const handleChange = useCallback(() => {
    if (!user || !userData) return

    const fetchedUserData: MuscadineUserDoc = {
      ...userData,
      bankAccount
    }

    updateUserByIdAsync(user.uid, fetchedUserData)
      .then(() => alert('更新しました'))
      .catch(err => {
        throw err
      })
  }, [user, userData, bankAccount])

  useEffect(() => {
    const fetchUserAsync = async (): Promise<void> => {
      if (!user) return
      const fetchedUser = await getUserByIdAsync(user.uid)
      setUserData(fetchedUser)

      if (fetchedUser.bankAccount) {
        setBankAccount(fetchedUser.bankAccount)
      }
    }
    fetchUserAsync()
      .catch(err => { throw err })
  }, [user])

  return (
    <DefaultLayout>
      <h1>登録内容編集</h1>
      <p>
        N-Pointに登録している情報を編集します。
      </p>

      {userData && <>
        <FormSection>
          <FormItem>
            <FormButton onClick={handleChange}>更新</FormButton>
          </FormItem>
        </FormSection>
        <Layout>
          <Column>
            <h2>基本情報</h2>
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
            <h2>連絡先</h2>
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
            <h2>個人情報</h2>
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
            <h2>プライバシー情報</h2>
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
          <Column>
            <h2>経費振込先情報</h2>
            <FormSection>
              <FormItem>
                <FormLabel>銀行名</FormLabel>
                <FormInput
                  value={bankAccount.bankName}
                  onChange={e => setBankAccount(s => ({ ...s, bankName: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>支店名</FormLabel>
                <FormInput
                  value={bankAccount.branchName}
                  onChange={e => setBankAccount(s => ({ ...s, branchName: e.target.value }))} />
              </FormItem>
              <FormItem>
                <FormLabel>口座番号</FormLabel>
                <FormInput
                  value={bankAccount.bankAccountNumber}
                  onChange={e => setBankAccount(s => ({ ...s, bankAccountNumber: e.target.value }))} />
              </FormItem>
            </FormSection>
          </Column>
        </Layout>
      </>}
    </DefaultLayout>
  )
}

export default MyPageEditPage

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
