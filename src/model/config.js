const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ToDo-List";
const connect = mongoose.connect(dbURI, {
    authSource: "admin",
    user: process.env.MONGO_ROOT_USERNAME || "root",
    pass: process.env.MONGO_ROOT_PASSWORD || "example",
});


connect
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.error("Database cannot be Connected:", error.message);
    });

module.exports = mongoose
