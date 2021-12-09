const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const challengeController = require('../controllers/challenge.controller');
const challengeValidation = require('../validate/challenge.validation');
const routeDebugger = require('debug')('app:routes');
const auth = require('../middleware/auth');

router
  .route('/')
  .post(
    auth(),
    validate(challengeValidation.createChallenge),
    challengeController.createChallenge
  )
  .get(
    auth(),
    validate(challengeValidation.getChallenges),
    challengeController.getChallenges
  );

router
  .route('/active')
  .get(
    auth(),
    validate(challengeValidation.activeChallenges),
    challengeController.getActiveChallenges
  );

router
  .route('/past')
  .get(
    auth(),
    validate(challengeValidation.pastChallenges),
    challengeController.getPastChallenges
  );

router
  .route('/all')
  .get(
    auth(),
    validate(challengeValidation.allChallenges),
    challengeController.getAllChallenges
  );

router
  .route('/participate/:Id')
  .get(auth(), challengeController.getParticipants)
  .put(auth(), challengeController.updateParticipants);

router
  .route('/unparticipate/:Id')
  .put(auth(), challengeController.deleteParticipants);

router
  .route('/:Id')
  .get(
    auth(),
    validate(challengeValidation.getChallenge),
    challengeController.getChallenge
  )
  .patch(
    auth(),
    validate(challengeValidation.updateChallenge),
    challengeController.updateChallenge
  )
  .delete(
    auth(),
    validate(challengeValidation.deleteChallenge),
    challengeController.deleteChallenge
  );

module.exports = router;
