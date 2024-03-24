import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'
import LoginPage from '../LoginPage/LoginPage'
import MyPageEditPage from '../MyPageEdit/MyPageEditPage'
import MyPageEventHistoriesPage from '../MyPageEventHistories/MyPageEventHistoriesPage'
import MyPageManageRequestDocumentsDetailPage from '../MyPageManageRequestDocuments/MyPageManageRequestDocumentsDetailPage'
import MyPageManageRequestDocumentsListPage from '../MyPageManageRequestDocuments/MyPageManageRequestDocumentsListPage'
import MyPageManageRequestExpenseDetailPage from '../MyPageManageRequestExpense/MyPageManageRequestExpenseDetailPage'
import MyPageManageRequestExpenseListPage from '../MyPageManageRequestExpense/MyPageManageRequestExpenseListPage'
import MyPageManageTopPage from '../MyPageManageTop/MyPageManageTopPage'
import MyPageManageUsersPage from '../MyPageManageUsers/MyPageManageUsersPage'
import MyPageRequestDocumentsPage from '../MyPageRequestDocuments/MyPageRequestDocumentsPage'
import MyPageRequestExpensePage from '../MyPageRequestExpense/MyPageRequestExpensePage'
import MyPageSkillBadgesPage from '../MyPageSkillBadges/MyPageSkillBadgesPage'
import MyPageTopPage from '../MyPageTop/MyPageTopPage'
import { getFirebaseApp } from './../../libs/FirebaseApp'
import ColorStyle from './../../styles/Color'
import GlobalStyle from './../../styles/Global'
import './../../index.css'

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
        element: <MyPageTopPage />
      },
      {
        path: 'edit',
        element: <MyPageEditPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'skillbadges',
        element: <MyPageSkillBadgesPage />
      },
      {
        path: 'request-documents',
        element: <MyPageRequestDocumentsPage />
      },
      {
        path: 'request-expenses',
        element: <MyPageRequestExpensePage />
      },
      {
        path: 'event-history',
        element: <MyPageEventHistoriesPage />
      },
      {
        path: 'manage',
        children: [
          {
            index: true,
            element: <MyPageManageTopPage />
          },
          {
            path: 'request-documents',
            children: [
              {
                index: true,
                element: <MyPageManageRequestDocumentsListPage />
              },
              {
                path: ':requestId',
                element: <MyPageManageRequestDocumentsDetailPage />
              }
            ]
          },
          {
            path: 'request-expenses',
            children: [
              {
                index: true,
                element: <MyPageManageRequestExpenseListPage />
              },
              {
                path: ':requestId',
                element: <MyPageManageRequestExpenseDetailPage />
              }
            ]
          },
          {
            path: 'user',
            children: [
              {
                path: ':userId',
                element: <MyPageManageUsersPage />
              }
            ]
          }
        ]
      }
    ]
  }
])

const App: React.FC = () => {
  return (
    <>
      <ColorStyle />
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

export default App
