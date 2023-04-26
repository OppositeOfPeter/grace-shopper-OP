import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../store';

const CreateAccount = ()=> {
    
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);
  const { users } = useSelector(state => state);


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




 
 
  /*
  

  return (
    
    <form onSubmit={ create }>
        <div className="form-group">
          <label>First Name:</label>
          <input className="form-control" value={ firstName } onChange={ ev => setFirstName(ev.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input className="form-control" value={ lastName } onChange={ ev => setLastName(ev.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-control" value={ email } onChange={ ev => setEmail(ev.target.value)} />
        </div>
        <div className="needsSpace">
          <label>School: </label>
            <select value= { schoolId } onChange={ ev => setSchoolId(ev.target.value)}>
              <option value=''>Not Enrolled</option> 
                { 
                  schools.map( school => {
                    return (
                      <option value={ school.id } key={school.id}>{school.name}</option>
                    );
                  })
                }
            </select>
        </div>
        <button className= "btn btn-outline-dark btn-sm" >Create Student</button>
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
      
  );  
    
};
*/