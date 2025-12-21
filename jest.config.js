/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$': 'jest-transform-stub', // Handle asset files
    '^@App/(.*)$': '<rootDir>/src/$1', // Map TS path aliases
  },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional: for extra setup (e.g., jest-dom)
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsConfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
};
