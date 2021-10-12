const { Challenges } = require("../models");
const serviceDebugger = require("debug")("app:service");

/**
 *
 * @param {*} challengeBody
 */
async function createChallenge(challengeBody) {
  try {
    const Challenge = mongoose.model(
      config.get("development.database.collection"),
      challengeSchema
    );
    const challenge = new Challenge({
      name: "Simple Challenge 4",
      id: await makeUniqueID(16),
      creator: "Josh Poe",
      participants: "Josh Poe",
    });
    const result = await challenge.save();
    serviceDebugger(result + "\n challenge added");
  } catch (error) {
    serviceDebugger(error.message);
  }
}

/**
 *
 */
async function queryChallenges() {
  try {
    const challenge = await Challenge.find().limit(10).sort({ name: 1 });
    serviceDebugger(challenge);
  } catch (error) {
    serviceDebugger(error.message);
  }
}

/**
 *
 * @param {*} id
 */
async function getChallengeById(id) {
  try {
    const challenge = await Challenge.find().limit(10).sort({ name: 1 });
    serviceDebugger(challenge);
  } catch (error) {
    serviceDebugger(error.message);
  }
}

/**
 *
 * @param {*} name
 */
async function getChallengeByName(name) {
  try {
    const challenge = await Challenge.find().limit(10).sort({ name: 1 });
    serviceDebugger(challenge);
  } catch (error) {
    serviceDebugger(error.message);
  }
}

/**
 * @todo
 * @param {*} date
 */
async function getChallengeByDate(date) {
  try {
  } catch (error) {
    serviceDebugger(error.message);
  }
}

/**
 * @todo
 * @param {string} id
 * @param {object} updatedChallenge
 * @returns
 */
async function updateChallengeById_Client(id, challengeBody) {
  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) return;

    for (const [key, value] of Object.entries(updatedChallenge)) {
      challenge.set({
        key: value,
      });
    }

    const result = await challenge.save();
    serviceDebugger("challenge " + id + " updated.");
    serviceDebugger(result);
  } catch (error) {
    serviceDebugger(error.message);
  }
}

/**
 * @todo
 * @param {string} id
 * @param {object} updatedChallenge
 * @returns
 */
async function updateChallengeById_Server(id, challengeBody) {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      {
        $set: {
          key: "value",
        },
      },
      { new: true }
    );

    if (!challenge) return;

    const result = await challenge.save();
    serviceDebugger("challenge " + id + " updated.");
    serviceDebugger(result);
  } catch (error) {
    serviceDebugger(error);
  }
}

/**
 * @todo
 * @param {string} id
 * @returns
 */
async function deleteChallengeById(id) {
  try {
  } catch (error) {
    serviceDebugger(error);
  }
  await user.remove();
  return user;
}

module.exports = {
  createChallenge,
  queryChallenges,
  getChallengeById,
  getChallengeByDate,
  updateChallengeById_Client,
  updateChallengeById_Server,
  deleteChallengeById,
};
