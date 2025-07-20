import express from 'express';
import { Todo } from '../models/todoModel.js';

export const Todorouter = express.Router();

Todorouter.get('/', async (req, res) => {
  try {
    const completed = req.query.completed;

    let filter = {};
    if (completed === 'true') {
      filter.completed = true;
    } else if (completed === 'false') {
      filter.completed = false;
    }

    const tasks = await Todo.find(filter); // Not User.findOne
    res.render('todolistUI', { tasks });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


Todorouter.post('/addTask', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new Todo({ task, completed: false });
    await newTask.save();
    const taskId = newTask.task;
    res.redirect('/tasks'); 
  } catch (err) {
    res.status(500).send(err.message);
  }
});

Todorouter.post('/deleteTask', async (req, res) => {
  try {
    const { taskId } = req.body;
    await Todo.deleteOne({ _id: taskId }); 
    res.redirect('/tasks');
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Failed to delete task.");
  }
});

Todorouter.post('/toggleComplete', async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Todo.findById(id);
    if (task) {
      task.completed = !task.completed;
      await task.save();
    }
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

