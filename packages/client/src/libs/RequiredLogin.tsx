import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useFirebase from '../hooks/useFirebase'
import type { MuscadineAccessLevel } from 'muscadine'

interface Props {
  allowAnonymous: boolean | undefined
  requiredAccessLevel: MuscadineAccessLevel | undefined
}
const RequiredLogin: React.FC<Props> = (props) => {
  const { isLoggedIn, accessLevel, logoutAsync } = useFirebase()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isLoggedIn === undefined || props.allowAnonymous) return
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location }, replace: true })
    }

    if (accessLevel === undefined || props.requiredAccessLevel === undefined) return
    if (props.requiredAccessLevel > (accessLevel ?? 0)) {
      logoutAsync()
        .then(() => navigate('/login'))
        .catch(err => { throw err })
    }
  }, [props.allowAnonymous, props.requiredAccessLevel, isLoggedIn, accessLevel])

  return null
}

export default RequiredLogin
