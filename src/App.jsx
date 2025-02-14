import Navbar from './components/NavBar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/config'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Navbar />
      <Outlet />
      <Footer />
    </I18nextProvider>
  )
}

export default App
