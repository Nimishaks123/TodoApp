import React, { useState } from 'react';
import './Todo.css';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
        const isDuplicate = tasks.some((task) => task.text === input.trim());
    if (isDuplicate) {
      alert('Task already exists!');
      setInput('');
    } else {
      setTasks([...tasks, { text: input, completed: false ,isEditing: false }]);
      setInput('');
    }
}
    else {
        alert('Please add the item'); 
      }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  const toggleEditMode = (index) => {
    setTasks(tasks.map((task, i) => (i === index ? { ...task, isEditing: !task.isEditing } : task)));
  };
  

  return (
    <div className="app">
      <header className="header">
        <h1>To-Do List</h1>
      </header>
      <div className="input-container">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      
<ul className="task-list">
  {tasks.map((task, index) => (
    <li key={index} className={task.completed ? 'task completed' : 'task'}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
      />
      {task.isEditing ? (
        <>
          <input
            type="text"
            value={task.text}
            onChange={(e) =>
              setTasks(tasks.map((t, i) => (i === index ? { ...t, text: e.target.value } : t)))
            }
          />
          <button onClick={() => toggleEditMode(index)}>Save</button>
        </>
      ) : (
        <>
          <span className={task.completed ? 'strike-through' : ''}>
            {task.text}
          </span>
          <button onClick={() => toggleEditMode(index)}>Edit</button>
        </>
      )}
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  ))}
</ul>
{/* count:{tasks.length} */}


    </div>
  );
}

export default Todo;