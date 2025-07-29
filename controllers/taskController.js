const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = await Task.createTask(title, description, assignedTo);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Task.getTaskStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};