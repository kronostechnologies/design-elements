const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    resetMocks: true,
    moduleDirectories: [
        'src',
        'node_modules',
    ],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/test/__mocks__/svg-mock.js',
        '\\.s?css': '<rootDir>/test/__mocks__/style-mock.js',
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    },
    roots: [
        '<rootDir>/src',
    ],
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    snapshotResolver: '<rootDir>/test/snapshot-resolver.js',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: ['**/*.test.{ts,tsx}'],
    globals: {
        'ts-jest': {
            tsConfig: path.resolve(__dirname, 'test', 'tsconfig.json'),
        },
    },
};
