
require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  saltRounds:process.env.SALT_ROUNDS
};
