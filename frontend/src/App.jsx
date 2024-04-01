import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Header from './components/Header'
import Volunteer_one from '../Volunteer/Volunteer_one'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/volunteerOne" element={<Volunteer_one/>}/>
      </Routes>
    </BrowserRouter>
  )
}

