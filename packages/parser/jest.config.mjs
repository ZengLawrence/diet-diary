import {defaults} from 'jest-config';

/** @type {import('jest').Config} */
const config = {
  ...defaults,
  testEnvironment: 'jsdom',
  verbose: true,
};

export default config;