import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { set } from 'mongoose';

const CreateRooms = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      size    
    };
  setLoading(true);
  axios.post('http://localhost:5555/rooms', data)
    .then(response => {
      setLoading(false);
      navigate('/');
    })
    .catch(error => {
      console.log(error);
      alert('Error occurred. Check Console');
      setLoading(false);
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl font-bold my-8'>Create Room</h1>
      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input type='text' className='border-2 border-gray-500 px-4 py-2 w-full' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Author</label>
        <input type='text' className='border-2 border-gray-500 px-4 py-2 w-full' value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>size</label>
        <input type='text' className='border-2 border-gray-500 px-4 py-2 w-full' value={size} onChange={e => setSize(e.target.value)} />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateRooms;