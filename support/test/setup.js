const seed = require('../seed').seed;

module.exports = async () => {
  await seed()
};
