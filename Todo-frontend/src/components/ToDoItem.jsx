import React from 'react';

function ToDoItem({ task, onMarkAsDone, onUndo, onTaskClick }) {
  return (
    <div className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <span
          className={`text-lg cursor-pointer ${task.is_done ? 'line-through text-gray-400' : ''}`}
          onClick={() => onTaskClick(task)} // Handle title click
        >
          {task.title}
        </span>
      </div>
      <div className="flex space-x-2">
        {!task.is_done ? (
          <button className="px-4 py-2 bg-blue-500 text-black rounded-lg" onClick={() => onMarkAsDone(task.id)}>
            Mark as Done
          </button>
        ) : (
          <button className="px-4 py-2 bg-red-500 text-black rounded-lg" onClick={() => onUndo(task.id)}>
            Undo
          </button>
        )}
      </div>
    </div>
  );
}

export default ToDoItem;
