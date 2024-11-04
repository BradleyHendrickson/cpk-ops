// components/SelectWorkstation.js
import React from 'react';
import { useWorkstation } from '@/hooks/useWorkstation';

const SelectWorkstation = ({ selectedWorkstation, onChange }) => {
  const { data: workstations, isLoading, isError } = useWorkstation();

  if (isLoading) return <div>Loading workstations...</div>;
  if (isError) return <div>Error loading workstations</div>;

  return (
    <div>
      <label htmlFor="workstation" className="block text-sm font-medium text-gray-700 mb-1">
        Select Workstation
      </label>
      <select
        id="workstation"
        value={selectedWorkstation}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">-- Select a Workstation --</option>
        {workstations.map((workstation) => (
          <option key={workstation.id} value={workstation.id}>
            {workstation.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWorkstation;
