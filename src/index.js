const path = require("path");
const express = require("express");
const route = require("./router/route");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
// Convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

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
// Use EJS as the View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", route);

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect("/log-in");
    }
}

app.get("/protected-route", isAuthenticated, (req, res) => {
    res.send("This is a protected route");
});

// Define Port for Application
const port = 9500;
app.listen(port, () => {
    console.log(`Server listening on Port ${port}`);
});
