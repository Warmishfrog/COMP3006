import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ShowRooms from './pages/ShowRooms.jsx'
import EditRooms from './pages/EditRooms.jsx'
import Home from './pages/Home.jsx'
import CreateRooms from './pages/CreateRooms.jsx'
import DeleteRooms from './pages/DeleteRooms.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/rooms/create' element={<CreateRooms/>} />
      <Route path='/rooms/details/:id' element={<ShowRooms/>} />
      <Route path='/rooms/edit/:id' element={<EditRooms/>} />
      <Route path='/rooms/delete/:id' element={<DeleteRooms/>} />
    </Routes>
  )
}

export default App
