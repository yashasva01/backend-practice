const express = require('express');
const controller = require('./controller');
const router = express();

router.get('/', controller.getHomePage);
router.get('/', controller.getAlltasks);
router.post('/tasks', controller.addToDoTask);
router.delete('/tasks/:id', controller.removeTaskWithId);
router.put('/tasks/:id', controller.updateTaskWithId);