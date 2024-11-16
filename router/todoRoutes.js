const express = require("express");
const Todo = require("../model/todoModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Adding todo
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      user: req.user.id,
    });

    await newTodo.save();
    res.status(201).send("Todo added successfully");
  } catch (err) {
    res.status(500).send("Error adding todo");
  }
});

// show user todo
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send("Error retrieving todos");
  }
});

module.exports = router;
