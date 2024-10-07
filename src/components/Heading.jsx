import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import { app } from '../api/firebase';

const Heading = () => {
  const auth = getAuth(app);
  const handleClickLogOut= async()=>{
    try{
      await signOut(auth)
    }catch(err){
      alert(err.message);
    }
  }
  return (
    <div>
        <h1>Notes</h1>
        <button onClick={handleClickLogOut}>Log out</button>
    </div>
)
}

export default Heading