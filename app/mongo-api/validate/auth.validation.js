const Joi = require('joi');

const signup = {
  body: Joi.object().keys({
    first_name: Joi.string().min(1).max(150).trim().required(),
    last_name: Joi.string().min(1).max(150).trim().required(),
    email: Joi.string().required().min(3).max(30).trim(), //Add function to validate email
    password: Joi.string().required().min(8),
    dob: Joi.date().raw(),
    job_title: Joi.array().items(Joi.string()),
    department: Joi.string().trim(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().min(3).max(30).trim(), //Add function to validate email
  }),
};

module.exports = {
  signup,
  forgotPassword,
};
