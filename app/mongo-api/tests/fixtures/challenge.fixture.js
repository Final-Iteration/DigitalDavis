const mongoose = require("mongoose");
const faker = require("faker");
const { Challenge } = require("../../models");

function start_date() {
  const startDate = new Date();
  return startDate;
}

function start_date_add_days(days) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + days);
  return startDate;
}

function end_date() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  return endDate;
}

function end_date_add_days(days) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  return endDate;
}

const challengeTags = [
  "Emotional",
  "Environmental",
  "Intellectual",
  "Physical",
  "Social",
  "Spiritual",
];
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
  tags: [shuffle(challengeTags)],
  description: faker.random.words(),
  location: faker.address.city(),
  unsplashurl:
    // eslint-disable-next-line max-len
    "https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20",
  timestamp: faker.date.soon(),
  start_date: start_date(),
  end_date: end_date(),
  participants: [`${faker.name.findName()}`],
};

const challengeTwo = {
  _id: mongoose.Types.ObjectId(),
  name: "Bouncing Challenge",
  creator: faker.lorem.words(3).substring(0, 30),
  tags: ["Physical", "Spiritual"],
  description: faker.random.words(),
  location: faker.address.city(),
  unsplashurl:
    // eslint-disable-next-line max-len
    "https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20",
  timestamp: faker.date.soon(),
  start_date: start_date_add_days(2),
  end_date: end_date_add_days(2),
  participants: [`${faker.name.findName()}`],
};

const challengeThree = {
  _id: mongoose.Types.ObjectId(),
  name: "CatWalking Challenge",
  creator: "Sharon",
  tags: ["Physical", "Social", "Spiritual"],
  description: faker.random.words(),
  location: faker.address.city(),
  unsplashurl:
    // eslint-disable-next-line max-len
    "https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20",
  timestamp: faker.date.soon(),
  start_date: start_date_add_days(9),
  end_date: end_date_add_days(9),
  participants: [`${faker.name.findName()}`, `${faker.name.findName()}`],
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
