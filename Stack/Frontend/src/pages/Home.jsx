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
        <h1 className='text-3xl my-8 font-bold'>Rooms</h1>
        <Link to='/rooms/create' className='flex items-center px-4 py-2 rounded-md bg-blue-500 text-white'>
          <MdOutlineAddBox className='text-sky-800 text-4x1' /> Create Room
        </Link>
      </div>
      {loading ? (<Spinner />) : 
      (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Number</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Size</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {room.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {room.author}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {room.size}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/rooms/details/${room._id}`}>
                      <BsInfoCircle className='text-green-800 text-2xl' />                      
                    </Link>
                    <Link to={`/rooms/edit/${room._id}`}>
                      <AiOutlineEdit className='text-yellow-600 text-2xl' />                      
                    </Link>
                    <Link to={`/rooms/delete/${room._id}`}>
                      <MdOutlineDelete className='text-red-600 text-2xl' />
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

export default Home