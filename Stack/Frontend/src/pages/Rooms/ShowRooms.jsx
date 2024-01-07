import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowRooms = () => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/rooms/${id}`)
      .then(response => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }, []);
  return (
    <div className='p-4'>
      <BackButton destination='/rooms/manage' />
      <h1 className='text-3x1 my-4'>Show Room</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Id</span>
            <span>{room._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Name</span>
            <span>{room.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Price (£)</span>
            <span>{room.price}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Capacity</span>
            <span>{room.capacity}</span>
          </div>
        </div>
        )}

      </div>
  )
}

export default ShowRooms;