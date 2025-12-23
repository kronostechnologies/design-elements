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
    restoreMocks: true,
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
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts', 'jest-extended/all'],
    snapshotResolver: '<rootDir>/test/snapshot-resolver.js',
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
