const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const controllerDebugger = require('debug')('app:controllers');
const challengeService = require('../services/challenge.services');

const createChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.createChallenge(req.body);
  res.status(httpStatus.CREATED).send(challenge);
});

const getChallenges = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']); //add filter by start date later
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await challengeService.queryChallenges(filter, options);
  res.send(result);
});

const getChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.getChallengeById(req.params.Id);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  res.send(challenge);
});

const updateChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.updateChallengeById(
    req.params.Id,
    req.body
  );
  res.send(challenge);
});

const deleteChallenge = catchAsync(async (req, res) => {
  await challengeService.deleteChallengeById(req.params.Id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getActiveChallenges = catchAsync(async (req, res) => {
  const result = await challengeService.activeChallenges();
  res.send(result);
});


const getPastChallenges = catchAsync(async (req, res) => {
  const result = await challengeService.activeChallenges();
  res.send(result);
});

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  getActiveChallenges,
  getPastChallenges
};
