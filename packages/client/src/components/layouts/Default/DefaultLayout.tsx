import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import type { MuscadineAccessLevel } from 'muscadine'

import useFirebase from '../../../hooks/useFirebase'

import Header from './Header'
import Menu from './Menu'

interface Props {
  children: React.ReactNode
  allowAnonymous?: boolean
  requiredAccessLevel?: MuscadineAccessLevel
}
const DefaultLayout: React.FC<Props> = (props) => {
  const { isLoggedIn, accessLevel, logout } = useFirebase()
  const navigate = useNavigate()

  const onChangeLoggedInState: () => void =
    () => {
      if (props.allowAnonymous ?? isLoggedIn === undefined) return
      if (!props.allowAnonymous && !isLoggedIn) {
        navigate('/login')
      }

      if (accessLevel === undefined) return
      if (props.requiredAccessLevel === undefined) return
      if (props.requiredAccessLevel > (accessLevel ?? 0)) {
        logout()
      }
    }
  useEffect(onChangeLoggedInState, [isLoggedIn, props.allowAnonymous, props.requiredAccessLevel])

  return (
    (isLoggedIn !== undefined && <Container>
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

  @media screen and (max-width: 840px) {
    padding: 20px;
  }
`
const MenuWrap = styled.section`
`
const Content = styled.main`
  padding: 20px;
`
