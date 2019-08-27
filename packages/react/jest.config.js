module.exports = {
    moduleNameMapper: {
        '\\.svg': '<rootDir>/test/mocks/svg-mock.js',
    },
    roots: [
        '<rootDir>/test',
    ],
    setupFilesAfterEnv: ['<rootDir>test/setup.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
};
