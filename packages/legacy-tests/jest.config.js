const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    reporters: [
        'default',
        process.env.CI === 'true' && 'github-actions',
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
    ].filter(Boolean),

    collectCoverage: false,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    errorOnDeprecated: true,
    moduleDirectories: [
        'src',
        'node_modules',
    ],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/test/__mocks__/svg-mock.js',
        '\\.s?css': '<rootDir>/test/__mocks__/style-mock.js',
        ...pathsToModuleNameMapper(compilerOptions.paths || [], { prefix: '<rootDir>/test' }),
    },
    roots: [
        '<rootDir>/src',
    ],
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    snapshotResolver: '<rootDir>/test/snapshot-resolver.js',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: ['**/*.test.{ts,tsx}'],
    transform: {
        '\\.m?[t]sx?$': ['@swc/jest', {
            jsc: {
                transform: {
                    react: {
                        runtime: 'automatic',
                    },
                },
            },
        },
        ],
    },
};
