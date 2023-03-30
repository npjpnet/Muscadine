import styled from 'styled-components'

const Footer: React.FC = () => (
  <Container>
    &copy; 2023 N-Point, Nectarition
  </Container>
)

export default Footer

const Container = styled.footer`
  padding: 20px 10%;
  background-color: var(--secondary-color);
`
