const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    status: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Todo = mongoose.model("Todos", todoSchema, "Todos");
module.exports = Todo;
