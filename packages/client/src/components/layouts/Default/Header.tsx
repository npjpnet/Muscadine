import styled from 'styled-components'
import useFirebase from '../../../hooks/useFirebase'

const Header: React.FC = () => {
  const { user } = useFirebase()

  return (
    <Container>
      <Brand>
        Muscadine
      </Brand>
      {user && <Account>
        {user.email} としてログイン中
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
