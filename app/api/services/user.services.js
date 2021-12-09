const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a User
 * @param {Object} UserBody
 * @returns {Promise<User>}
 */
const createUser = async (UserBody) => {
  if (await User.isEmailTaken(UserBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(UserBody);
};

/**
 * Query for Users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const Users = await User.paginate(filter, options);
  return Users;
};

/**
 * Get User by ID
 * @param {string} ID
 * @returns {Promise<User>}
 */
const getUserById = async (UserId) => {
  return User.findOne({ _id: UserId });
};

/**
 * Get User by Email
 * @param {string} Email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

/**
 * Get User by Name
 * @param {string} first_name
 * @returns {Promise<User>}
 */
const getUserByName = async (first_name) => {
  return User.findOne({ first_name });
};

/**
 * Update User by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (id, updateBody) => {
  const User = await getUserById({ _id: id });
  if (!User) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(User, updateBody);
  await User.save();
  return User;
};

/**
 * Delete User by id
 * @param {ObjectId} Id
 * @returns {Promise<User>}
 */
const deleteUserById = async (id) => {
  const User = await getUserById({ _id: id });
  if (!User) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await User.remove();
  return User;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByName,
  updateUserById,
  deleteUserById,
  getUserByEmail,
};
