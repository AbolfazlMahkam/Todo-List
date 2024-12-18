const path = require("path");
const cors = require("cors")
const express = require("express");
const route = require("./router/route");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: 'http://localhost:9500', // مبدا را به درستی تنظیم کنید
    credentials: true,
}));

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
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/ToDo-List",
            ttl: 7 * 24 * 60 * 60,
        }),
        cookie: {
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    })
);
// Use EJS as the View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
});


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
