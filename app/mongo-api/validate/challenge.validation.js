const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChallenge = {
  body: Joi.object().keys({
    name: Joi.string().min(5).max(30).trim().required(),
    creator: Joi.string().required().min(3).max(30).trim(),
    tags: Joi.array()
      .items(
        Joi.string().valid(
          'Emotional',
          'Environmental',
          'Intellectual',
          'Physical',
          'Social',
          'Spiritual'
        )
      )
      .required(),
    description: Joi.string().max(150).trim(),
    location: Joi.string().min(1).max(50).trim(),
    timestamp: Joi.date().raw(),
    start_date: Joi.date().raw().required(),
    end_date: Joi.date().raw().required(),
    participants: Joi.array().items(Joi.string()),
  }),
};

const getChallenges = {
  query: Joi.object().keys({
    name: Joi.string().min(5).max(30).trim(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChallenge = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const updateChallenge = {
  params: Joi.object().keys({
    Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().min(5).max(30).trim(),
      creator: Joi.string().min(3).max(30).trim(),
      tags: Joi.array().items(
        Joi.string().valid(
          'Emotional',
          'Environmental',
          'Intellectual',
          'Physical',
          'Social',
          'Spiritual'
        )
      ),
      description: Joi.string().max(150).trim(),
      location: Joi.string().min(1).max(50).trim(),
      timestamp: Joi.date().raw(),
      start_date: Joi.date().raw(),
      end_date: Joi.date().raw(),
      start_date: Joi.date().raw(),
      end_date: Joi.date().raw(),
      participants: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteChallenge = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const activeChallenges = {
  query: Joi.object().keys({
    name: Joi.string().min(5).max(150).trim(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const pastChallenges = {
  query: Joi.object().keys({
    name: Joi.string().min(5).max(150).trim(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  activeChallenges,
  pastChallenges,
};
