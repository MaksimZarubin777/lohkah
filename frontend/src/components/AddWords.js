// checked

import { useRef } from "react";
import { addWord } from "../utils/languages";

function AddWords ({ onSubmit, handleLanguage, isLanguageEnglish, onChange }) {
  const cnRef = useRef();
  const engRef = useRef();
  const exRef = useRef();
  const ENG = addWord.eng;
  const CN = addWord.cn;

  const clearInputs = () => {
    cnRef.current.value = '';
    engRef.current.value = '';
    exRef.current.value = '';
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
    clearInputs();
  };

  return (
    <div className="add-word">
      <div className="add-word__container">
      <div className="language">
        <p className={isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>EN</p>
        <p className={!isLanguageEnglish ? 'language__active' : ''} onClick={handleLanguage}>中</p>
      </div>
        <p className="add-word__title">{isLanguageEnglish ? ENG.title : CN.title}</p>
        <form action="" method="post" className="add-word__form" onSubmit={handleSubmit} >
          <p className="add-word__form__input-block">
            <label for="department">{isLanguageEnglish ? ENG.department_input : CN.department_input}</label>
            <input type="text" onChange={onChange} name="department" id="department" placeholder={isLanguageEnglish ? ENG.department_placeholder : CN.department_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="lesson">{isLanguageEnglish ? ENG.lesson_input : CN.lesson_input}</label>
            <input type="text" onChange={onChange} name="lessonName" id="lesson" placeholder={isLanguageEnglish ? ENG.lesson_placeholder : CN.lesson_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="cn">{isLanguageEnglish ? ENG.cn_input : CN.cn_input}</label>
            <input ref={cnRef} type="text" onChange={onChange} name="cn" id="cn" placeholder={isLanguageEnglish ? ENG.cn_placeholder : CN.cn_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="eng">{isLanguageEnglish ? ENG.eng_input : CN.eng_input}</label>
            <input ref={engRef} type="text" onChange={onChange} name="eng" id="eng" placeholder={isLanguageEnglish ? ENG.eng_placeholder : CN.eng_placeholder} required />
          </p>
          <p className="add-word__form__input-block">
            <label for="example">{isLanguageEnglish ? ENG.example_input : CN.example_input}</label>
            <input  ref={exRef} type="text" onChange={onChange} name="example" id="example" placeholder={isLanguageEnglish ? ENG.example_placeholder : CN.example_placeholder} required />
          </p>
          <button type="submit" className="add-word__button">{isLanguageEnglish ? ENG.button : CN.button}</button>
        </form>
      </div>
    </div>
  )
}

export default AddWords;