const testDebugger = require('debug')('app:test');

const faker = require("faker");
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

// Functions to create the dates
function start_date() {
  const startDate = new Date();
  return startDate;
}

function end_date() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  // return new Date(endDate).toISOString();
  return endDate;
}

//Asynchronous code to get the dates
const getStartDate = async () => {
  const start = start_date();
  return start;
};

const getEndDate = async () => {
  const end = end_date();
  return end;
};

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
    creator: faker.lorem.words(3).substring(0, 30),
    tags: shuffle(challengeTags),
    location: faker.address.city().substring(0, 30),
    timestamp: faker.date.recent(),
    participants: [
      `${faker.name.findName()}`,
      `${faker.name.findName()}`,
      `${faker.name.findName()}`,
      `${faker.name.findName()}`,
      `${faker.name.findName()}`,
    ],
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
