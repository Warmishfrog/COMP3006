import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import { set } from 'mongoose';

const EditRooms = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/rooms/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setSize(response.data.size);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })

  }, []);
  const handleEditBook = () => {
    const data = {
      title,
      author,
      size    
    };
  setLoading(true);
  axios.put(`http://localhost:5555/rooms/${id}`, data)
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
      <h1 className='text-3xl font-bold my-8'>Edit Room</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditRooms;
