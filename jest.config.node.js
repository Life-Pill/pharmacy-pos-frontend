/** @type {import('ts-jest').JestConfigWithTsJest} */
const { HtmlReporter } = require('jest-html-reporters');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default', 'jest-html-reporters'],
};
