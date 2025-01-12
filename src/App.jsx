
import Navbar from './components/NavBar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'


function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
