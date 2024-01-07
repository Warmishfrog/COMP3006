import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ShowRooms from './pages/Rooms/ShowRooms.jsx'
import EditRooms from './pages/Rooms/EditRooms.jsx'
import ManageRooms from './pages/Rooms/ManageRooms.jsx'
import CreateRooms from './pages/Rooms/CreateRooms.jsx'
import DeleteRooms from './pages/Rooms/DeleteRooms.jsx'
import Login from './pages/Login.jsx'
import CreateAccount from './pages/Accounts/CreateAccount.jsx'
import EditAccount from './pages/Accounts/EditAccount.jsx'
import DeleteAccount from './pages/Accounts/DeleteAccount.jsx'
import BookRooms from './pages/Bookings/BookRoom.jsx'
import BookRoomsDetails from './pages/Bookings/CreateBookings.jsx'
import AmendBooking from './pages/Bookings/EditBookings.jsx'
import DeleteBookings from './pages/Bookings/DeleteBookings.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home/' element={<Home />} />
      <Route path='/account/create/' element={<CreateAccount />} />
      <Route path='/account/edit/:id' element={<EditAccount />} />
      <Route path='/account/delete/:id' element={<DeleteAccount />} />
      <Route path='/rooms/manage/' element={<ManageRooms />} />
      <Route path='/rooms/book/' element={<BookRooms/>} />
      <Route path='/rooms/book/amend' element={<AmendBooking/>} />
      <Route path='/rooms/book/details' element={<BookRoomsDetails/>} />
      <Route path='/rooms/book/delete/:id' element={<DeleteBookings/>} />
      <Route path='/rooms/create' element={<CreateRooms/>} />
      <Route path='/rooms/details/:id' element={<ShowRooms/>} />
      <Route path='/rooms/edit/:id' element={<EditRooms/>} />
      <Route path='/rooms/delete/:id' element={<DeleteRooms/>} />
    </Routes>
  )
}

export default App
