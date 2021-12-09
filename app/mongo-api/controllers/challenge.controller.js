const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const controllerDebugger = require('debug')('app:controllers');
const challengeService = require('../services/challenge.services');

const createChallenge = catchAsync(async (req, res) => {
  const creatorID = req.headers.id;
  const challenge = await challengeService.createChallenge(req.body, creatorID);
  res.status(httpStatus.CREATED).send(challenge);
});

const getChallenges = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'start_date']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await challengeService.queryChallenges(filter, options);
  res.send(result);
});

const getChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.getChallengeById(req.params.Id);
  const creator = await challengeService.challengeCreator(req.params.Id);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  res.send({ challengeInfo: challenge, creatorInfo: creator });
});

const updateChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.updateChallengeById(
    req.params.Id,
    req.body
  );
  res.send(challenge);
});

const deleteChallenge = catchAsync(async (req, res) => {
  await challengeService.deleteChallengeById(req.params.Id, req.headers.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getActiveChallenges = catchAsync(async (req, res) => {
  const result = await challengeService.activeChallenges(req.headers.id);
  res.send(result);
});

const getPastChallenges = catchAsync(async (req, res) => {
  const result = await challengeService.pastChallenges(req.headers.id);
  res.send(result);
});

const getAllChallenges = catchAsync(async (req, res) => {
  const result = await challengeService.allChallenges();
  res.send(result);
});

const getParticipants = catchAsync(async (req, res) => {
  const result = await challengeService.getParticipants(req.params.Id);
  res.send(result);
});

const updateParticipants = catchAsync(async (req, res) => {
  const creatorID = req.headers.id;
  const result = await challengeService.updateParticipants(
    req.params.Id,
    creatorID
  );
  if (!result) {
    throw new ApiError(httpStatus.OK, 'User not added successfully');
  }
  res.send(result);
});

const deleteParticipants = catchAsync(async (req, res) => {
  const creatorID = req.headers.id;
  const result = await challengeService.deleteParticipants(
    req.params.Id,
    creatorID
  );
  if (!result) {
    throw new ApiError(httpStatus.OK, 'User not deleted successfully');
  }
  res.send(result);
});

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  getActiveChallenges,
  getPastChallenges,
  getAllChallenges,
  getParticipants,
  updateParticipants,
  deleteParticipants,
};
