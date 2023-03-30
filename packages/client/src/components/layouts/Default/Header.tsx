import styled from 'styled-components'

const Header: React.FC = () => (
  <Container>
    <Brand>
      Muscadine
    </Brand>
  </Container>
)

export default Header

const Container = styled.header`
  padding: 10px;
  background-color: var(--primary-color);
  color: #ffffff;
`
const Brand = styled.section`
  font-weight: bold;
`