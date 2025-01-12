import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DashboardPage from './components/dashboard/Dashboard.jsx'
import CoursesPage from './components/CoursesPage/CoursesPage.jsx'
import BudgetDashboard from "./components/BudgetDashboard/BudgetDashboard.jsx"
import ArticleSection from './components/ArticleSection/ArticleSection.jsx'
import AuthContainer from './components/SignRe/AuthContainer.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '',
        element:<DashboardPage />
      },
      {
        path: '/courses',
        element: <CoursesPage />
      },
      {
        path: '/budget',
        element:<BudgetDashboard />
      },
      {
        path: '/article',
        element:<ArticleSection />
      },
      {
        path: '/sign',
        element: <AuthContainer />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
