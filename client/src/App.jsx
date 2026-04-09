import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Loader2 } from 'lucide-react';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const newTask = await createTask(newTitle);
      setTasks([...tasks, newTask]);
      setNewTitle('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await updateTask(id, { completed: !completed });
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="glass-card">
      <h1>Task Master</h1>
      
      <form onSubmit={handleAdd} className="input-container">
        <input 
          type="text" 
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit" className="add-btn">
          <Plus size={24} />
        </button>
      </form>

      {error && <p style={{ color: 'var(--danger)', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader2 className="animate-spin" size={32} color="var(--accent-primary)" />
        </div>
      ) : (
        <div className="task-list">
          {!Array.isArray(tasks) || tasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>No tasks found. Add one!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-content" onClick={() => handleToggle(task.id, task.completed)}>
                  <div className={`checkbox ${task.completed ? 'checked' : ''}`}>
                    {task.completed && <Check size={14} color="white" />}
                  </div>
                  <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <div className="task-actions">
                  <button className="icon-btn delete" onClick={() => handleDelete(task.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
