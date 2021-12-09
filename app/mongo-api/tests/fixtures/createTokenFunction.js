const {
  userAuthOne,
  userAuthTwo,
  insertAuthUsers,
  userAuthThree,
} = require('../fixtures/userAuth.fixture');
const { generateAuthTokens } = require('../../services/token.services');
const userService = require('../../services/user.services');
const setupTestDB = require('../utils/setupTestDB');

/**
 * createTokens
 * imitates the register() in the auth controller
 * 1. creates a user in the DB
 * 2. creates an auth token based on the user inserted into the DB. The full token is also inserted into the DB
 */
const createTokenOne = async () => {
  try {
    const user = await userService.createUser(userAuthOne);
    const newToken = await generateAuthTokens(user);
    return [newToken, user];
  } catch (error) {
    console.log(error);
  }
};

const createTokenTwo = async () => {
  try {
    const user = await userService.createUser(userAuthTwo);
    const newToken = await generateAuthTokens(user);
    return [newToken, user];
  } catch (error) {
    console.log(error);
  }
};

const createTokenThree = async () => {
  try {
    const user = await userService.createUser(userAuthThree);
    const newToken = await generateAuthTokens(user);
    return [newToken, user];
  } catch (error) {
    console.log(error);
  }
};

const createUserTwo = async () => {
  try {
    const user = await userService.createUser(userAuthTwo);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTokenOne,
  createTokenTwo,
  createTokenThree,
  createUserTwo,
};
