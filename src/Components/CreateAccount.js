import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../store';


const CreateAccount = ()=> {
    
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);


  const create = async(ev) => {
    ev.preventDefault();
      try{
        console.log({ username, password });
        await dispatch(createUser({ username, password }));
        setUsername('');
        setPassword('');
        setErrors([]);
      }
      catch(ex) {
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
        <form onSubmit={ create }>
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


