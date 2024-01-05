import React, {useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import {useNavigate} from 'react-router-dom';
import { set } from 'mongoose';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveAccount = () => {
        console.log("go to save ")
        const data = {
            username,
            password,
        };        
        console.log(data);
        setLoading(true);
        axios.post('http://localhost:5555/accounts', data)
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
        <div>
            <BackButton destination="/" />
            <h1 className='text-3xl my-8 font-bold'>Create Account</h1>


            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Username</label>
                    <input
                        type='text'
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Enter your username'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Password</label>
                    <input
                        type='password'
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                </div>
                <div className='flex justify-between'>

                    <Link to={`/`} className='p-2 bg-sky-300 flex-1 mr-2 text-center'>
                        <button onClick={handleSaveAccount}>
                            Create Account
                        </button>
                    </Link>                    
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
