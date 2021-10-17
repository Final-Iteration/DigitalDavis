const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const validateStartDate = (value, helpers) => {};
const validateEndDate = (value, helpers) => {};

module.exports = {
  objectId,
  validateStartDate,
  validateEndDate,
};
