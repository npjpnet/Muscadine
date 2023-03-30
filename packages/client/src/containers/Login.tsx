import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useFirebase from '../hooks/useFirebase'
import useLocalizeFirebaseError from '../hooks/useLocalizeFirebaseError'

import DefaultLayout from '../components/layouts/Default/DefaultLayout'
import Alert from '../components/parts/Alert'
import FormSection from '../components/form/FormSection'
import FormItem from '../components/form/FormItem'
import FormLabel from '../components/form/FormLabel'
import FormInput from '../components/form/FormInput'
import FormButton from '../components/form/FormButton'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { loginByEmail, isLoggedIn } = useFirebase()
  const { localize } = useLocalizeFirebaseError()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isProcessing, setProcessing] = useState(false)
  const [error, setError] = useState<string>()

  const onChangeLoggedState = () => {
    if (isLoggedIn === undefined || !isLoggedIn) return
    navigate('/')
  }
  useEffect(onChangeLoggedState, [isLoggedIn])

  const handleLogin = () => {
    setProcessing(true)
    loginByEmail(email, password)
      .then(() => navigate('/'))
      .catch((err: Error) => {
        setProcessing(false)
        const errorMessage = localize(err.message)
        setError(errorMessage)
      })
  }

  return (
    isLoggedIn !== undefined && <DefaultLayout>
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
    </DefaultLayout> || null
  )
}

export default Login
