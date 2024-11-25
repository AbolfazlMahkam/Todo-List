const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ToDo-List";
const connect = mongoose.connect(dbURI, {
    authSource: "admin",
    user: process.env.MONGO_ROOT_USERNAME || "",
    pass: process.env.MONGO_ROOT_PASSWORD || "",
});

connect
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.error("Database cannot be Connected:", error.message);
    });

module.exports = mongoose;
