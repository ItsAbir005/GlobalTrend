import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  { id: 1, title: 'Learn React', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build a Full Stack App', completed: true, createdAt: new Date() }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (completed !== undefined) tasks[taskIndex].completed = completed;
  if (title !== undefined) tasks[taskIndex].title = title;

  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
