import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormSection from '../../components/form/FormSection'
import Alert from '../../components/parts/Alert'
import useFirebase from '../../hooks/useFirebase'
import useLocalizeFirebaseError from '../../hooks/useLocalizeFirebaseError'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { loginByEmailAsync, isLoggedIn } = useFirebase()
  const { localize } = useLocalizeFirebaseError()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isProcessing, setProcessing] = useState(false)
  const [error, setError] = useState<string>()

  const fromPathName = location.state?.from?.pathname as string | undefined

  useEffect(() => {
    if (!isLoggedIn) return
    navigate('/')
  }, [isLoggedIn])

  const handleLogin = useCallback(() => {
    setProcessing(true)
    loginByEmailAsync(email, password)
      .then(() => navigate(fromPathName || '/', { replace: true }))
      .catch((err: Error) => {
        setProcessing(false)
        const errorMessage = localize(err.message)
        setError(errorMessage)
      })
  }, [email, password, fromPathName])

  return (
    (isLoggedIn !== undefined && <DefaultLayout allowAnonymous={true}>
      <h1>🍇 N-Point Muscadine</h1>
      {fromPathName && <Alert title="ログインが必要です">
        このページにアクセスするにはログインが必要です
      </Alert>}
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
