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
    name: "Challenge Name",
    creator: "Sharon",
    tags: ["Emotional", "Spiritual"],
    timestamp: "2021-10-25T04:22:04.212Z",
    description: "jump 2000, million-times.",
    start_date: dates[0],
    end_date: dates[1],
    location: "Davis,Ca",
    participants: ["Sharon"],
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
