const path = require('path');

module.exports = {
  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: path.resolve(__dirname, './support/test/setup'),

  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: path.resolve(__dirname, './support/test/teardown'),

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@resolvers/(.*)$": "<rootDir>/src/resolvers/$1",
    "^@loaders/(.*)$": "<rootDir>/src/loaders/$1",
    "^@support/(.*)$": "<rootDir>/support/$1"
  },
};
