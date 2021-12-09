const mongoose = require('mongoose');
const faker = require('faker');
const { Challenge } = require('../../models');
const challengeService = require('../../services/challenge.services');

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
  'Emotional',
  'Environmental',
  'Intellectual',
  'Physical',
  'Social',
  'Spiritual',
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
  name: 'A Running Challenge',
  creator: mongoose.Types.ObjectId(),
  tags: [shuffle(challengeTags)],
  description: faker.random.words(),
  location: faker.address.city(),
  unsplashurl:
    // eslint-disable-next-line max-len
    'https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20',
  timestamp: faker.date.soon(),
  start_date: start_date_add_days(1),
  end_date: end_date_add_days(1),
};

const challengeTwo = {
  _id: mongoose.Types.ObjectId(),
  name: 'Bouncing Challenge',
  creator: mongoose.Types.ObjectId(),
  tags: ['Physical', 'Spiritual'],
  description: faker.random.words(),
  location: faker.address.city(),
  unsplashurl:
    // eslint-disable-next-line max-len
    'https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20',
  timestamp: faker.date.soon(),
  start_date: start_date_add_days(2),
  end_date: end_date_add_days(2),
};

const challengeThree = {
  _id: mongoose.Types.ObjectId(),
  name: 'CatWalking Challenge',
  creator: mongoose.Types.ObjectId(),
  tags: ['Physical', 'Social', 'Spiritual'],
  description: faker.random.words(),
  location: faker.address.city(),
  unsplashurl:
    // eslint-disable-next-line max-len
    'https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20',
  timestamp: faker.date.soon(),
  start_date: start_date_add_days(3),
  end_date: end_date_add_days(3),
};

const insertChallenges = async (challenges) => {
  await Challenge.insertMany(challenges.map((challenge) => ({ ...challenge })));
};

const getChallengeById = async (challengeId) => {
  return Challenge.findOne({ _id: challengeId });
};

const insertChallengesSkipValidation = async (
  challenges,
  startdates,
  enddates
) => {
  for (let i = 0; i < challenges.length; ++i) {
    let challenge = JSON.parse(JSON.stringify(challenges[i])); //makes a deep copy of the challenges
    challenge.start_date = startdates[i];
    challenge.end_date = enddates[i];
    // You can use a Model to create new documents using `new`:
    const challengeDoc = new Challenge(challenge);
    await challengeDoc.save({ validateBeforeSave: false });
  }
};

const insertChallengesParticipateUser = async (challenges, userID) => {
  for (let i = 0; i < challenges.length; ++i) {
    let challenge = JSON.parse(JSON.stringify(challenges[i])); //makes a deep copy of the challenges
    const challengeUpdate = await challengeService.updateParticipants(
      challenges[i]._id,
      userID
    );
  }
};

module.exports = {
  challengeOne,
  challengeTwo,
  challengeThree,
  insertChallenges,
  insertChallengesSkipValidation,
  insertChallengesParticipateUser,
};
