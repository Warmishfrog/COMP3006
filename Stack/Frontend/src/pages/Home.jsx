import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem('user');
  const accountId = JSON.parse(loggedInUser)._id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/accounts/id/${accountId}`)
      .then((response) => {
        setAccount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookings/UserID/${accountId}`)
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAmendBooking = (booking) => {
    localStorage.setItem('booking', JSON.stringify(booking));
    navigate(`/rooms/book/amend/`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); //delete user from local storage
  };

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:5555'); // Replace with your WebSocket server URL

    // Connection opened
    webSocket.addEventListener('open', (event) => {
      console.log('WebSocket connection established');
      const username = JSON.parse(loggedInUser).username; // Set the client username as the user's current username
      console.log('Sending username:', username);
      webSocket.send(username);
    });

    // Listen for messages
    webSocket.addEventListener('message', (event) => {
      //console.log('Received message:', event.data);
      setChatLog((prevChatLog) => [...prevChatLog, event.data]);
    });

    // Save the socket instance
    setSocket(webSocket);

    // Clean up the WebSocket connection
    return () => {
      webSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket.readyState === WebSocket.OPEN && message) { // Check if message is not null or empty
      console.log('Sending message:', message);
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 font-bold'>Home</h1>
      </div>
      <div>
        <p>Logged in as: {account.username}</p>
      </div>

      <div id="DisplayBookings">
        <h2 className='text-2xl my-4 font-bold'>Your Bookings</h2>
        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded-md'>RoomID</th>
                <th className='border border-slate-600 rounded-md'>Number of Guests</th>
                <th className='border border-slate-600 rounded-md'>Check-In Date</th>
                <th className='border border-slate-600 rounded-md'>Number of Nights</th>
                <th className='border border-slate-600 rounded-md'>Amend Booking</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{booking.RoomID}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{booking.NumGuests}</td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {new Date(booking.CheckInDate).toLocaleDateString()}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>{booking.NumNights}</td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <button
                        className='flex items-center px-4 py-2 rounded-md bg-blue-500 text-white'
                        onClick={() => handleAmendBooking(booking)}
                      >
                        <p className='text-sky-800 text-4x1 text-white'>&rarr;</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div id="DisplayButtons"> 
        <Link to={`/`}>
          <button className='p-2 bg-sky-300 flex-1 mr-2' onClick={handleLogout}>
            Logout
          </button>
        </Link>
        <Link to={{ pathname: `/account/edit/${accountId}` }}>
          <button className='p-2 bg-sky-300 flex-1 mr-2'>Edit Account</button>
        </Link>
        <Link to={`/rooms/book`}>
          <button className='p-2 bg-sky-300 flex-1 mr-2'>Book Room</button>
        </Link>
        <Link to={`/rooms/manage`}>
          <button className='p-2 bg-sky-300 flex-1 mr-2'>Manage Rooms</button>
        </Link>
      </div>

      <div id="DisplayChat">
        <div className='flex flex-col min-h-screen'>
          <div className='flex-grow w-1/2'>
            <p><strong>Contact</strong></p>
            <input
              type='text'
              placeholder='Enter your message here'
              className='border border-gray-300 rounded-md px-2 py-1 mr-2'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={handleSendMessage}>
              Send
            </button>
            <div className='border border-gray-300 rounded-md overflow-auto' style={{ maxHeight: '200px' }}>
              <p className='px-2 py-1 mr-2 w-full'>ChatLog</p>
              {chatLog.map((message, index) => (
                <p key={index} className='px-2 py-1 mr-2 w-full'>
                  {message}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;