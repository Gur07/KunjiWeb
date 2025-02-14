import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import i18n from './i18n/config'  
import App from './App.jsx'
import DashboardPage from './components/dashboard/Dashboard.jsx'
import CoursesPage from './components/CoursesPage/CoursesPage.jsx'
import BudgetDashboard from "./components/BudgetDashboard/BudgetDashboard.jsx"
import ArticleSection from './components/ArticleSection/ArticleSection.jsx'
import AuthContainer from './components/SignRe/AuthContainer.jsx'
import ProfilePage from './components/Profile/ProfilePage.jsx'
import { LanguageProvider } from './context/LanguageContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'courses',
        element: <CoursesPage />
      },
      {
        path: 'budget',
        element: <BudgetDashboard />
      },
      {
        path: 'articles',
        element: <ArticleSection />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthContainer />
  }
])

// Wait for i18n to initialize before rendering
i18n.init().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </StrictMode>
  )
})
