'use client';
import React from 'react';
import { useUser } from '@/hooks/useUser';

const TopNavbar = () => {
  const { data: user, isLoading, isError } = useUser();

  // If loading or error, handle those cases
  //if (isLoading) return <div>Loading...</div>;
  //if (isError) return <div>Error fetching user data</div>;

  const currentCompany = user?.userCompanies[0]?.company?.name ?? '\u00A0' // Get the company name
  const userEmail = user?.email ?? '\u00A0'; // Get the user email

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-xl font-bold">CPK-Ops</div>

        {/* Right Section for User Info and Login Button */}
        <div className="flex items-center">
          <div className="flex flex-col items-end space-y-1">
            {/* User Email */}
            {userEmail && (
              <div className="text-md font-bold">{userEmail}</div>
            )}
            {/* Company Name */}
            {currentCompany && (
              <div className="text-sm">{currentCompany}</div>
            )}
          </div>

          {/* Login Button */}
          {
            user ? (
              <button
              className={`ml-4 bg-gray-500 hover:bg-gray-500 text-white px-4 py-2 rounded`}
              // Redirect to /login, but disable if user exists
              onClick={() => !user && (window.location.href = '/login')}
            >
              Sign Out
            </button>
            ) : (
              <button
              className={`ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${user ? 'opacity-50 cursor-not-allowed' : ''}`}
              // Redirect to /login, but disable if user exists
              onClick={() => !user && (window.location.href = '/login')}
  
            >
              Login
            </button>
            )
          }


        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
