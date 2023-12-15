import { Link, useLocation,  } from "react-router-dom"
import home from '../images/home.png'
import back from '../images/back.png'
import revers from '../images/revers.png'
import profile from '../images/profile.png'
import add from '../images/add.png'

function Header ( {isClickedStatus, isClicked, isLoggedIn} ) {
  const location = useLocation()
  const MAINPAGE = '/'
  const ADDWORD = '/add'
  const PROFILE = '/profile'

  const goBack = () => {
      window.history.back()
  }

  const handleClick = () => {
    if(isClickedStatus) {
      isClicked(false)
    } else {
      isClicked(true)
    }
  }

  return(
    <header className="header">
      <Link to={MAINPAGE} ><img src={home} className="header__img"/></Link>
      <img src={back} className={location.pathname === MAINPAGE || !isLoggedIn ? 'hidden' : 'header__img' } onClick={goBack}/>
      <img src={revers} className={location.pathname === '/lesson' ? 'header__img' : 'hidden'} onClick={handleClick}/>
      <Link to={PROFILE} ><img src={profile} className={isLoggedIn ? 'header__img' : 'hidden'}/></Link>
      <Link to={ADDWORD} ><img src={add} className={isLoggedIn ? 'header__img' : 'hidden'}/></Link>
    </header>
  )
}

export default Header