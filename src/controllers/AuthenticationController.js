const { User } = require("../model");
const bcrypt = require("bcrypt");

const starter_page = (req, res) => {
    res.render("login");
};

const signup_page = (req, res) => {
    res.render("signup");
};

const signUp = async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    };
    // Check if the username alredy exists in the database
    const existingUser = await User.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        // Hash the password using bcrypt
        const saltRound = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRound);
        data.password = hashedPassword; // Replace the original password with the hashed one
        const userdata = await User.insertMany(data);
        res.redirect("/login"); // Redirect to login page after successful signup
    }
};

const signIn = async (req, res) => {
    try {
        const check = await User.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found");
            return;
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            check.password
        );
        if (!isPasswordMatch) {
            res.send("wrong Password");
        } else {
            res.render("home");
        }
    } catch {
        res.status(400).send("Invalid username or password.");
    }
};

module.exports = {
    starter_page,
    signup_page,
    signUp,
    signIn,
};