import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { app } from '../api/firebase'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const auth = getAuth(app);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user)=> {
        if (user) {
            setLoading(false);
        }else{
            navigate('/sign-in');
        }
      })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard