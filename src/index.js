const express = require("express");
const path = require("path");
const signiuRouter = require("../router/signiuRouter");

const app = express();
// Convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
// Use EJS as the View engine
app.set("view engine", "ejs");

app.use("/", signiuRouter);
// Define Port for Application
const port = 9500;
app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});