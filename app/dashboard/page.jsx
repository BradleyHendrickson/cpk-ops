// Dashboard.js
'use client'
import { React, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useWorkstation } from '@/hooks/useWorkstation'; 
import { createClient } from '@/utils/supabase/client'; 
import CreateWorkstationModal from '@/components/CreateWorkstationModal'; 
import SelectWorkstation from '@/components/SelectWorkstation'; 

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkstation, setSelectedWorkstation] = useState(null);
  const { data: user, isLoading, isError } = useUser();
  const { data: workstations, isLoading: isWorkstationsLoading, isError: isWorkstationsError,createWorkstation, creatingWorkstation } = useWorkstation();

  const handleCreateWorkstation = (newWorkStation) => {
      createWorkstation({
        name: 'New Workstation',
        // ...other workstation data
      });
    };
    
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
            <SelectWorkstation
        selectedWorkstation={selectedWorkstation}
        onChange={setSelectedWorkstation}
        />
      <h1 className="text-2xl font-bold mb-4">Workstation Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">{JSON.stringify(selectedWorkstation,null,2)}</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Workstation
      </button>

      <CreateWorkstationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <pre>
          {JSON.stringify(workstations, null, 2)}
        </pre>
      </div>
    </div>
  );
}
