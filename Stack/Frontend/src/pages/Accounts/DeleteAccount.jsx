import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const loggedInUser = localStorage.getItem('user');
  const accountId = JSON.parse(loggedInUser)._id;

  const handleDeleteAccount = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/accounts/id/${accountId}`)
      .then(response => {
        setLoading(false);
        localStorage.removeItem('user'); //delete user from local storage
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
      <BackButton destination={`/account/edit/${accountId}`}/>
      <h1 className='text-3xl my-4'>Delete Account</h1>
      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2x1'>Are you sure you want to delete this account?</h3>
        
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteAccount}>Yes, Delete</button>
        
      </div>

    </div>
  )
}

export default DeleteAccount;
