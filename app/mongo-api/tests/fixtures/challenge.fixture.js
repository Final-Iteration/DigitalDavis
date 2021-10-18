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
  tags: shuffle(challengeTags),
  description: faker.random.words(),
  location: faker.address.city(),
  timestamp: faker.date.recent(),
  start_date: faker.date.soon(),
  end_date: faker.date.future(),
  participants: [
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
  ],
};

const challengeTwo = {
  _id: mongoose.Types.ObjectId(),
  name: "Bouncing Challenge",
  creator: faker.lorem.words(3).substring(0, 30),
  tags: shuffle(challengeTags),
  description: faker.random.words(),
  location: faker.address.city(),
  timestamp: faker.date.recent(),
  start_date: faker.date.soon(),
  end_date: faker.date.future(),
  participants: [
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
  ],
};

const challengeThree = {
  _id: mongoose.Types.ObjectId(),
  name: "CatWalking Challenge",
  creator: faker.lorem.words(3).substring(0, 30),
  tags: shuffle(challengeTags),
  description: faker.random.words(),
  location: faker.address.city(),
  timestamp: faker.date.recent(),
  start_date: faker.date.soon(),
  end_date: faker.date.future(),
  participants: [
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
    `${faker.name.findName()}`,
  ],
};

const insertChallenges = async (challenges) => {
  challenges.map((challenge) =>
    challenge.participants.push(challenges.creator)
  );
  challenges.map((challenge) =>
    console.log("\nChallenge creator: ", challenge.creator)
  );

  await Challenge.insertMany(challenges.map((challenge) => ({ ...challenge })));
};

module.exports = {
  challengeOne,
  challengeTwo,
  challengeThree,
  insertChallenges,
};
