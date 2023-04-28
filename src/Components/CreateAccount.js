import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store';
import { useNavigate } from 'react-router-dom';
//import { attemptLogin } from '../store';

//User is being create but not logged in, trying to figure out 
//what to do with the user after created

const CreateAccount = ()=> {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);

  
  const registerUser = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      username,
      password
    };

    try {
      await dispatch(register(credentials));
      setErrors([]);
      //navigate('/profile');
    }
    catch(ex){
      setErrors(ex.response.data.error.errors); 
    }

  };
  
  return (
    <div>
      <div>
        <h2>Create Account</h2>
        <p>No account? No problem!</p>
        <p>Register below:</p>
      </div>
      <div>
        <form onSubmit={ registerUser }>
          <label>Username:</label>
          <input value={ username } onChange={ ev => setUsername(ev.target.value)} />
          <label>Password:</label>
          <input value={ password } onChange={ ev => setPassword(ev.target.value)} />
          <button>Create Account</button>
          <ul>
            {
              errors.map( (error, idx) => {
                return (
                  <li key={ idx }>
                    { error.message }
                  </li>
                );
              })
            }
          </ul>
        </form>
      </div>
    </div>
  );
};


export default CreateAccount;


