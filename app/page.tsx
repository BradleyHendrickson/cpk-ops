// pages/index.js
import React from 'react';

const Home = () => {
  // Dummy user info
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Home;
