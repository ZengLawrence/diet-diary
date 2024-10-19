import {defaults} from 'jest-config';

/** @type {import('jest').Config} */
const config = {
  ...defaults,
  testEnvironment: 'jsdom',
};

export default config;