const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ToDo-List";
const connect = mongoose.connect(dbURI);

// Check database connected or not
connect
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Database cannot be Connected:", error.message);
  });

// Created Schema
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Collection part
const collection = mongoose.model("users", loginSchema, "users");
module.exports = collection;