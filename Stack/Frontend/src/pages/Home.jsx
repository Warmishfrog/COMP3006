import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import { set } from 'mongoose';

const Home = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
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


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-bold'>Home</h1>        
      </div>
      
      <Link to={`/`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Logout
        </button>
      </Link>
      <Link to={`/account/edit`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Edit Account
        </button>
      </Link>
      <Link to={`/rooms/book`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Book Room
        </button>
      </Link>
      <Link to={`/rooms/book/amend`}>
        <button className='p-2 bg-sky-300 flex-1 mr-2'>
          Amend Booking
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