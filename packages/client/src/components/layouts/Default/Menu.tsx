import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import {
  MdLogin,
  MdLogout,
  MdAccountBox,
  MdContactPage,
  MdHistory,
  MdViewList,
  MdInbox
} from 'react-icons/md'

const sections: {
  title: string
  items: {
    id: string,
    to: string,
    icon: React.ReactNode,
    text: string
  }[]
}[] = [
    {
      title: 'マイページ',
      items: [
        {
          id: 'top',
          to: '/',
          icon: <MdAccountBox />,
          text: 'プロフィール'
        },
        {
          id: 'eventHistory',
          to: '/event-history',
          icon: <MdHistory />,
          text: 'イベント参加履歴'
        },
        {
          id: 'requestDocuments',
          to: '/request-documents',
          icon: <MdContactPage />,
          text: '書類発行申請'
        }
      ]
    },
    {
      title: 'メンバー管理',
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
      ]
    }
  ]

const Menu: React.FC = () => (
  <Container>
    <Section>
      <ItemButton>
        <Icon><MdLogin /></Icon>
        <Text>ログイン</Text>
      </ItemButton>
    </Section>
    <Section>
      <ItemButton>
        <Icon><MdLogout /></Icon>
        <Text>ログアウト</Text>
      </ItemButton>
    </Section>
    {sections.map(section => <Section>
      <Heading>{section.title}</Heading>
      {section.items.map(item => <ItemLink key={item.id} to={item.to}>
        <Icon>{item.icon}</Icon>
        <Text>{item.text}</Text>
      </ItemLink>)}
    </Section>)
    }
  </Container>
)

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
