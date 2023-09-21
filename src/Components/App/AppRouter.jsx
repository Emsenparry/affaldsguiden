import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import Bestilling from '../Pages/Bestilling/Bestilling'
import SorteringList from '../Pages/Sortering/SorteringList/SorteringList'
import SorteringDetails from '../Pages/Sortering/SorteringDetails/SorteringDetails'
import BestilType from '../Pages/Bestilling/BestilType/BestilType'
import StationerDetails from '../Pages/Stationer/StationerDetails/StationerDetails'
import StationerListe from '../Pages/Stationer/StationerListe/StationerListe'

const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<Home />} />

        <Route path='/sortering'>
          <Route index element={<SorteringList />} />
          <Route path=':section_id' element={<SorteringDetails />}/>
        </Route>

        <Route path='/stationer'>
        <Route index element={<StationerListe />} />
        <Route path=":station_id" element={<StationerDetails />} />
        </Route>

        
       <Route path='/bestil'>
          <Route index element={<BestilType />} />
          <Route path=':container_id' element={<Bestilling/>}/>
        </Route>

        <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter