const dotenv = require("dotenv").config();
const config = require("config");
const { toJSON, paginate } = require("./plugins");
const mongoose = require("mongoose");
const modelDebugger = require("debug")("app:model");

// schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    //validate: [validateEmail, 'Please fill a valid email address'],
    trim: true,
    minlength: 1,
    maxlength: 250,
  },
  dob: {
    type: Date,
    required: false,
   // validate: [validateDOB, 'Please enter a correct date'],
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


// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if user email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeuserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 userSchema.statics.isEmailTaken = async function (
  email,
  excludeUserId
) {
  const user = await this.findOne({
   email,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};


//@TODO Fix this function @Daniel
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
 * validate DOB to ensure user enters date in correct format
 */
//validateDOB = async function (dob) {

//};



/**
 * @typedef User
 */
const User = mongoose.model("user",userSchema);

module.exports = User;