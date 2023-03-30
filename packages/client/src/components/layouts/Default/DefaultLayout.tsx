import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import useFirebase from '../../../hooks/useFirebase'

import Header from './Header'
import Menu from './Menu'

interface Props {
  children: React.ReactNode
  allowAnonymous?: boolean
}
const DefaultLayout: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useFirebase()

  const onChangeLoggedInState: () => void =
    () => {
      if (props.allowAnonymous ?? isLoggedIn === undefined) return
      if (isLoggedIn) return
      navigate('/login')
    }
  useEffect(onChangeLoggedInState, [isLoggedIn, props.allowAnonymous])

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
`
const MenuWrap = styled.section`
`
const Content = styled.main`
  padding: 20px;
`
