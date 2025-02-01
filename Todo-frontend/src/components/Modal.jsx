import React from 'react';

function Modal({ task, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Task Details</h3>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Status:</strong> {task.is_done ? 'Completed' : 'Pending'}</p>
        <p><strong>Details:</strong> {task.details || "No details provided."}</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-red-500 text-black rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
