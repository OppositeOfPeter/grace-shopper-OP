import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../store';
import { useNavigate } from 'react-router-dom';


const UpdateAccount = () => {
    
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  
  const updateUser = async(ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ username, password }));
    setUsername('');
    setPassword('');
    navigate('/profile');
  };  
    
  
  return (
    <div>
      <h2>Update Account</h2>
      <form onSubmit={ updateUser }>
        <label>Username:</label>
          <input value={ username } onChange={ ev => setUsername(ev.target.value)} />
        <label>Password:</label>
          <input value={ password } onChange={ ev => setPassword(ev.target.value)} />
        <button>Update Account</button>
      </form>
    </div>
  );  
    
};


export default UpdateAccount;

