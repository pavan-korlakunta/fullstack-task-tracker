require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (temporary - will use MongoDB when deployed)
let tasks = [
  { id: 1, title: 'Sample Task', description: 'This is a sample task', completed: false }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: 'Task deleted' });
});

// Toggle task completion
app.patch('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
