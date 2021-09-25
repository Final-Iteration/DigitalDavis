const dotenv = require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");

// schema
const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  timestamps: {
    type: Date,
    required: true,
    default: Date.now,
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
  participants: {
    type: [String],
    required: true,
  },
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
 * @typedef Challenge
 */
const Challenge = mongoose.model(
  config.get("development.database.collection"),
  challengeSchema
);

module.exports = Challenge;
