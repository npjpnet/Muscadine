import styled from 'styled-components'
import useFirebase from '../../../hooks/useFirebase'

const roleTexts = ['ユーザ', 'リーダ', '管理者']

const Header: React.FC = () => {
  const { user, accessLevel } = useFirebase()

  return (
    <Container>
      <Brand>
        Muscadine
      </Brand>
      {user && accessLevel !== undefined && <Account>
        {user.email} としてログイン中 ({(roleTexts[accessLevel ?? 0])})
      </Account>}
    </Container>
  )
}

export default Header

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 10%;
  background-color: var(--primary-color);
  color: #ffffff;
`
const Brand = styled.section`
  font-weight: bold;
`
const Account = styled.section`
  text-align: right;
`
