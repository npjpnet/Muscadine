import styled from 'styled-components'

const Header: React.FC = () => (
  <Container>
    <Brand>
      🍇 Muscadine
    </Brand>
  </Container>
)

export default Header

const Container = styled.header`
  padding: 10px 10%;
  border-bottom: 2px solid var(--primary-color);
  background-color: #f0f0f0;
`
const Brand = styled.section`
  font-weight: bold;
`