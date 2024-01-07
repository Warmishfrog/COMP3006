import React, {useState, useEffect} from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { set } from 'mongoose';

const AmendBooking = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = useState(false)
    const [NumGuests, setNumGuests] = useState('');
    const [CheckInDate, setCheckInDate] = useState('');
    const [NumNights, setNumNights] = useState('');
    const navigate = useNavigate();
    
    
  
    const chosenBooking = JSON.parse(localStorage.getItem('booking'));
    const bookingID = chosenBooking._id;  
    const RoomID = chosenBooking.RoomID;
    const UserID = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:5555/bookings/id/${bookingID}`)
        .then(response => {
          setNumGuests(response.data.NumGuests);
          setCheckInDate(response.data.CheckInDate.split('T')[0]);
          setNumNights(response.data.NumNights);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        })

    }, []);
  
    const handleEditBooking = () => {  
      
      const data = {
        UserID,
        RoomID,
        NumGuests: parseInt(NumGuests),
        CheckInDate,
        NumNights: parseInt(NumNights),
      };
      console.log(data);
      setLoading(true);
      axios.put(`http://localhost:5555/bookings/${bookingID}`, data)
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
          <BackButton destination="/home" />
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8 font-bold'>Update Stay Details</h1>
          </div>
          
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Room ID</label>
              <p>{chosenBooking.RoomID}</p>
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Number of Guests</label>
              <input
                type='number'
                className='border-2 border-gray-500 px-4 py-2 w-full'
                value={NumGuests}
                onChange={e => setNumGuests(e.target.value)}
                placeholder={chosenBooking.NumGuests}
              />
            </div>
  
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Check-in Date</label>
              <input
                type='date'
                className='border-2 border-gray-500 px-4 py-2 w-full'
                value={CheckInDate}
                onChange={e => setCheckInDate(e.target.value)}
                placeholder={chosenBooking.CheckInDate}
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Number of Nights</label>
              <input
                type='number'
                className='border-2 border-gray-500 px-4 py-2 w-full'
                value={NumNights}
                onChange={e => setNumNights(e.target.value)}
                placeholder={chosenBooking.NumNights}
              />
            </div>
            <div className='flex justify-between'>
              <button className='p-2 bg-sky-300 flex-1 mr-2 text-center' onClick={handleEditBooking}>
                Update Booking
              </button>
              <Link to={`/rooms/book/delete/${bookingID}`} className='p-2 flex-1 ml-2 bg-red-600 text-white text-center'>
                <button >
                  Cancel Booking
                </button>
              </Link>
            </div>
          </div>
        </div>
  
      )
    }

export default AmendBooking