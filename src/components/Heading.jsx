import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { app } from '../api/firebase';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Heading = () => {
  const auth = getAuth(app);
  
  const handleClickLogOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <header className="bg-white shadow-md px-8 py-5 flex items-center justify-between">
      {/* Logo and app name */}
      <div className="flex items-center space-x-3">
       
        <Link to="/" className="text-gray-700 text-xl font-semibold">
          NotesApp
        </Link>
      </div>

      {/* Logout button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleClickLogOut}
          className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
        >
          <FiLogOut className="mr-2" size={24} />
        </button>
      </div>
    </header>
  );
};

export default Heading;
