import { Link, useLocation,  } from "react-router-dom"
import home from '../images/home.png'
import back from '../images/back.png'
import revers from '../images/revers.png'

function Header ( {isClickedStatus, isClicked} ) {
  const location = useLocation()

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
      <Link to='/' ><img src={home} className="header__img"/></Link>
      <img src={back} className={location.pathname === '/' ? 'hidden' : 'header__img' } onClick={goBack}/>
      <img src={revers} className={location.pathname === '/lesson' ? 'header__img' : 'hidden'} onClick={handleClick}/>
    </header>
  )
}

export default Header