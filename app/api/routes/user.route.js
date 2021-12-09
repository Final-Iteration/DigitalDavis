const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const userController = require('../controllers/user.controller');
const userValidation = require('../validate/users.validation');
const routeDebugger = require('debug')('app:routes');
const auth = require('../middleware/auth');

router
  .route('/:Id')
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(
    auth(),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

module.exports = router;
