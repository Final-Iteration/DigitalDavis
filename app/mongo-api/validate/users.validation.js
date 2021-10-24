const Joi = require('joi');
const { objectId, email } = require('./custom.validation');

const createUser = {
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

const getUsers = {
  query: Joi.object().keys({
    first_name: Joi.string().min(1).max(30).trim(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string().min(1).max(30).trim(),
      last_name: Joi.string().min(1).max(30).trim(),
      email: Joi.string().min(3).max(50).trim(), //Add function to validate email
      dob: Joi.date().raw(),
      job_title: Joi.array().items(Joi.string()),
      department: Joi.string().trim(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
