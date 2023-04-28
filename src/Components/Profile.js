import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../store';
import { useNavigate } from 'react-router-dom';
import UpdateAccount from './UpdateAccount';


const Profile = () => {
    
  const { auth } = useSelector(state => state);
  
  return (
    <div>
      <h1> { auth.username }'s Profile</h1>
      <UpdateAccount />
    </div>
  );  
    
};


export default Profile;
