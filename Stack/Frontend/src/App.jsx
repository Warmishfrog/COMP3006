import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ShowRooms from './pages/ShowRooms.jsx'
import EditRooms from './pages/EditRooms.jsx'
import Home from './pages/Home.jsx'
import CreateRooms from './pages/CreateRooms.jsx'
import DeleteRooms from './pages/DeleteRooms.jsx'
import Login from './pages/Login.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import EditAccount from './pages/EditAccount.jsx'
import BookRooms from './pages/BookRoom.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/account/create' element={<CreateAccount />} />
      <Route path='/account/edit' element={<EditAccount />} />
      <Route path='/home' element={<Home />} />
      <Route path='/rooms/book' element={<BookRooms/>} />
      <Route path='/rooms/create' element={<CreateRooms/>} />
      <Route path='/rooms/details/:id' element={<ShowRooms/>} />
      <Route path='/rooms/edit/:id' element={<EditRooms/>} />
      <Route path='/rooms/delete/:id' element={<DeleteRooms/>} />
    </Routes>
  )
}

export default App
