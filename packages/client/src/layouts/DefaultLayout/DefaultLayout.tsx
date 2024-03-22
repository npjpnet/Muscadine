import styled from 'styled-components'
import useFirebase from '../../hooks/useFirebase'
import RequiredLogin from '../../libs/RequiredLogin'
import Header from './Header'
import Menu from './Menu'
import type { MuscadineAccessLevel } from 'muscadine'

interface Props {
  children: React.ReactNode
  allowAnonymous?: boolean
  requiredAccessLevel?: MuscadineAccessLevel
}
const DefaultLayout: React.FC<Props> = (props) => {
  const { isLoggedIn } = useFirebase()

  return (
    (isLoggedIn !== undefined && <Container>
      <RequiredLogin
        allowAnonymous={props.allowAnonymous}
        requiredAccessLevel={props.requiredAccessLevel} />
      <Header />
      <Main>
        <MenuWrap>
          <Menu />
        </MenuWrap>
        <Content>
          {props.children}
        </Content>
      </Main>
    </Container>) || null
  )
}

export default DefaultLayout

const Container = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`
const Main = styled.section`
  padding: 20px 10%;
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: 10px;

  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    padding: 20px;
  }
`
const MenuWrap = styled.section`
`
const Content = styled.main`
  padding: 20px;
  @media screen and (max-width: 840px) {
    padding: 0;
  }
`
