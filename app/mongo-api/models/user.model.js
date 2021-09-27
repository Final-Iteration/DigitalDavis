const dotenv = require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    required: true,
  },
  last_name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  job_title: {
    type: [String],
    required: false,
  },
  department: {
    type: String,
    required: false,
  }
});

/**
 * @TODO data validation
 */
data_validation = async function () {

};

/**
 * @TODO data validation
 */
 data_validation1 = async function () {

};

/**
 * @TODO data validation
 */
 data_validation2 = async function () {

};

/**
 * @typedef User
 */
const User = mongoose.model(
  config.get("development.database.collection"),
  userSchema
);

module.exports = User;
