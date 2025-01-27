import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import LoginComponent from './routes/Login'
import SignupComponent from './routes/Signup'
import HomeComponent from './routes/Home'
function App() {
  return (
    <>
      
      <div className='w-screen h-screen'>
        <BrowserRouter>
          <Routes>
            <>
              <Route path="/" element={<h1>hi</h1>} />
              <Route path="/login" element={<LoginComponent/>} />
              <Route path="/signup" element={<SignupComponent/>} />
              <Route path="/home" element={<HomeComponent/>} />
            </>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
