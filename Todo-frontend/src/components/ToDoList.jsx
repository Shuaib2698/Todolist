import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import Modal from './Modal';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');

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

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask, is_done: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

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

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
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

  const handleSaveTask = (taskId, updatedDetails) => {
    // Update the task details
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, details: updatedDetails } : task
    );
    setTasks(updatedTasks); // Update state with modified task details
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">To-Do List | 📝📋✅</h2>

      {/* Add Task Input */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="px-4 py-2 bg-green-500 text-black rounded-r-lg" onClick={addTask}>
          Add
        </button>
      </div>

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
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedTask && (
        <Modal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask} // Pass the handleSaveTask function here
        />
      )}
    </div>
  );
}

export default ToDoList;
