const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const challengeController = require('../controllers/challenge.controller');
const challengeValidation = require('../validate/challenge.validation');
const routeDebugger = require('debug')('app:routes');

router
  .route('/')
  .post(
    validate(challengeValidation.createChallenge),
    challengeController.createChallenge
  )
  .get(
    validate(challengeValidation.getChallenges),
    challengeController.getChallenges
  );

router
.route("/active")
.get(validate(challengeValidation.activeChallenges),
 challengeController.getActiveChallenges
);

router
.route("/past")
.get(validate(challengeValidation.pastChallenges),
 challengeController.getPastChallenges
);

router
  .route("/:Id")
  .get(
    validate(challengeValidation.getChallenge),
    challengeController.getChallenge
  )
  .patch(
    validate(challengeValidation.updateChallenge),
    challengeController.updateChallenge
  )
  .delete(
    validate(challengeValidation.deleteChallenge),
    challengeController.deleteChallenge
  );

module.exports = router;
