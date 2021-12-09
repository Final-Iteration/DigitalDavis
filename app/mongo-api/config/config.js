const path = require('path');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});
const Joi = require('joi');
const { Certificate } = require('crypto');

let nodeEnv = process.env.NODE_ENV;
let mongo_url = '';

if (nodeEnv == 'production') {
  mongo_url = process.env.MONGODB_URL_PROD;
} else {
  mongo_url = process.env.MONGODB_URL_DEV;
}

module.exports = {
  env: nodeEnv,
  port: process.env.PORT,
  debug: process.env.DEBUG,
  mongoose: {
    url: mongo_url,
    certificate: process.env.CERTIFICATE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
