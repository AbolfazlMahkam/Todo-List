const bcrypt = require("bcrypt");
const express = require("express");
const { User } = require("../model");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: "your_Secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
);

const starter_page = (req, res) => {
    if (req.session.user) {
        res.render("home");
    } else {
        res.redirect("/login");
    }
};

const signin_page = (req, res) => {
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
            req.session.user = check.name;
            // res.render("home");
            res.redirect("/");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Error occurred while logging in");
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
};

module.exports = {
    starter_page,
    signin_page,
    signup_page,
    signUp,
    signIn,
    logout,
};
