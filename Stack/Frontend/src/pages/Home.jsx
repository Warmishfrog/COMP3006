import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { set } from 'mongoose';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';

const Home = () => {
  const [account, setAccount] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState([])
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem('user');
  const accountId = JSON.parse(loggedInUser)._id;

    useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:5555/accounts/id/${accountId}`)
        .then(response => {
          setAccount(response.data);
          setLoading(false);
        })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/bookings/UserID/${accountId}`)
      .then(response => {
        setBookings(response.data);
        //console.log(bookings);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })

  }, []);

  const handleAmendBooking = (booking) => {
    localStorage.setItem('booking', JSON.stringify(booking));
    navigate(`/rooms/book/amend/`);
  }

  const handleLogout = () => {
    localStorage.removeItem('user'); //delete user from local storage
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-bold'>Home</h1>
      </div>
      <div>
        <p>Logged in as: {account.username}</p>
      </div>

      <div>
        <h2 className='text-2xl my-4 font-bold'>Your Bookings</h2>
        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md'>RoomID</th>
                <th className='border border-slate-600 rounded-md'>Number of Guests</th>
                <th className='border border-slate-600 rounded-md'>Check-In Date</th>
                <th className='border border-slate-600 rounded-md'>Number of Nights</th>
                <th className='border border-slate-600 rounded-md'>Amend Booking</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {booking.RoomID}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {booking.NumGuests}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {new Date(booking.CheckInDate).toLocaleDateString()}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {booking.NumNights}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <button className='flex items-center px-4 py-2 rounded-md bg-blue-500 text-white' onClick={() => handleAmendBooking(booking)}>
                      <p className='text-sky-800 text-4x1 text-white'>&rarr;</p>
                    </button>
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link to={`/`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2' onClick={handleLogout}>
          Logout
        </button>
      </Link>
      <Link to={{ pathname: `/account/edit/${accountId}`}}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Edit Account
        </button>
      </Link>
      <Link to={`/rooms/book`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Book Room
        </button>
      </Link>
      <Link to={`/rooms/manage`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Manage Rooms
        </button>
      </Link>
      
    </div>
    
  )
}

export default Home