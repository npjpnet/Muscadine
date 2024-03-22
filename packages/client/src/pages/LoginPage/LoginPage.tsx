import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormSection from '../../components/form/FormSection'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import Alert from '../../components/parts/Alert'
import useFirebase from '../../hooks/useFirebase'
import useLocalizeFirebaseError from '../../hooks/useLocalizeFirebaseError'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { loginByEmailAsync, isLoggedIn } = useFirebase()
  const { localize } = useLocalizeFirebaseError()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isProcessing, setProcessing] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (isLoggedIn === undefined || !isLoggedIn) return
    navigate('/')
  }, [isLoggedIn])

  const handleLogin = useCallback(() => {
    setProcessing(true)
    loginByEmailAsync(email, password)
      .then(() => navigate('/'))
      .catch((err: Error) => {
        setProcessing(false)
        const errorMessage = localize(err.message)
        setError(errorMessage)
      })
  }, [email, password])

  return (
    (isLoggedIn !== undefined && <DefaultLayout>
      <h1>🍇 N-Point Muscadine</h1>
      {error && <Alert title="エラーが発生しました">{error}</Alert>}
      <FormSection>
        <FormItem>
          <FormLabel>メールアドレス</FormLabel>
          <FormInput type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormItem>
        <FormItem>
          <FormLabel>パスワード</FormLabel>
          <FormInput type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </FormItem>
      </FormSection>
      <FormSection>
        <FormItem>
          <FormButton
            onClick={handleLogin}
            disabled={isProcessing}>ログイン</FormButton>
        </FormItem>
      </FormSection>
    </DefaultLayout>) || null
  )
}

export default LoginPage
