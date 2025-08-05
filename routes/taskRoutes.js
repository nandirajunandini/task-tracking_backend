const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// ✅ Create a new task
router.post('/tasks', taskController.createTask);

// ✅ Get all tasks
router.get('/tasks', taskController.getTasks);

// ✅ Update task status
router.put('/tasks/:id', taskController.updateTask);

// ✅ Get task stats
router.get('/tasks/stats', taskController.getStats);

module.exports = router;
