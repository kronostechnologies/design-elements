const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: 'build/jest/',
                outputName: 'junit.xml',
                suiteNameTemplate: '{filepath}',
                classNameTemplate: '{classname}',
                titleTemplate: '{title}',
            },
        ],
    ],

    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: 'build/jest/coverage',
    coveragePathIgnorePatterns: [
        '.+\\.d\\.ts$',
    ],
    coverageProvider: 'v8',
    coverageReporters: [
        // Supported reporters: https://istanbul.js.org/docs/advanced/alternative-reporters/
        'text',
        'html',
        'clover', // ADR-05
    ],

    clearMocks: true,
    resetMocks: true,
    errorOnDeprecated: true,
    moduleDirectories: [
        'src',
        'node_modules',
    ],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/test/__mocks__/svg-mock.js',
        '\\.s?css': '<rootDir>/test/__mocks__/style-mock.js',
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
            tsconfig: path.resolve(__dirname, 'tsconfig.test.json'),
        },
    },
};
