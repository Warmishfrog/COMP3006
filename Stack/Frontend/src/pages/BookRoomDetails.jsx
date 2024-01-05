import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { set } from 'mongoose';

const BookRoomDetails = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [numGuests, setNumGuests] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/rooms')
      .then(response => {
        setRooms(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })

  }, []);
  const handleSaveBooking = () => {
    console.log("go to save ")
    const data = {
      userID,
      roomID,
      numGuests,
      checkInDate,
      checkOutDate,
    };
    console.log(data);
    setLoading(true);
    axios.post('http://localhost:5555/bookings', data)
      .then(response => {
        setLoading(false);
        navigate('/home');
      })
      .catch(error => {
        console.log(error);
        alert('Error occurred. Check Console');
        setLoading(false);
      })
  }


    return (
      <div className='p-4'>
        <BackButton destination="/rooms/book/" />
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8 font-bold'>Enter Stay Details</h1>
        </div>
        {loading ? (<Spinner />) :
          (
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-slate-600 rounded-md'>Name</th>
                  <th className='border border-slate-600 rounded-md max-md:hidden'>Price (£)</th>
                  <th className='border border-slate-600 rounded-md max-md:hidden'>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr key={room._id} className='h-8'>

                    <td className='border border-slate-700 rounded-md text-center'>
                      {room.name}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                      {room.price}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                      {room.capacity}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Number of Guests</label>
            <input
              type='number'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={numGuests}
              onChange={e => setNumGuests(e.target.value)}
              placeholder='Enter the number of guests'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Check-in Date</label>
            <input
              type='date'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={checkInDate}
              onChange={e => setCheckInDate(e.target.value)}
              placeholder='Select check-in date'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Check-out Date</label>
            <input
              type='date'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={checkOutDate}
              onChange={e => setCheckOutDate(e.target.value)}
              placeholder='Select check-out date'
            />
          </div>
          <div className='flex justify-between'>
            <Link to={`/`} className='p-2 bg-sky-300 flex-1 mr-2 text-center'>
              <button onClick={handleSaveBooking}>
                Confirm Booking
              </button>
            </Link>
          </div>
        </div>
      </div>

    )
  }

  export default BookRoomDetails;