import './index.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Lesson from './components/Lesson';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import AddWords from './components/AddWords';
import MainApi from './utils/MainApi';
import ProtectedRouteElement from './components/ProtectedRoute';
import Profile from './components/Profile';
import Departments from './components/Departments';
import Lessons from './components/Lessons';
import IsAdminContext from './contexts/isAdminContext';
import { ADD_WORD_PAGE, ADMIN_ID, LESSONPAGE, LESSONSPAGE, MAINPAGE, PROFILE_PAGE, SING_IN_PAGE, SING_UP_PAGE } from './utils/constants';

function App() {
  const navigate = useNavigate();
  const [reverse, setReverse] = useState(false); //helps to reverse word translation, reverse button attached at Header
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isLocalStotageChecked, setIsLocalStotageChecked] = useState(false); 
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserDepartment, setCurrentUserDepartment] = useState();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [data, setData] = useState();
  const [isContentUpdated, setIsContentUpdated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
  const [formData, setFormData] = useState();


  // getting current user & current data from BD and control if data changed
  useEffect(() => {
    MainApi.getContent()
    .then((res) => {
      setData(res.data);
      setIsContentUpdated(true);
  })
    MainApi.getUser()
    .then((user) => {
      setCurrentUser(user.data.name);
      setCurrentUserDepartment(user.data.department)
      if (user.data._id === ADMIN_ID) {
        setIsAdmin(true);
      }
    })
    setIsDataChanged(false);
  },[isDataChanged]);

  // check if user has already checked in
  useEffect(() => {
    checkIsLoggedIn();
  }, [])

  // CHANGING LANGUAGE FUNCTION (ADDLESSON, SIGNIN, SIGNUP)
  const handleLanguage = () => {
    setIsLanguageEnglish(!isLanguageEnglish);
  }

  // COLLECTING INPUTS DATA
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData)
  };

  // check if user has already checked in
  const checkIsLoggedIn = () => {
    const loginCheck = localStorage.getItem('isLoggedIn');
    if (loginCheck) {
      setIsLoggedIn(true);
    } 
    setIsLocalStotageChecked(true);
  };

  //handle LOGIN 
  const handleLogin = async () => {
    const { name, password } = formData;
    try {
      await MainApi.login(name, password)
      .then((user) => {
        setCurrentUser(user.data.name);
        setCurrentUserDepartment(user.data.department);
        if (user.data._id === ADMIN_ID) {
          setIsAdmin(true);
        }
      })
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      setFormData();
      navigate(MAINPAGE, {replace: true});
    } catch (err) {
        console.log(err);
    };
  };

  // handle SIGNUP
  const handleRegister = async () => {
    const { name, department, password, confirmation} = formData;
    try {
      await MainApi.register(name, department, password, confirmation)
        .then((user) => {
          setCurrentUser(user.data.name);
          setCurrentUserDepartment(user.data.department);
        })
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      setFormData();
      navigate(MAINPAGE, {replace: true});
    } catch (err) {
        console.log(err);
    };
  };

  // handle ADDWORD
  const handleAddWord = async () => {
    const { department, lessonName, cn, eng, example } = formData;
    try {
      await MainApi.addData(department, lessonName, cn, eng, example)
        .then(() => {
          setFormData();
        })
    } catch (err) {
        console.log(err);
    };
  };

  // handle Delete word
  const handleDeleteWord = (departmentId, lessonId, wordId) => {
    MainApi.deleteWord(departmentId, lessonId, wordId)
      .then(() => {
        setIsDataChanged(true);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  // handle delete department
  const handleDeleteDepartment = (departmentId) => {
    MainApi.deleteDepartment(departmentId)
      .then(() => {
        setIsDataChanged(true);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  // handle delete lesson
  const handleDeleteLesson = (currentDepartmentId, lessonId) => {
    MainApi.deleteLesson(currentDepartmentId, lessonId)
      .then(() => {
        setIsDataChanged(true);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  // handle update department
  const handleUpdateDepartment = (currentDepartmentId) => {
    MainApi.changeDepartment(currentDepartmentId, formData)
      .then(() => {
        setIsDataChanged(true);
        setFormData();
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  // handle update lesson
  const handleUpdateLesson = (currentDepartmentId, lessonId) => {
    MainApi.changeLesson(currentDepartmentId, lessonId, formData)
      .then(() => {
        setIsDataChanged(true);
        setFormData();
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }
 
  // handle update word
  const handleUpdateWord = (currentDepartmentId, lessonId, wordId) => {
    MainApi.changeWord(currentDepartmentId, lessonId, wordId, formData)
      .then(() => {
        setIsDataChanged(true);
        setFormData();
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }

  // handle logout
  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div className='page'>
      {isLocalStotageChecked && isContentUpdated && (
        <>
          <IsAdminContext.Provider value={isAdmin}>
            <Header 
              reverseStatus = {reverse} 
              handleReverseStatus = {setReverse}
              isLoggedIn = {isLoggedIn}
            />
            <Routes>
              {/* Main page protected route */}
              <Route path={MAINPAGE} element={
                <ProtectedRouteElement 
                  element = {Departments}
                  isLoggedIn = {isLoggedIn}
                  departments = {data}
                  handleDeleteDepartment = {handleDeleteDepartment}
                  handleUpdateDepartment = {handleUpdateDepartment}
                  onChange = {handleChange}
                />
              }/>
              {/* Main page protected route */}
              <Route path={LESSONSPAGE} element={
                <ProtectedRouteElement 
                  element = {Lessons}
                  isLoggedIn = {isLoggedIn}
                  handleDeleteLesson = {handleDeleteLesson}
                  handleUpdateLesson = {handleUpdateLesson}
                  data = {data}
                  onChange = {handleChange}
                />
              }/>
              {/* Add word protected route */}
              <Route path={ADD_WORD_PAGE} element={
                <ProtectedRouteElement 
                  element = {AddWords}
                  isLoggedIn = {isLoggedIn}
                  onSubmit = {handleAddWord}
                  handleLanguage = {handleLanguage}
                  isLanguageEnglish = {isLanguageEnglish}
                  formData = {formData}
                  onChange = {handleChange}
                />
              }/>   
              {/* Profile protected route */}
              <Route path={PROFILE_PAGE} element={
                <ProtectedRouteElement 
                  element = {Profile}
                  currentUser = {currentUser}
                  currentUserDepartment = {currentUserDepartment}
                  isLoggedIn = {isLoggedIn}
                  handleLogOut = {handleLogOut}
                />
              }/>     
              {/* Lesson protected route */}
              <Route path={LESSONPAGE} element={
                <ProtectedRouteElement 
                  element = {Lesson}
                  handleDeleteWord = {handleDeleteWord}
                  handleUpdateWord = {handleUpdateWord}
                  isLoggedIn = {isLoggedIn}
                  isReversed = {reverse}
                  data = {data}
                  onChange = {handleChange}
                />
              }/>
              <Route path={SING_IN_PAGE} element={
                <Login 
                  onSubmit = {handleLogin}
                  onChange = {handleChange}
                  handleLanguage = {handleLanguage}
                  isLanguageEnglish = {isLanguageEnglish}
                />
              }/>
              <Route path={SING_UP_PAGE} element={
                <Register 
                  onSubmit = {handleRegister} 
                  onChange = {handleChange}
                  handleLanguage = {handleLanguage}
                  isLanguageEnglish = {isLanguageEnglish}
                />
              }/>
            </Routes>
          </IsAdminContext.Provider>
        </>
      )}
    </div>
  );
}

export default App;
