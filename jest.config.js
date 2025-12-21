module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    '^@App/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
}