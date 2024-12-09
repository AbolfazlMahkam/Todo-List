const mongoose = require("mongoose");

const doneSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Done = mongoose.model("Done", doneSchema, "Done");
module.exports = Done;
