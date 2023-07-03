import styled, { css } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import type { MuscadineAccessLevel } from 'muscadine'

import {
  MdLogout,
  MdAccountBox,
  MdEdit,
  MdStars,
  MdContactPage,
  MdReceipt,
  MdHistory,
  MdViewList,
  MdInbox,
  MdReceiptLong
} from 'react-icons/md'

import useFirebase from '../../../hooks/useFirebase'

const sections: Array<{
  id: string
  title: string
  items: Array<{
    id: string
    to: string
    icon: React.ReactNode
    text: string
  }>
  requiredAccessLevel?: MuscadineAccessLevel
}> = [
    {
      id: 'mypage',
      title: 'マイページ',
      items: [
        {
          id: 'top',
          to: '/',
          icon: <MdAccountBox />,
          text: 'プロフィール'
        },
        {
          id: 'edit',
          to: '/edit',
          icon: <MdEdit />,
          text: '登録情報編集'
        },
        // {
        //   id: 'skillbadges',
        //   to: '/skillbadges',
        //   icon: <MdStars />,
        //   text: 'スキルバッジ'
        // },
        // {
        //   id: 'eventHistory',
        //   to: '/event-history',
        //   icon: <MdHistory />,
        //   text: 'イベント参加履歴(TBD)'
        // },
        {
          id: 'requestDocuments',
          to: '/request-documents',
          icon: <MdContactPage />,
          text: '書類発行申請'
        },
        // {
        //   id: 'requestExpenses',
        //   to: '/request-expenses',
        //   icon: <MdReceipt />,
        //   text: '経費申請(TBD)'
        // }
      ]
    },
    {
      id: 'manage',
      title: 'メンバー管理',
      requiredAccessLevel: 2,
      items: [
        {
          id: 'manageTop',
          to: '/manage',
          icon: <MdViewList />,
          text: 'メンバー管理トップ'
        },
        {
          id: 'manageRequestDocuments',
          to: '/manage/request-documents',
          icon: <MdInbox />,
          text: '書類発行申請管理'
        },
        // {
        //   id: 'manageRequestExpenses',
        //   to: '/manage/request-expenses',
        //   icon: <MdReceiptLong />,
        //   text: '経費申請管理(TBD)'
        // }
      ]
    }
  ]

const Menu: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn, accessLevel, logout } = useFirebase()
  const handleLogout: () => void =
    () => {
      logout()
      navigate('/login')
    }

  return (
    <>
      <Container>
        {isLoggedIn && accessLevel !== undefined && <>
          {sections
            .filter(section => !section.requiredAccessLevel || (section.requiredAccessLevel <= (accessLevel ?? 0)))
            .map(section => <Section key={section.id}>
              <Heading>{section.title}</Heading>
              {section.items.map(item => <ItemLink key={item.id} to={item.to}>
                <Icon>{item.icon}</Icon>
                <Text>{item.text}</Text>
              </ItemLink>)}
            </Section>)}
        </>}
        {isLoggedIn && <Section>
          <ItemButton onClick={handleLogout}>
            <Icon><MdLogout /></Icon>
            <Text>ログアウト</Text>
          </ItemButton>
        </Section>}
      </Container>
    </>
  )
}

export default Menu

const Container = styled.nav`
`
const Section = styled.section`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`
const Heading = styled.h2`
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
  
  padding: 0 5px;
  font-size: 1rem;
`

const itemStyle = css`
  display: grid;
  width: 100%;
  padding: 0;
  grid-template-columns: 32px 1fr;
  text-decoration: none;
  color: inherit;
  background-color: #ffffff;
  text-align: left;
  font: inherit;
  cursor: pointer;
  &:hover {
    background-color: var(--secondary-color);
  }
`
const ItemLink = styled(Link)`
  ${itemStyle}
`
const ItemButton = styled.span`
  ${itemStyle}
`
const Icon = styled.div`
  display: flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
`
const Text = styled.div`
  padding: 10px 0;
`
