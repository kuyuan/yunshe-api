const path = require("path");
require('dotenv').config({ path: path.resolve(".env.test") })
const seed = require('../seed').seed;

module.exports = async () => {
  await seed();
};
