const httpStatus = require('http-status');
const Challenge = require('../models/challenge.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a challenge
 * @param {Object} challengeBody, ID
 * @returns {Promise<Challenge>}
 */
const createChallenge = async (challengeBody, ID) => {
  const data = {
    name: challengeBody.name,
    creator: ID,
    tags: challengeBody.tags,
    description: challengeBody.description,
    summary: challengeBody.summary,
    location: challengeBody.location,
    timestamp: challengeBody.timestamp,
    start_date: challengeBody.start_date,
    end_date: challengeBody.end_date,
    unsplashurl: challengeBody.unsplashurl,
    //participants: challengeBody.participants
  };
  return Challenge.create(data);
};

/**
 * Query for challenges
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryChallenges = async (filter, options) => {
  const challenges = await Challenge.paginate(filter, options);
  return challenges;
};

/**
 * Get challenge by id
 * @param {string} Id
 * @returns {Promise<Challenge>}
 */
const getChallengeById = async (challengeId) => {
  const challenge = await Challenge.findOne({ _id: challengeId });
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  return challenge;
};

/**
 * Get challenge by challenge name
 * @param {string} name
 * @returns {Promise<Challenge>}
 */
const getChallengeByName = async (name) => {
  return Challenge.findOne({ name });
};

/**
 * Update challenge by id
 * @param {ObjectId} id
 * @param {Object} challengeBody
 * @returns {Promise<Challenge>}
 */
const updateChallengeById = async (id, challengeBody) => {
  const challenge = await getChallengeById({ _id: id });
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  if (
    challengeBody.email &&
    (await Challenge.isEmailTaken(challengeBody.email, id))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    Object.assign(challenge, challengeBody);
    await challenge.save();
    return challenge;
  }
  const data = {
    name: challengeBody.name,
    tags: challengeBody.tags,
    description: challengeBody.description,
    summary: challengeBody.summary,
    location: challengeBody.location,
    timestamp: challengeBody.timestamp,
    start_date: challengeBody.start_date,
    end_date: challengeBody.end_date,
  };
  return Challenge.update(data);
};

/**
 * Delete challenge by id
 * @param {ObjectId} Id
 * @returns {Promise<Challenge>}
 */
const deleteChallengeById = async (challengeID, userID) => {
  const challenge = await getChallengeById({ _id: challengeID });
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  if (userID == challenge.creator) {
    await challenge.remove();
  } else if (userID == challenge.creator) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
  }
};

/**
 * Filter challenges with start date > today
 * and end date < today
 * @param {ObjectStart} Start
 * @returns {Promise<Challenge>}
 */
const activeChallenges = async (userID) => {
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  rn = today.toISOString();
  const challenges = await Challenge.find({
    $and: [{ end_date: { $gte: rn } }, { start_date: { $lte: rn } }],
  });

  const result = await challenges.filter(
    (challenges) => challenges.participants == userID
  );
  return result;
};

const pastChallenges = async (userID) => {
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  rn = today.toISOString();
  const challenges = await Challenge.find({ end_date: { $lt: rn } });
  const result = await challenges.filter(
    (challenges) => challenges.participants == userID
  );
  return result;
};

const allChallenges = async () => {
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  rn = today.toISOString();
  const challenges = await Challenge.find({} || { end_date: { $gte: rn } });
  return challenges;
};

const challengeCreator = async (challengeId) => {
  const thisChallenge = await Challenge.findOne({ _id: challengeId });
  const creatorID = thisChallenge.creator;
  const creatorInfo = await User.findOne({ _id: creatorID });
  return creatorInfo;
};

const getParticipants = async (challengeId) => {
  const thisChallenge = await Challenge.findOne({ _id: challengeId });
  const people = thisChallenge.participants;
  const participantsInfo = await User.find({ _id: people });
  return participantsInfo;
};

const updateParticipants = async (challengeId, userID) => {
  Challenge.updateOne(
    { _id: challengeId },
    { $addToSet: { participants: userID } },
    function (err, raw) {
      if (err) return handleError(err);
    }
  );
};

const deleteParticipants = async (challengeId, userID) => {
  Challenge.updateOne(
    { _id: challengeId },
    { $pull: { participants: userID } },
    function (err, raw) {
      if (err) return handleError(err);
    }
  );
};
/**
 * Filter challenges with start date > today
 * and end date < today
 * @param {ObjectStart} Start
 * @returns {Promise<Challenge>}
 */

module.exports = {
  createChallenge,
  queryChallenges,
  getChallengeById,
  getChallengeByName,
  updateChallengeById,
  deleteChallengeById,
  activeChallenges,
  pastChallenges,
  allChallenges,
  challengeCreator,
  getParticipants,
  updateParticipants,
  deleteParticipants,
};
