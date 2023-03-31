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
import MyPageEditComponent from './containers/mypage/Edit'
import MyPageRequestDocumentComponent from './containers/mypage/requestDocuments/RequestDocument'
import MyPageRequestExpenseComponent from './containers/mypage/RequestExpense'
import MyPageEventHistoryComponent from './containers/mypage/EventHistory'
import MyPageSkillBadgesComponent from './containers/mypage/SkillBadges'
import ManageTopComponent from './containers/manage/Top'
import ManageUserComponent from './containers/manage/ManageUser'
import ManageRequestDocumentListComponent from './containers/manage/requestDocuments/List'
import ManageRequestDocumentDetailComponent from './containers/manage/requestDocuments/Detail'
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
        path: 'edit',
        element: <MyPageEditComponent />
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
            children: [
              {
                index: true,
                element: <ManageRequestDocumentListComponent />
              },
              {
                path: ':requestId',
                element: <ManageRequestDocumentDetailComponent />
              }
            ]
          },
          {
            path: 'request-expenses',
            element: <ManageRequestExpenseComponent />
          },
          {
            path: 'user',
            children: [
              {
                path: ':userId',
                element: <ManageUserComponent />
              }
            ]
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
  </React.StrictMode>
)
