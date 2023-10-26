import './index.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { data } from './vendor/constants';
import Lesson from './components/Lesson';
import Section from './components/Section';
import Header from './components/Header';


function App() {

  const deps = data.departments
  const lessons = data.lessons
  const [revers, setRevers] = useState(false)
  
  return (
    <div className='page'>
      <Header isClickedStatus={revers} isClicked={setRevers}/>
      <Routes>
        <Route path='/' element={<Section data={deps}/>} />
        <Route path='/fo' element={<Section data={lessons} title='FO'/>} />
        <Route path='/fnb' element={<Section data={lessons} title='FNB'/>} />
        <Route path='/lesson' element={<Lesson data={lessons} isReversed={revers}/>} />
      </Routes>
    </div>
  );
}

export default App;
