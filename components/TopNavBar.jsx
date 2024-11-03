
'use client'
import React from 'react';

const TopNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-xl font-bold">CPK-Ops</div>

        {/* Login Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          //redirect to /login
          onClick={() => window.location.href = '/login'}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
