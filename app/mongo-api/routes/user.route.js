const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const userController = require("../controllers/user.controller");
const userValidation = require("../validate/users.validation");
const routeDebugger = require("debug")("app:routes");

router
  .route("/")
  .post(validate(userValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route("/:Id")
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
