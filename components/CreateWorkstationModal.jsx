// components/CreateWorkstationModal.js
import React, { useState } from 'react';
import { useWorkstation } from '@/hooks/useWorkstation';

const CreateWorkstationModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const { createWorkstation, creatingWorkstation } = useWorkstation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call createWorkstation with the new workstation's name
    createWorkstation({ name });

    // Clear the input and close the modal after submission
    setName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Workstation</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Workstation Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creatingWorkstation}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {creatingWorkstation ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkstationModal;
