const mongoose = require('mongoose');
const faker = require('faker');
const { User } = require('../../models');

const userOne = {
  _id: '61805068b28159892591bded',
  first_name: 'Ace',
  last_name: faker.name.findName(),
  password: '1234567abd',
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const userTwo = {
  _id: '61805068b28159892591bded',
  first_name: 'Bobbo',
  password: '1234567abd',
  last_name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const userThree = {
  _id: '61805068b28159892591bded',
  first_name: faker.name.findName(),
  last_name: faker.name.findName(),
  password: '1234567abd',
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user })));
};

module.exports = {
  userOne,
  userTwo,
  userThree,
  insertUsers,
};
