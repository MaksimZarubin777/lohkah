import { useEffect, useRef, useState } from "react";
import next from '../images/next.png'
import previous from '../images/previous.png'
import restart from '../images/restart.png'

function Word ( {word, isReversed} ) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [nextButton, setNextButton] = useState(next)
  const [hidden, setHidden] = useState('hidden')
  const [vertical, setVertical] = useState('')
  const nextButtonRef = useRef()
  const prevButtonref = useRef()

  function handleClickNext() {
    if (currentWordIndex < word.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else if (currentWordIndex === word.length - 1) {
      setCurrentWordIndex(0)
      setNextButton(next)
    }
    setHidden('hidden')
  }

  function handleClickPrevious() {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
    }
    setHidden('hidden')
  }

  function handleShowContent() {
    setHidden('')
  }

  useEffect(() => {
    if (currentWordIndex === word.length - 1) {
      setNextButton(restart)
    } else if (currentWordIndex === 0) {
      prevButtonref.current.classList.add('hidden')
    } else {
      setNextButton(next)
      nextButtonRef.current.classList.remove('hidden')
      prevButtonref.current.classList.remove('hidden')
    }
  },[currentWordIndex])

  useEffect(() => {
    function handleKeyboardManager(e) {
      e.preventDefault()
      if (e.keyCode === 32) {
        handleShowContent()
      }
      if (e.keyCode === 37) {
        handleClickPrevious()
      }
      if (e.keyCode === 39) {
        handleClickNext()
      }
      if (e.keyCode === 32 && hidden === '') {
        handleClickNext()
      }
    }

    document.addEventListener('keydown', handleKeyboardManager)

    return () => {
      document.removeEventListener('keydown', handleKeyboardManager)
    }
  })

  useEffect(() => {
    const handleVertical = () => {
      if (window.innerWidth <= 550 && hidden !== '') { //если размер экрана 550 и текст показан, то титл будет вертикальным
        setVertical('')
      } else if (window.innerWidth <= 550 && hidden === ''){
        setVertical('word__title_vertical')
      } else {
        setVertical('')
      }

    }
    window.addEventListener('resize', handleVertical)
    return () => {
      window.removeEventListener('resize', handleVertical)
    }
  }, [hidden,window.innerWidth])

  return (
    <div className="word">
      <div className="word__button" onClick={handleClickPrevious}>
        <img className="word__button_img" src={previous} ref={prevButtonref} onClick={handleClickPrevious}></img>
      </div>

      <div className="word__content" onClick={handleShowContent}>
        <p className={`word__title ${vertical}`}>{isReversed ? word[currentWordIndex].translate : word[currentWordIndex].word}</p>
        <div className={`word__translate_content ${hidden}`}>
          <p className="word__translate">{isReversed ? word[currentWordIndex].word : word[currentWordIndex].translate}</p>
          <p className="word__example">{word[currentWordIndex].example}</p>
        </div>
      </div>

      <div className="word__button" onClick={handleClickNext}>
        <img className="word__button_img" src={nextButton} ref={nextButtonRef} ></img>
      </div>
    </div>
  )
}

export default Word;