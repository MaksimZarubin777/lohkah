import { useRef, useState } from "react"
import { addWord } from "../utils/languages"

function AddWords ( {onSubmit} ) {

  const [formData, setFormData] = useState()
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true)
  const cnRef = useRef()
  const engRef = useRef()
  const exRef = useRef()

  const handleChangeLanguageEng = () => {
    setIsLanguageEnglish(true)
  }

  const handleChangeLanguageCn = () => {
    setIsLanguageEnglish(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const clearInputs = () => {
    cnRef.current.value = ''
    engRef.current.value = ''
    exRef.current.value = ''
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit(formData)
    clearInputs()
  }

  return (
    <div className="add-word">
      <div className="add-word__container">
      <div className="language">
        <p className={isLanguageEnglish ? 'language__active' : ''} onClick={handleChangeLanguageEng}>EN</p>
        <p className={!isLanguageEnglish ? 'language__active' : ''} onClick={handleChangeLanguageCn}>中</p>
      </div>
        <p className="add-word__title">{isLanguageEnglish ? addWord.eng.title : addWord.cn.title}</p>
        <form action="" method="post" className="add-word__form" onSubmit={handleSubmit} >
          <p className="add-word__form__input-block">
            <label for="department">{isLanguageEnglish ? addWord.eng.department_input : addWord.cn.department_input}</label>
            <input type="text" onChange={handleChange} name="department" id="department" placeholder={isLanguageEnglish ? addWord.eng.department_placeholder : addWord.cn.department_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="lesson">{isLanguageEnglish ? addWord.eng.lesson_input : addWord.cn.lesson_input}</label>
            <input type="text" onChange={handleChange} name="lesson" id="lesson" placeholder={isLanguageEnglish ? addWord.eng.lesson_placeholder : addWord.cn.lesson_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="cn">{isLanguageEnglish ? addWord.eng.cn_input : addWord.cn.cn_input}</label>
            <input ref={cnRef} type="text" onChange={handleChange} name="cn" id="cn" placeholder={isLanguageEnglish ? addWord.eng.cn_placeholder : addWord.cn.cn_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="eng">{isLanguageEnglish ? addWord.eng.eng_input : addWord.cn.eng_input}</label>
            <input ref={engRef} type="text" onChange={handleChange} name="eng" id="eng" placeholder={isLanguageEnglish ? addWord.eng.eng_placeholder : addWord.cn.eng_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="example">{isLanguageEnglish ? addWord.eng.example_input : addWord.cn.example_input}</label>
            <input  ref={exRef} type="text" onChange={handleChange} name="example" id="example" placeholder={isLanguageEnglish ? addWord.eng.example_placeholder : addWord.cn.example_placeholder} required />
          </p>
          <button type="submit" className="add-word__button">{isLanguageEnglish ? addWord.eng.button : addWord.cn.button}</button>
        </form>
      </div>
    </div>
  )
}

export default AddWords