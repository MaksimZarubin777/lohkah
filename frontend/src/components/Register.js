import { useState } from "react"
import { register } from "../utils/languages";

function Register ( {onSubmit} ) {

  const [formData, setFormData] = useState()
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

const handleSubmit = (evt) => {
  evt.preventDefault()
  onSubmit(formData)
} 

const handleChangeLanguageEng = () => {
  setIsLanguageEnglish(true)
}

const handleChangeLanguageCn = () => {
  setIsLanguageEnglish(false)
}

  return (
    <div className="auth">
      <div className="auth__container">
      <div className="language">
        <p className={isLanguageEnglish ? 'language__active' : ''} onClick={handleChangeLanguageEng}>EN</p>
        <p className={!isLanguageEnglish ? 'language__active' : ''} onClick={handleChangeLanguageCn}>中</p>
      </div>
        <p className="auth__title">{isLanguageEnglish ? register.eng.title : register.cn.title}</p>
        <form action="" method="post" className="auth__form" onSubmit={handleSubmit}>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? register.eng.login_input : register.cn.login_input}</label>
            <input className="auth__form_input" onChange={handleChange} type="text" name="name" id="login" placeholder={isLanguageEnglish ? register.eng.login_placeholder : register.cn.login_placeholder} required />
          </p>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? register.eng.department_input : register.cn.department_input}</label>
            <input className="auth__form_input" onChange={handleChange} type="text" name="department" id="department" placeholder={isLanguageEnglish ? register.eng.department_placeholder : register.cn.department_placeholder} required />
          </p>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? register.eng.password_input : register.cn.password_input}</label>
            <input className="auth__form_input" onChange={handleChange} type="password" name="password" id="password" placeholder={isLanguageEnglish ? register.eng.password_placeholder : register.cn.password_placeholder} required />
          </p>
          <p className="auth__form__input-block">
            <label for="name">{isLanguageEnglish ? register.eng.confirmation_input : register.cn.confirmation_input}</label>
            <input className="auth__form_input" onChange={handleChange} type="password" name="confirmation" id="password" placeholder={isLanguageEnglish ? register.eng.confirmation_placeholder : register.cn.confirmation_placeholder} required />
          </p>
          <button type="submit" className="auth__button">{isLanguageEnglish ? register.eng.button : register.cn.button}</button>
        </form>
      </div>
    </div>
  )
}

export default Register