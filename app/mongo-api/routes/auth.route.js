const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validate/auth.validation');
const routeDebugger = require('debug')('app:routes');
const passport = require('passport');

router
  .route('/signup')
  .post(validate(authValidation.signup), authController.signup);

router
  .route('/login')
  .post(authController.login);

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
   res.status(200).json({ success: true, msg: 'You are authorized', headers: req.headers});
});

module.exports = router;