import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import Sortering from '../Pages/Sortering/Sortering'
import Genbrugsstationer from '../Pages/Genbrugsstationer/Genbrugsstationer'
import Bestilling from '../Pages/Bestilling/Bestilling'

const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/sortering" element={<Sortering />}/>
        <Route path="/genbrugsstationer" element={<Genbrugsstationer />}/>
        <Route path="/bestil" element={<Bestilling />}/>
        <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter