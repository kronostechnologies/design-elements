module.exports = {
    moduleNameMapper: {
        '\\.svg': '<rootDir>/test/__mocks__/svg-mock.js',
    },
    roots: [
        '<rootDir>/test',
    ],
    setupFilesAfterEnv: ['<rootDir>test/setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
