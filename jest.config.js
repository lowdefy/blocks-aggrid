module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/test', '<rootDir>/demo/'],
  coverageReporters: [['lcov', { projectRoot: './' }], 'text', 'clover'],
  errorOnDeprecated: true,
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/src/test'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  transform: {
    '\\.js?$': 'babel-jest',
    '\\.yaml$': 'jest-transform-yaml',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'yaml', 'css'],
};
