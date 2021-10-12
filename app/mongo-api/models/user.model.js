const dotenv = require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 150,
  },
  last_name: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 150,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    trim: true,
    minlength: 1,
    maxlength: 250,
  },
  dob: {
    type: Date,
    required: false,
  },
  job_title: {
    type: [String],
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
});

/**validateEmail
 * validate the email with a regex expression.
 * Returns:
 *  true: if email meets regex
 *  false: if email fails regex
 */
var validateEmail = async function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/**
 * @TODO data validation
 */
data_validation1 = async function () {};

/**
 * @TODO data validation
 */
data_validation2 = async function () {};

/**
 * @typedef User
 */
const User = mongoose.model("user",userSchema);

module.exports = User;
