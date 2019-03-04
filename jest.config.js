const path = require('path');

module.exports = {
  globalSetup: path.resolve(__dirname, './support/test/setup'),
  globalTeardown: path.resolve(__dirname, './support/test/teardown'),
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  testURL: "http://localhost",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@schemaTypes/(.*)$": "<rootDir>/src/types/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@resolvers/(.*)$": "<rootDir>/src/resolvers/$1",
    "^@loaders/(.*)$": "<rootDir>/src/loaders/$1",
    "^@support/(.*)$": "<rootDir>/support/$1"
  },
};
