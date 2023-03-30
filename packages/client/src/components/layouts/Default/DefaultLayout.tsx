import styled from 'styled-components'

import Header from './Header'
import Menu from './Menu'

interface Props {
  children: React.ReactNode
}
const DefaultLayout: React.FC<Props> = (props) => (
  <Container>
    <Header />
    <Main>
      <MenuWrap>
        <Menu />
      </MenuWrap>
      <Content>
        {props.children}
      </Content>
    </Main>
  </Container>
)

export default DefaultLayout

const Container = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`
const Main = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: 20% 1fr;
`
const MenuWrap = styled.section`
`
const Content = styled.main`
  padding: 20px;
`
