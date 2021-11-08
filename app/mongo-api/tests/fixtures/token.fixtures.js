const moment = require('moment');
const config = require('config');
const { tokenTypes } = require('../../utils/tokens');
const tokenService = require('../../services/token.services');
const { userOne, userTwo, userThree } = require('./user.fixture');

const accessTokenExpires = moment().add(config.get('jwt.accessExpirationMinutes'), 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);
const userTwoAccessToken = tokenService.generateToken(userTwo._id, accessTokenExpires, tokenTypes.ACCESS);
const userThreeAccessToken = tokenService.generateToken(userThree._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  userTwoAccessToken,
  userThreeAccessToken
};