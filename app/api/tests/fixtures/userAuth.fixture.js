const mongoose = require('mongoose');
const faker = require('faker');
const { User } = require('../../models');
const { userService } = require('../../services');

const userAuthOne = {
  first_name: 'Ace',
  last_name: 'Bob',
  password: '1234567abd',
  email: 'austyn67@yahoo.com',
  job_title: ['CIO'],
  department: 'IT',
};

const userAuthTwo = {
  first_name: 'Bobbo',
  password: '1234567abd',
  last_name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const userAuthThree = {
  first_name: faker.name.findName(),
  last_name: faker.name.findName(),
  password: '1234567abd',
  email: faker.internet.email().toLowerCase(),
  job_title: [`${faker.name.jobTitle()}`],
  department: faker.commerce.department(),
};

const insertAuthUsers = async (users) => {
  for (let i = 0; i < users.length; i++) {
    await userService.createUser(users[i]);
  }
};

module.exports = {
  userAuthOne,
  userAuthTwo,
  userAuthThree,
  insertAuthUsers,
};
