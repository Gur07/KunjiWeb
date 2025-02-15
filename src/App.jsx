import Navbar from './components/NavBar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/config'
import { ItemProvider } from './context/ItemContext.jsx'

function App() {
  return (
    <ItemProvider>
      <I18nextProvider i18n={i18n}>
      <Navbar />
      <Outlet />
      <Footer />
    </I18nextProvider>
    </ItemProvider>
    
  )
}

export default App
