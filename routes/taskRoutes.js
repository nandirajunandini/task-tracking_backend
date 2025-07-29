const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/task-stats', taskController.getStats);

module.exports = router;