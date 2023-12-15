import './index.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { data } from './vendor/constants';
import Lesson from './components/Lesson';
import Section from './components/Section';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import AddWords from './components/AddWords';
import MainApi from './utils/MainApi';
import ProtectedRouteElement from './components/ProtectedRoute';
import Profile from './components/Profile';

function App() {

  const navigate = useNavigate()
  const deps = data.departments
  const lessons = data.lessons
  const [revers, setRevers] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLocalStotageChecked, setIsLocalStotageChecked] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  
  const checkIsLoggedIn = () => {
    const loginCheck = localStorage.getItem('isLoggedIn')
    if (loginCheck) {
      setIsLoggedIn(true)
    } 
    setIsLocalStotageChecked(true)
  }

  useEffect(() => {
    checkIsLoggedIn()
  }, [])
  
  const handleLogin = async (values) => {
    const { name, password } = values

    // DELETE CODE BELOW
    // setIsLoggedIn(true)
    // localStorage.setItem('isLoggedIn', true)
    // setCurrentUser(name)
    // navigate('/', {replace: true})


    try {
      await MainApi.login(name, password)
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', true)
      setCurrentUser(name)
      navigate('/', {replace: true})
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegister = async (values) => {
    const { name, department, password, confirmation} = values

     // DELETE CODE BELOW
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', true)
    setCurrentUser(name)


    try {
      await MainApi.register(name, department, password, confirmation)
      setIsLoggedIn(true)
      setCurrentUser(name)
      localStorage.setItem('isLoggedIn', true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddWord = async (values) => {
    console.log('add test', values)
    const { department, lesson, cn, eng, example } = values
    try {
      await MainApi.addData(department, lesson, cn, eng, example)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  return (
    <div className='page'>
      {isLocalStotageChecked && (
        <>
        
    <Header 
     isClickedStatus={revers} 
     isClicked={setRevers}
     isLoggedIn={isLoggedIn}
    />
   <Routes>

     {/* Main page protected route */}
     <Route path='/' element={
       <ProtectedRouteElement 
         element={Section}
         isLoggedIn={isLoggedIn}
         data={deps}
       />
     }/>

     {/* Add word protected route */}
     <Route path='/add' element={
       <ProtectedRouteElement 
         element={AddWords}
         isLoggedIn={isLoggedIn}
         onSubmit={handleAddWord}
       />
     }/>   

     {/* Profile protected route */}
     <Route path='/profile' element={
       <ProtectedRouteElement 
         element={Profile}
         currentUser={currentUser}
         isLoggedIn={isLoggedIn}
         handleLogOut={handleLogOut}
       />
     }/>     

     {/* FO protected route */}
     <Route path='/fo' element={
       <ProtectedRouteElement 
         element={Section}
         isLoggedIn={isLoggedIn}
         data={lessons}
         title='FO'
       />
     }/>

     {/* FNB protected route */}
     <Route path='/fnb' element={
       <ProtectedRouteElement 
         element={Section}
         isLoggedIn={isLoggedIn}
         data={lessons}
         title='FNB'
       />
     }/>

     {/* Lesson protected route */}
     <Route path='/lesson' element={
       <ProtectedRouteElement 
         element={Lesson}
         isLoggedIn={isLoggedIn}
         data={lessons}
         isReversed={revers}
       />
     }/>

     <Route path='/signin' element={<Login onSubmit={handleLogin}/>} />
     <Route path='/signup' element={<Register onSubmit={handleRegister}/>} />
   </Routes>
   </>
      )}
 
    </div>
  );
}

export default App;
