import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import {useNavigate, useParams } from 'react-router-dom';

const Login = () => {
    const [account, setAccount] = useState([])
    const [loading, setLoading] = useState(false);
    const [inUsername, setUsername] = useState('');
    const [inPassword, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const searchAccountByUsername = async (inUsername) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5555/accounts/user/${inUsername}`);
            setAccount(response.data);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleLogin = () => {
        searchAccountByUsername(inUsername)
            .then(account => {
                if (account.length > 0 && account[0].username === inUsername && account[0].password === inPassword) {
                    console.log('Login successful');
                    navigate('/home');
                } else {
                    setLoginError(true);
                }
            })
            .catch(error => {
                console.error(error);
                setLoginError(true);
            });
    };

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1 className='text-3xl my-8 font-bold'>Login</h1>

            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Username</label>
                    <input
                        type='text'
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        value={inUsername}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Password</label>
                    <input
                        type='password'
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        value={inPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {loginError && <p className='text-red-500'>Invalid username or password</p>}
                <div className='flex justify-between'>
                    <button onClick={handleLogin} className='p-2 bg-sky-300 flex-1 mr-2'>
                        Login
                    </button>
                    <Link to={{ pathname: `/account/create`, state: {  id: account[0] ? account[0].id : null } }} className='p-2 bg-sky-300 flex-1 ml-2'>
                        <button>Create Account</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
