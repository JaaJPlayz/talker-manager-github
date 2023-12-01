const autenticationValidator = require('./autenticationValidator');
const nameValidator = require('./nameValidator');
const ageValidator = require('./ageValidator');
const talkValidator = require('./talkValidator');
const watchedAtValidator = require('./watchedAtValidator');
const { rateValidatorI, rateValidatorII } = require('./rateValidator');
const registrateUser = require('./registrateUser');
const updateUser = require('./updateUser');
const talkerDeleteById = require('./talkerDeleteById');
const getUserByQuery = require('./getUserByQuery');

module.exports = {
  autenticationValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidatorI,
  rateValidatorII,
  registrateUser,
  updateUser,
  talkerDeleteById,
  getUserByQuery,
};