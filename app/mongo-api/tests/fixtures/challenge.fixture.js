const mongoose = require("mongoose");
const faker = require("faker");
const { Challenge } = require("../../models");

const challengeTags = [
  "Emotional",
  "Environmental",
  "Intellectual",
  "Physical",
  "Social",
  "Spiritual",
];

function start_date() {
  const startDate = new Date().toISOString();
  return startDate;
}

function end_date() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  return endDate;
}

/**
 * @TODO Create  function to generate valid start and end dates for the challenge
 */

/**
 *
 *@todo fix copied shuffle code [DUPLICATED CODE]
 */

/**
 * Returns the first element in the challengeTags array after the array has been shuffled
 * @param {*} array
 * @returns
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array[0];
}

const challengeOne = {
  _id: mongoose.Types.ObjectId(),
  name: "A Running Challenge",
  creator: faker.lorem.words(3).substring(0, 30),
  tags: ["Emotional"],
  description: faker.random.words(),
  location: faker.address.city(),
  timestamp: null,
  start_date: null,
  end_date: null,
  participants: [`${faker.name.findName()}`],
};

const challengeTwo = {
  _id: mongoose.Types.ObjectId(),
  name: "Bouncing Challenge",
  creator: faker.lorem.words(3).substring(0, 30),
  tags: ["Physical", "Social", "Spiritual"],
  description: faker.random.words(),
  location: faker.address.city(),
  timestamp: null,
  start_date: null,
  end_date: null,
  participants: [`${faker.name.findName()}`],
};

const challengeThree = {
  _id: mongoose.Types.ObjectId(),
  name: "CatWalking Challenge",
  creator: "Sharon",
  tags: ["Physical", "Social", "Spiritual"],
  description: faker.random.words(),
  location: faker.address.city(),
  timestamp: null,
  start_date: null,
  end_date: null,
  participants: [`${faker.name.findName()}`, `${faker.name.findName()}`],
};

const insertChallenges = async (challenges) => {
  challenges.map((challenge) => {
    challenge.start_date = start_date();
    challenge.end_date = end_date();
  });
  await Challenge.insertMany(challenges.map((challenge) => ({ ...challenge })));
};

// const insertChallenges = async (challenges) => {
//   await Challenge.insertMany(challenges.map((challenge) => ({ ...challenge })));
// };

module.exports = {
  challengeOne,
  challengeTwo,
  challengeThree,
  insertChallenges,
};
