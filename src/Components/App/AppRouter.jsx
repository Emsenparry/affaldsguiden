import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import Bestilling from '../Pages/Bestilling/Bestilling'
import SorteringList from '../Pages/Sortering/SorteringList/SorteringList'
import BestilType from '../Pages/Bestilling/BestilType/BestilType'
import StationerDetails from '../Pages/Stationer/StationerDetails/StationerDetails'
import StationerListe from '../Pages/Stationer/StationerListe/StationerListe'
import Categories from '../Pages/Sortering/SorteringDetails/Categories/Categories'

// Definition af hovedkomponenten, der håndterer routing
const AppRouter = () => {
  return (
    <Routes>
        {/* Front page rute */}
        <Route index element={<Home />} />

        {/* Rute for sortering med underordnede ruter */}
        <Route path='/sortering'>
          {/* Startside for sortering */}
          <Route index element={<SorteringList />} /> 
          {/* Visning af kategorier */}
          <Route path=':section_id' element={<Categories />}/> 
        </Route>

        {/* Rute for stationer med underordnede ruter */}
        <Route path='/stationer'>
          {/* Startside for stationer */}
        <Route index element={<StationerListe />} /> 
        {/* Visning af stationer detaljer */}
        <Route path=":station_id" element={<StationerDetails />} /> 
        </Route>

        {/* Rute for bestilling med underordnede ruter */}
        <Route path='/bestil'>
          {/* Startside for bestillingstype */}
          <Route index element={<BestilType />} /> 
           {/* Visning af bestilling */}
          <Route path=':container_id' element={<Bestilling/>}/>
        </Route>

        {/* Rute for login */}
        <Route path="/login" element={<Login />} />

        {/* Catch-all rute for at håndtere ukendte stier */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
