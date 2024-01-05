import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import { set } from 'mongoose';

const AmendBooking = () => {
    return (

        <div>
            <BackButton />
            AmendBooking
        </div>
    )
}

export default AmendBooking