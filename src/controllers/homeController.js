const { Todo, Doing, Done } = require("../model");

const starter_page = (req, res) => {
    if (req.session.user) {
        res.redirect("/home");
    } else {
        res.redirect("/login");
    }
};

const home_page = async (req, res) => {
    if (req.session.user) {
        try {
            const todos = await Todo.find();
            const doings = await Doing.find();
            const dones = await Done.find();
            res.render("home", { todos, doings, dones });
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.redirect("/login");
    }
};

const add_todo = async (req, res) => {
    console.log("Request Body:", req.body);
    if (req.session.user) {
        try {
            const newTodo = await Todo.create(req.body);

            res.status(201).json(newTodo);
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).json({ message: "Unexpected error" });
        }
    } else {
        res.status(401).json({ message: "Please login" });
    }
};
const add_Doing = async (req, res) => {
    console.log("Request Body:", req.body);
    if (req.session.user) {
        try {
            const newDoing = await Doing.create(req.body);

            res.status(201).json(newDoing);
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).json({ message: "Unexpected error" });
        }
    } else {
        res.status(401).json({ message: "Please login" });
    }
};
const add_Done = async (req, res) => {
    console.log("Request Body:", req.body);
    if (req.session.user) {
        try {
            const newDone = await Done.create(req.body);

            res.status(201).json(newDone);
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).json({ message: "Unexpected error" });
        }
    } else {
        res.status(401).json({ message: "Please login" });
    }
};

module.exports = {
    starter_page,
    home_page,
    add_todo,
    add_Doing,
    add_Done,
};
