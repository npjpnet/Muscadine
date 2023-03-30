import styled from 'styled-components'

const Header: React.FC = () => (
  <Container>
    <Brand>
      Muscadine
    </Brand>
    <Account>
      ts@n-point.net としてログイン中
    </Account>
  </Container>
)

export default Header

const Container = styled.header`
  display: flex;
  justify-content: space-between;
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
