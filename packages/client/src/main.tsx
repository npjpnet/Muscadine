import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom'

import './index.css'
import ResetStyle from './styles/Reset'
import GlobalStyle from './styles/Global'
import ColorStyle from './styles/Color'
import CustomStyle from './styles/Custom'

import AppComponent from './containers/App'

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
        element: <AppComponent />
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
