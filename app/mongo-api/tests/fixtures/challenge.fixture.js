const mongoose = require("mongoose");
const faker = require("faker");
const { Challenge } = require("../../models");

const challengeOne = {
  _id: mongoose.Types.ObjectId(),
  first_name: "A Running Challenge",
  last_name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const challengeTwo = {
  _id: mongoose.Types.ObjectId(),
  first_name: "Bouncing Challenge",
  last_name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const challengeThree = {
  _id: mongoose.Types.ObjectId(),
  first_name: "CatWalking Challenge",
  last_name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const insertChallenges = async (challenges) => {
  await Challenge.insertMany(challenges.map((challenge) => ({ ...challenge })));
};

module.exports = {
  challengeOne,
  challengeTwo,
  challengeThree,
  insertChallenges,
};
