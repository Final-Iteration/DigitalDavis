const moment = require('moment');
const dotenv = require('dotenv').config();
const config = require('config');
const { tokenTypes } = require('../../utils/tokens');
const tokenService = require('../../services/token.services');
const { userOne, userTwo, userThree } = require('./user.fixture');
const testDebugger = require('debug')('app:test');

const accessTokenExpires = moment().add(config.get('development.jwt.accessExpirationMinutes'), 'minutes');
const userTwoAccessToken = tokenService.generateToken(userTwo._id, accessTokenExpires, tokenTypes.ACCESS);
const userThreeAccessToken = tokenService.generateToken(userThree._id, accessTokenExpires, tokenTypes.ACCESS);
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  userTwoAccessToken,
  userThreeAccessToken
};