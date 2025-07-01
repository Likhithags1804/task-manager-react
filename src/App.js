import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taskText, setTaskText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when app loads
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  //  Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskTextChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() === '') return;

    const newTask = {
      text: taskText,
      deadline: deadline,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
    setDeadline('');
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container">
      <h1>Task Manager App</h1>

      <div className="input-section">
        <input
          type="text"
          value={taskText}
          onChange={handleTaskTextChange}
          placeholder="Enter a task"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={handleDeadlineChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="tasks-grid">
        {tasks.map((t, index) => (
          <div className="task-card" key={index}>
            <div className="task-text"><strong>{t.text}</strong></div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              {t.deadline ? t.deadline : 'No deadline'}
            </div>
            <button onClick={() => deleteTask(index)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
