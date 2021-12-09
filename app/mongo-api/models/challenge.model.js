const { toJSON, paginate } = require('./plugins');
const mongoose = require('mongoose');
const modelDebugger = require('debug')('model:startup');

/**
 * @function challengeSchema
 * @name required name,alphanum only, 5<=name.length<=30
 * @start_date Date in [FORMAT: ISO] today's date <=start_date <= end_date
 * @end_date Date in [FORMAT: ISO] (today's date <=end_date) AND (start_date<=end_date)
 * @description required alphanum only, 5<=description<=150
 * @creator required 3<=creator's name <=30
 * @participants a list of names of valid users
 * @tags can only be the following strings  ['Emotional', 'Environmental', 'Intellectual', 'Physical', 'Social', 'Spiritual']
 */
Schema = mongoose.Schema;
const challengeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    trim: true,
  },
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  tags: {
    type: [String],
    enum: [
      'Emotional',
      'Environmental',
      'Intellectual',
      'Physical',
      'Social',
      'Spiritual',
    ],
    required: false,
  },
  description: {
    type: String,
    required: false,
    maxlength: 250,
    trim: true,
  },
  summary: {
    type: String,
    required: false,
    maxlength: 150,
    trim: true,
  },
  location: {
    type: String,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  unsplashurl: {
    type: String,
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
        return validateStartDate(date);
      },
      message: 'Start Date cannot be in the past',
    },
  },
  end_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return validateEndDate(this.start_date, date);
      },
      message: 'End Date must be after start date within 1 year.',
    },
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      default: function () {
        return this.creator;
      },
    },
  ],
});

// add plugin that converts mongoose to json
challengeSchema.plugin(toJSON);
challengeSchema.plugin(paginate);

/**
 * Check if challenge name is taken
 * @param {string} challengeName - The challenges name
 * @param {ObjectId} [excludeChallengeId] - The id of the challengeto be excluded
 * @returns {Promise<boolean>}
 */
challengeSchema.statics.isNameTaken = async function (
  name,
  excludeChallengeId
) {
  const challenge = await this.findOne({
    name,
    _id: { $ne: excludeChallengeId },
  });
  return !!challenge;
};

/**
 * @function validateEndDate
 * @DEBUG ONLY
 * @param {Date} startDate - Date object representing the challenge's start date.
 * @param {Date} endDate - Date object representing the challenge's end date.
 * @returns {boolean} Returns True if startdate <= enddate <= startDate + 1 year
 */
const validateEndDate = (startDate, endDate) => {
  const customStartDate = dateFormater(startDate, false);
  const customEndDate = dateFormater(endDate, false);
  const oneFormatedYear = 10000;

  if (
    customStartDate <= customEndDate &&
    customEndDate <= customStartDate + oneFormatedYear
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * @function validateStartDate
 * @DEBUG ONLY
 * @param {Date} startDate - Date object representing the challenge's start date.
 * @param {Date} endDate - Date object representing the challenge's end date.
 * @returns {boolean} Returns True if startdate >= currentDate
 */
const validateStartDate = (startDate) => {
  const customStartDate = dateFormater(startDate, false);
  const customCurrentDate = dateFormater(new Date(), true);

  if (customStartDate >= customCurrentDate) {
    return true;
  } else {
    return false;
  }
};

/**
 * @function dateFormater
 * @param {Date} date - Date object to have format changed.
 * @param {boolean} currentDate - Set true if this is for a current date and not a future date
 * @returns Integer form of date in YYYYMMDD format.
 */
const dateFormater = (date, currentDate) => {
  let number = parseInt(
    '' +
      date.getFullYear() +
      (date.getMonth() + 1 > 9 ? '' : 0) +
      (date.getMonth() + 1) +
      (date.getUTCDate() > 9 ? '' : 0) +
      (currentDate ? date.getDate() : date.getUTCDate()),
    10
  );

  modelDebugger('TYPEOF date', typeof number);
  return number;
};

/**
 * @typedef Challenge
 */
const Challenge = mongoose.model('challenge', challengeSchema);
module.exports = Challenge;
