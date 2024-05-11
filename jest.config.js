/** @type {import('ts-jest').JestConfigWithTsJest} */
const { HtmlReporter } = require('jest-html-reporters');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  reporters: ['default', 'jest-html-reporters'],
};
