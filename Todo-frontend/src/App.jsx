import { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6">
      <ToDoList />
    </div>
  );
}

export default App;
