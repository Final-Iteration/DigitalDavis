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
  console.log("start_date() ", start_date());
  const start = start_date();
  return start;
};

const getEndDate = async () => {
  console.log("end_date() ", end_date());
  const end = end_date();
  return end;
};

const getDates = async () => {
  const startDate = getStartDate();
  const endDate = getEndDate();
  const dates = await Promise.all([startDate, endDate]);
  console.log("dates", dates);
  return dates;
};

const createChallenge = async () => {
  const dates = await getDates();
  console.log(dates);
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
  console.log("\n newChallenge", newChallenge);
  return newChallenge;
};

const getChallenge = async () => {
  const newChallenge = await createChallenge();
  console.log("\n newChallenge in getChallenge", newChallenge);
  return newChallenge;
};

module.exports = getChallenge;
