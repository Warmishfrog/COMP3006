import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton.jsx';
import Spinner from '../../components/Spinner.jsx';
import { Link, useNavigate } from 'react-router-dom';

const BookRoomDetails = () => {
  
  const currentDate = new Date().toISOString().split('T')[0];
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [NumGuests, setNumGuests] = useState('');
  const [CheckInDate, setCheckInDate] = useState(currentDate);
  const [NumNights, setNumNights] = useState('');
  const navigate = useNavigate();
  
  

  const chosenRoom = JSON.parse(localStorage.getItem('room'));
  const RoomID = chosenRoom._id;  
  const UserID = JSON.parse(localStorage.getItem('user'))._id;

  const handleSaveBooking = () => {
    console.log("go to save ") 

    const data = {
      UserID,
      RoomID,
      NumGuests,
      CheckInDate,
      NumNights,
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
                {chosenRoom && (
                  <tr className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>
                      {chosenRoom.name}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                      {chosenRoom.price}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                      {chosenRoom.capacity}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Number of Guests</label>
            <input
              type='number'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={NumGuests}
              onChange={e => setNumGuests(e.target.value)}
              placeholder='Enter the number of guests'
            />
          </div>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Check-in Date</label>
            <input
              type='date'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={CheckInDate || currentDate}
              onChange={e => setCheckInDate(e.target.value)}
              placeholder='Select check-in date'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Number of Nights</label>
            <input
              type='number'
              className='border-2 border-gray-500 px-4 py-2 w-full'
              value={NumNights}
              onChange={e => setNumNights(e.target.value)}
              placeholder='Enter the number of nights'
            />
          </div>
          <div className='flex justify-between'>
              <button className='p-2 bg-sky-300 flex-1 mr-2 text-center' onClick={handleSaveBooking}>
                Confirm Booking
              </button>
          </div>
        </div>
      </div>

    )
  }

  export default BookRoomDetails;