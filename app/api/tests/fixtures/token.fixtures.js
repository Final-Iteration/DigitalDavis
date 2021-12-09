const moment = require('moment');
const config = require('../../config/config');
const { tokenTypes } = require('../../config/tokens');
const tokenService = require('../../services/token.services');
const { userOne, userTwo, userThree } = require('./user.fixture');
const getToken = require('../fixtures/createTokenFunction');

module.exports = {
  userOneAccessToken,
};
