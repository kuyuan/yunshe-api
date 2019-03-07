const seed = require('../seed').seed;
require("dotenv").config()

module.exports = async () => {
  await seed()
};
