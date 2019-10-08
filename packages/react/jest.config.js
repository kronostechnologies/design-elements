module.exports = {
    moduleNameMapper: {
        '\\.svg': '<rootDir>/test/__mocks__/svg-mock.js',
    },
    roots: [
        '<rootDir>/src/components',
    ],
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    snapshotResolver: '<rootDir>/test/snapshot-resolver.js',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
