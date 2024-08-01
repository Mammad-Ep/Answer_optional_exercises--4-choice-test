import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./css/main-style.css";
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import store from './apps/store';
import Error404 from './components/Error404';
import AboutUs from './components/AboutUs';
import PhotoGallery from './components/PhotoGallery';
import PhotoDetails from './components/PhotoDetails';
import ReactQuiz from './components/ReactQuiz';
import { examiner } from './dataTypes/types/quizReact';
import ReactQuizQuestions from './components/ReactQuizQuestions';
import useLocalStorage from './components/hooks/useLocalState';
import ReactQuizResult from './components/ReactQuizResult';
// ___________________________________________________________

// const eaxaminerState = {
//   info: {
//     name: '',
//     family: '',
//     phone_number: '',
//     exam_score: 0,
//   },

//   pageNumber: 0,
//   questionsResult: {

//   }

// }

function App() {
  const [examiner, setExaminer] = useLocalStorage('examiner', {})

  return (
    <>
      <header>
        <div>
          <h2 className='main-title'>پاسخ سوالات تمرینات اختیاری - استادی فرانت اند2</h2>
        </div>
        <Navbar />
      </header>
      <main role='main'>

      </main>
      <footer>

      </footer>

      <Routes>
        <Route path='/' element={<Provider store={store}><Home /></Provider>}></Route>
        <Route path='/cart/' element={<Provider store={store}><Cart /></Provider>}></Route>
        <Route path='/error404/' element={<Error404 />}></Route>
        <Route path='/*' element={<Navigate to={'/error404/'} />}></Route>
        <Route path='/about-us/' element={<AboutUs test={10} test2="reza" />}></Route>

        <Route path='/photo-gallery/' element={<PhotoGallery />}></Route>
        <Route path='photo-gallery/photo/:id/' element={<PhotoDetails />}></Route>

        <Route path='/ReactQuiz/' element={<Provider store={store}><ReactQuiz examiner={examiner} changeExaminer={setExaminer} /></Provider>}></Route>
        <Route path='/ReactQuiz-questions/' element={<Provider store={store}><ReactQuizQuestions examiner={examiner} changeExaminer={setExaminer} /></Provider>}></Route>
        <Route path='/ReactQuiz-result/' element={<Provider store={store}><ReactQuizResult examiner={examiner}/></Provider>}></Route>
      </Routes>
    </>
  );
}

export default App;
