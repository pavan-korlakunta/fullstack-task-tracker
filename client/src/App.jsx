import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://fullstack-task-tracker-ftuc.onrender.com'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`)
      const data = await response.json()
      setTasks(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setLoading(false)
    }
  }

  // Create new task
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
      const newTask = await response.json()
      setTasks([...tasks, newTask])
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE'
      })
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PATCH'
      })
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  if (loading) return <div className="container"><h1>Loading...</h1></div>

  return (
    <div className="container">
      <h1>📝 Task Tracker</h1>
      
      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add one above!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
              </div>
              <div className="task-actions">
                <button onClick={() => toggleTask(task.id)} className="btn-complete">
                  {task.completed ? '↩️' : '✓'}
                </button>
                <button onClick={() => deleteTask(task.id)} className="btn-delete">
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
