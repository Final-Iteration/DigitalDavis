const dotenv = require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");

// schema defines the structure of the challenge
//Challenge must have name, 5<=name.length<=255
//Challenge must have a START and END date
//Challegge must have a description 5<=name.length<=600
const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false, //I don't think it has to be unique
    required: true,
    minlength: 5,
    maxlength: 150,
    trim: true,
  },
  creator: {
    type: String,
    // id: __id,    Unique MongoDB of the creator who is a user
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  tags: {
    type: [String],
    enum: ["Fitness", "Spiritual", "Social", "Nutrition", "Other"],
    required: false,
  },
  summary: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  timestamp: {
    type: Date,
    required: false,
    default: Date.now,
  },
  start_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return date >= date.now;
      },
      message: "Start Date must be after or be today's Date.",
    },
    default: Date.now,
  },
  end_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return date >= date.now;
      },
      message: "End Date must be after or be today's Date.",
    },
  },
  participants: {
    type: [Schema.Types.ObjectId], //Array of objectId's referencing User ids
    ref: "User",
    required: true,
  },
});

/**
 * @TODO data validation
 */
data_validation = async function () {};

/**
 * @TODO data validation
 */
data_validation1 = async function () {};

/**
 * @TODO data validation
 */
data_validation2 = async function () {};

/**
 * @typedef Challenge
 */
const Challenge = mongoose.model(
  config.get("development.database.collection"),
  challengeSchema
);

module.exports = Challenge;
