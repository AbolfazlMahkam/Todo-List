const model = require("../model");

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
            const todos = await model.Todo.find({ status: "todo" });
            const doings = await model.Todo.find({ status: "doing" });
            const dones = await model.Todo.find({ status: "done" });
            res.render("home", { todos, doings, dones });
            // res.json({ todos, doings, dones });
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        res.redirect("/login");
    }
};

const get_todo = async (req, res) => {
    const todos = await model.Todo.find({ status: "todo" });
    const doings = await model.Todo.find({ status: "doing" });
    const dones = await model.Todo.find({ status: "done" });
    res.json({ todos, doings, dones });
}

const add_todo = async (req, res) => {
    if (req.session.user) {
        console.log(req.body);
        try {
            const newTodo = await model.Todo.create(req.body);

            res.status(201).json(newTodo);
        } catch (err) {
            console.error("Unexpected Error:", err);
            res.status(500).json({ message: "Unexpected error" });
        }
    } else {
        res.status(401).json({ message: "Please login" });
    }
};

const update_status = async (req, res) => {
    try {
        const todoId = req.params.id;
        const newStatus = req.body.status;
        console.log(todoId);
        console.log(newStatus);


        const updatedTodo = await model.Todo.findByIdAndUpdate(todoId, { status: newStatus }, { new: true });
        if (updatedTodo) {
            res.status(200).json({ message: 'Status updated successfully', updatedTodo });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    starter_page,
    home_page,
    get_todo,
    add_todo,
    update_status,
};
