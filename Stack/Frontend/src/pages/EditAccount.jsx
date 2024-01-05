import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import { set } from 'mongoose';

const EditAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/accounts/${id}`)
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
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/accounts/${id}`)
      .then(response => {
        setTitle(response.data.username);
        setAuthor(response.data.password);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })

  }, []);
  const handleEditBook = () => {
    const data = {
      username,
      password
    };
  setLoading(true);
  axios.put(`http://localhost:5555/accounts/${id}`, data)
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
      <BackButton/>
      <h1 className='text-3xl font-bold my-8'>Edit Account</h1>
      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Username</label>
        <input type='text' className='border-2 border-gray-500 px-4 py-2 w-full' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Password</label>
        <input type='text' className='border-2 border-gray-500 px-4 py-2 w-full' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        
        <div className='flex justify-between mr-2 text-center '>
          <button className='p-2 bg-sky-300 flex-1 mr-2' onClick={handleEditBook}>
            Save Changes
          </button>
          <button className='p-2 flex-1 ml-2 bg-red-600 text-white' onClick={handleDeleteBook}>
            Delete Account
            </button>
        </div>
      </div>
    </div>
  )
}

export default EditAccount;
