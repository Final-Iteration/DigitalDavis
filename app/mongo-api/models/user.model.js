const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 50,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if user email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeuserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

var validateEmail = async function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/**
 * Check if password is correct password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.passwordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * @typedef User
 * determines collection name to be "user"
 */
const User = mongoose.model('user', userSchema);

/**
 * @todo Test if this works
 */
module.exports = User;
