const mongoose = require("./config");

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("users", loginSchema, "users");
module.exports = User;
