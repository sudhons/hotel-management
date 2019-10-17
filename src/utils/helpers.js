require('dotenv/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = password => bcrypt.hashSync(password, 4);

const validatePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

const generateAuthToken = tokenObj =>
  jwt.sign(tokenObj, process.env.TOKEN_SECRET);

module.exports = {
  hashPassword,
  validatePassword,
  generateAuthToken
};
