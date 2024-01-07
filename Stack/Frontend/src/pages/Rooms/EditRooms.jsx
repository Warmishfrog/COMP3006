import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRooms = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/rooms/${id}`)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
        setCapacity(response.data.capacity);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleEditRoom = () => {
    const data = {
      name,
      price,
      capacity,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/rooms/${id}`, data)
      .then((response) => {
        setLoading(false);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
        alert('Error occurred. Check Console');
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/rooms/manage'/>
      <h1 className='text-3xl font-bold my-8'>Edit Room</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price (£)</label>
          <input
            type='text'
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Capacity</label>
          <input
            type='text'
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditRoom}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditRooms;
