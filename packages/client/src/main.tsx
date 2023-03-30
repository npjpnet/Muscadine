import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom'

import './index.css'
import ResetStyle from './styles/Reset'
import GlobalStyle from './styles/Global'
import ColorStyle from './styles/Color'
import CustomStyle from './styles/Custom'

import AppComponent from './containers/App'
import MyPageTopComponent from './containers/mypage/Top'
import MyPageRequestDocumentComponent from './containers/mypage/RequestDocument'
import ManageTopComponent from './containers/manage/Top'
import ManageRequestComponent from './containers/manage/Request'

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
        path: 'request-documents',
        element: <MyPageRequestDocumentComponent />
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
            element: <ManageRequestComponent />
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
