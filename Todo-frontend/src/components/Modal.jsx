import React, { useState } from 'react';

function Modal({ task, onClose, onSave }) {
  const [taskDetails, setTaskDetails] = useState(task.details || '');

  const handleSave = () => {
    onSave(task.id, taskDetails); // Call onSave function to update task details
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-2 text-blue-600">{task.title}</h2>
        <p className={`mb-4 font-medium ${task.is_done ? 'text-green-600' : 'text-red-600'}`}>
          Status: {task.is_done ? '✅ Done' : '⏳ Pending'}
        </p>

        {/* Editable Task Details */}
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none"
          rows="4"
          placeholder="Enter task details..."
          value={taskDetails}
          onChange={(e) => setTaskDetails(e.target.value)}
        />

        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
            Close
          </button>
          <button className="px-4 py-2 bg-green-500 text-black rounded-lg" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
