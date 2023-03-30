import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
}
const DefaultLayout: React.FC<Props> = (props) => (
  <Container>
    <Header />
    <Main>{props.children}</Main>
    <Footer />
  </Container>
)

export default DefaultLayout

const Container = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`
const Main = styled.main`
  padding: 40px 10%;
`
