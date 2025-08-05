const Task = require('../models/taskModel');

// ✅ Create a new task
exports.createTask = async (req, res) => {
  const { title, description, assigned_to, status } = req.body;

  console.log('📥 Incoming Task Data:', req.body); // ✅ Debug: Log incoming data

  if (!title || !description || !assigned_to || !status) {
    console.warn('⚠️ Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await Task.createTask(title, description, assigned_to, status);
    console.log('✅ Task inserted into DB:', result); // ✅ Debug: Log DB result
    res.status(201).json({ message: 'Task created successfully', task: result });
  } catch (err) {
    console.error('❌ Controller error in createTask:', err.message);
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

// ✅ Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// ✅ Update task status
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const updated = await Task.updateTaskStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task status updated', task: updated });
  } catch (err) {
    console.error('❌ Error updating task:', err.message);
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

// ✅ Get task stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Task.getTaskStats();
    res.json(stats);
  } catch (err) {
    console.error('❌ Error fetching stats:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
