import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import Genbrugsstationer from '../Pages/Genbrugsstationer/Genbrugsstationer'
import Bestilling from '../Pages/Bestilling/Bestilling'
import SorteringList from '../Pages/Sortering/SorteringList/SorteringList'
import SorteringDetails from '../Pages/Sortering/SorteringDetails/SorteringDetails'

const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<Home />} />

        <Route path='/sortering'>
          <Route index element={<SorteringList />} />
          <Route path=':section_id' element={<SorteringDetails />}/>
        </Route>


        <Route path="/genbrugsstationer" element={<Genbrugsstationer />}/>
        <Route path="/bestil" element={<Bestilling />}/>
        <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter