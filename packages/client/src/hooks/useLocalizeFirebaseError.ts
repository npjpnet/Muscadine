interface IUseLocalizeFirebaseError {
  localize: (errorMessage: string) => string
}
const useLocalizeFirebaseError = (): IUseLocalizeFirebaseError => {
  const localize = (errorMessage: string): string => {
    if (errorMessage.includes('auth/wrong-password') || errorMessage.includes('auth/user-not-found')) {
      return 'メールアドレスまたはパスワードが間違っています'
    } else if (errorMessage.includes('auth/email-already-in-use')) {
      return 'メールアドレスが既に使われています'
    } else {
      return errorMessage
    }
  }

  return {
    localize
  }
}

export default useLocalizeFirebaseError
