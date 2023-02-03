import styles from "./App.module.css"
import { Route, Routes, useLocation } from "react-router-dom"
import homeIcon from '/images/icons/icon-home.svg';
import infoIcon from '/images/icons/icon-info-circle.svg';
import logoffIcon from '/images/icons/icon-power-off.svg';
import loginIcon from '/images/icons/icon-user-alt.svg';
import logo from '../public/images/icons/logo.svg';
import { Footer } from "./components/footer"
import { About } from "./pages/about"
import { History } from "./pages/history"
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { MenuButton } from "./components/menuButton";
import { useEffect, useState } from "react";
import { PrivateRoute } from './pages/login/privateRoute'
import {useNavigate} from 'react-router-dom'


function App() {
  const [menuTransparence, setMenuTransparence] = useState(false)
  const [logged, setLogged] = useState(false)
  const navigate = useNavigate()
  
  const location = useLocation()
  const checkScroll = () => {
    if (window.scrollY >=100) {
      setMenuTransparence(true)      
    } else {
      setMenuTransparence(false)      
    }    
  }
  useEffect(()=> {
    window.addEventListener('scroll', () => checkScroll()) 
    
  },[])

  useEffect(()=>{
    console.log(logged)
  },[logged])

  return (
    <div className="App">
      <header className={menuTransparence ? styles.header__fixed : styles.header}>
          <div className={styles.title}>
           <img onClick={()=>navigate("/")} src={logo} alt='logo' className={styles.logo} />
          </div>
          <div className={styles.menu}>
            {
              location.pathname === "/" 
                && 
                  <>
                    <MenuButton 
                      text = "SOBRE" 
                      icon = {infoIcon} 
                      link = "/sobre"
                      color = "contrast" 
                    /> 
                    <MenuButton 
                      text = "LOGIN" 
                      icon = {loginIcon} 
                      link = "/login"
                      color = ""
                    />
                  </> 
            }
            {
              location.pathname === "/sobre" 
                && 
                  <>
                    <MenuButton 
                      text = "HOME" 
                      icon = {homeIcon} 
                      link = "/"
                      color = "contrast" 
                    /> 
                    <MenuButton 
                      text = "LOGIN" 
                      icon = {loginIcon} 
                      link = "/login"
                      color = ""
                    />
                  </> 
            }
            {
              location.pathname === "/login" 
                && 
                    <MenuButton 
                      text = "HOME" 
                      icon = {homeIcon} 
                      link = "/"
                      color = "contrast" 
                    />  
            }
            {
              location.pathname === "/buscas" 
                && 
                  <>
                    <MenuButton 
                      text = "HOME" 
                      icon = {homeIcon} 
                      link = "/"
                      color = "contrast" 
                    /> 
                    <MenuButton 
                      text = "SAIR" 
                      icon = {logoffIcon} 
                      color = ""
                      link = "/login"
                    />
                  </> 
            }
          </div>
      </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/login" element={<Login setLogged={setLogged}  />} />
          <Route path='/buscas' element={  <History logged={logged} />  } />
        </Routes>
      <Footer />
    </div>
  )
}
// <PrivateRoute logged={ logged } />  }

export default App
