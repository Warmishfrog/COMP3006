import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner.jsx';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import { set } from 'mongoose';

const BookRoom = () => {
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
      <BackButton />
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-bold'>Choose a Room</h1>        
      </div>
      {loading ? (<Spinner />) : 
      (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Price (£)</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Capacity</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
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
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/rooms/${room._id}`} className='flex items-center px-4 py-2 rounded-md bg-blue-500 text-white'>
                      <MdOutlineAddBox className='text-sky-800 text-4x1' /> Choose Room
                    </Link>
                  </div>
                </td>
              </tr>
              ))}
          </tbody>

        </table>
      )}
    </div>
    
  )
}

export default BookRoom