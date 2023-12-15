import { useEffect, useState } from "react"
import { login } from "../utils/languages";
import { useAsyncError } from "react-router-dom";

function Login ( {onSubmit} ) {

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
        <p className="auth__title">{isLanguageEnglish ? login.eng.title : login.cn.title}</p>
        <form action="" method="post" className="auth__form" >
          <p className="auth__form__input-block">
            <label>{isLanguageEnglish ? login.eng.login_input : login.cn.login_input}</label>
            <input className="auth__form_input" onChange={handleChange} type="text" name="name" id="login" placeholder={isLanguageEnglish ? login.eng.login_placeholder : login.cn.login_placeholder} required />
          </p>
          <p className="auth__form__input-block">
            <label>{isLanguageEnglish ? login.eng.password_input : login.cn.password_input}</label>
            <input className="auth__form_input" onChange={handleChange} type="password" name="password" id="password" placeholder={isLanguageEnglish ? login.eng.password_placeholder : login.cn.password_placeholder} required />
          </p>
          <button type="submit" className="auth__button" onClick={handleSubmit}>{isLanguageEnglish ? login.eng.button : login.cn.button}</button>
        </form>
      </div>
    </div>
  )
}

export default Login