const mongoose = require("mongoose");

const doingSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Doing = mongoose.model("Doing", doingSchema, "Doing");
module.exports = Doing;
