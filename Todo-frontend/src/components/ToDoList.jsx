import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import Modal from './Modal';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tasks/');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Update task status in the API
  const updateTaskStatus = async (id, isDone) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_done: isDone }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleMarkAsDone = (id) => {
    updateTaskStatus(id, true);
  };

  const handleOnUndo = (id) => {
    updateTaskStatus(id, false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">To-Do List | 📝📋✅</h2>
      {loading ? (
        <p className="text-gray-600">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <ToDoItem
              key={task.id}
              task={task}
              onMarkAsDone={handleMarkAsDone}
              onUndo={handleOnUndo}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedTask && (
        <Modal task={selectedTask} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ToDoList;
