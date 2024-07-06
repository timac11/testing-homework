import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '<rootDir>test/unit/**/*(*.)@(spec|test).[tj]s?(x)',
  ],
  roots: ['<rootDir>/test/unit'],
  transform: {
    '^.+\\.(j|t)sx?$': ['ts-jest', {isolatedModules: true}],
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.ts']
};

export default config;
