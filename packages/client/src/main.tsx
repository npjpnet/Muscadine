import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom'

import './index.css'
import ResetStyle from './styles/Reset'
import GlobalStyle from './styles/Global'
import ColorStyle from './styles/Color'
import CustomStyle from './styles/Custom'

import LoginComponent from './containers/Login'
import MyPageTopComponent from './containers/mypage/Top'
import MyPageRequestDocumentComponent from './containers/mypage/RequestDocument'
import MyPageRequestExpenseComponent from './containers/mypage/RequestExpense'
import MyPageEventHistoryComponent from './containers/mypage/EventHistory'
import MyPageSkillBadgesComponent from './containers/mypage/SkillBadges'
import ManageTopComponent from './containers/manage/Top'
import ManageRequestDocumentComponent from './containers/manage/RequestDocument'
import ManageRequestExpenseComponent from './containers/manage/RequestExpense'

import { getFirebaseApp } from './libs/FirebaseApp'
getFirebaseApp()

const Root: React.FC = () => (
  <>
    <Outlet />
    <ScrollRestoration />
  </>
)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <MyPageTopComponent />
      },
      {
        path: 'login',
        element: <LoginComponent />
      },
      {
        path: 'skillbadges',
        element: <MyPageSkillBadgesComponent />
      },
      {
        path: 'request-documents',
        element: <MyPageRequestDocumentComponent />
      },
      {
        path: 'request-expenses',
        element: <MyPageRequestExpenseComponent />
      },
      {
        path: 'event-history',
        element: <MyPageEventHistoryComponent />
      },
      {
        path: 'manage',
        children: [
          {
            index: true,
            element: <ManageTopComponent />
          },
          {
            path: 'request-documents',
            element: <ManageRequestDocumentComponent />
          },
          {
            path: 'request-expenses',
            element: <ManageRequestExpenseComponent />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ResetStyle />
    <ColorStyle />
    <GlobalStyle />
    <CustomStyle />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
