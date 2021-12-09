const mongoose = require('mongoose');

function start_date() {
  const startDate = new Date();
  return startDate;
}

function end_date() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  return endDate;
}

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

//Asynchronous code to get the dates
const getStartDate = async () => {
  const start = start_date_add_days(3);
  return start;
};

const getEndDate = async () => {
  const end = end_date_add_days(3);
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
    name: 'Challenge Name',
    tags: ['Emotional', 'Spiritual'],
    timestamp: '2021-10-25T04:22:04.212Z',
    description: 'jump 2000, million-times.',
    start_date: dates[0],
    end_date: dates[1],
    location: 'Davis,Ca',
    unsplashurl:
      // eslint-disable-next-line max-len
      'https://api.unsplash.com/search/photos?client_id=dKCwWRS0lpMlSl94mWFd5cY_PuVdooRGl8fdAEc7Xnc&query=dog&per_page=20',
  };
  return newChallenge;
};

const getChallenge = async () => {
  const newChallenge = await createChallenge();
  return newChallenge;
};

module.exports = getChallenge;
