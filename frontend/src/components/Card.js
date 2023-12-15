import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Card ( {title} ) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const MAINPAGE = '/'
  const titleRef = useRef()
  const cardRef = useRef()


  function handleClick() {
    if (currentPath === MAINPAGE) {
      navigate(`/${title}`)
    } else {
      navigate('/lesson', {state:{lesson:title}})
    }
  }

  useEffect(() => {
    const cardElement = cardRef.current;
    const titleElement = titleRef.current;
  
    if (cardElement && titleElement) {
      const handleMouseEnter = () => {
        titleElement.classList.add('card__title_active');
      };
  
      const handleMouseLeave = () => {
        titleElement.classList.remove('card__title_active');
      };
  
      cardElement.addEventListener('mouseenter', handleMouseEnter);
      cardElement.addEventListener('mouseleave', handleMouseLeave);
  
      return () => {
        // Очистка слушателей при размонтировании компонента
        cardElement.removeEventListener('mouseenter', handleMouseEnter);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [cardRef, titleRef]);

  

  return (
    <div className="card" onClick={handleClick} ref={cardRef}>
      <h2 className="card__title" ref={titleRef}>{title}</h2>
    </div>
  )
}

export default Card;