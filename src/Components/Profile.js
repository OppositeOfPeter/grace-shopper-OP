import React from 'react';
import { useSelector } from 'react-redux';



const Profile = ()=> {
    
  const { auth } = useSelector(state => state);
  
  return (
    <div>
      <h1> { auth.username }'s Profile</h1>
    </div>
  );

};


export default Profile;
