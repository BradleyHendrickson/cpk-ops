// Dashboard.js
'use client'
import { React } from 'react';
import { useUser } from '@/hooks/useUser'; // adjust the import path as necessary

export default function Dashboard() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Workstation Dashboard</h1>
      
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
