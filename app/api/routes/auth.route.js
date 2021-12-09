const express = require('express');
const validate = require('../middleware/validate');
const authValidation = require('../validate/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
  '/refresh-tokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post(
  '/send-verification-email',
  auth(),
  authController.sendVerificationEmail
);
router.post(
  '/verify-email',
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);
router.get('/test', auth(), (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: 'You are authorized', headers: req.headers });
});

module.exports = router;
