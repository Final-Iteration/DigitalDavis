const testDebugger = require('debug')('app:test');
const mongoose = require('mongoose');
const faker = require('faker');
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

// Functions to create the dates
function start_date() {
  const startDate = new Date();
  return startDate;
}

function end_date() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  return endDate;
}

//Asynchronous code to get the dates
const getStartDate = async () => {
  const start = start_date_add_days(3);
  return start;
};

const getEndDate = async () => {
  const end = end_date_add_days(3);
  return end;
};

function start_date_add_days(days) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + days);
  return startDate;
}

function end_date_add_days(days) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  return endDate;
}

const getDates = async () => {
  const startDate = getStartDate();
  const endDate = getEndDate();
  const dates = await Promise.all([startDate, endDate]);
  return dates;
};

const createChallenge = async () => {
  const dates = await getDates();
  const newChallenge = {
    name: faker.random.words(2),
    creator: mongoose.Types.ObjectId(),
    tags: shuffle(challengeTags),
    location: faker.address.city().substring(0, 30),
    unsplashurl:
      // eslint-disable-next-line max-len
      'https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20',
    timestamp: faker.date.recent(),
    start_date: dates[0],
    end_date: dates[1],
  };
  return newChallenge;
};

const getChallenge = async () => {
  const newChallenge = await createChallenge();
  return newChallenge;
};

module.exports = getChallenge;
