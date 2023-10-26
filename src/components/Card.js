import { useNavigate, useLocation } from "react-router-dom";

function Card ( {title} ) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  function handleClick() {
    if (currentPath === '/') {
      navigate(`/${title}`)
    } else {
      navigate('/lesson', {state:{lesson:title}})
    }

  }

  return (
    <div className="card" onClick={handleClick}>
      <h2 className="card__title">{title}</h2>
    </div>
  )
}

export default Card;