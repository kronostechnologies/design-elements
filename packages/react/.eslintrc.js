module.exports = {
    extends: [
        '@equisoft/eslint-config-typescript-react',
        'plugin:import/typescript',
    ],
    rules: {
        'import/no-extraneous-dependencies': ['error',
            { devDependencies: ['src/**/*.test.{ts,tsx}', 'src/test-utils/**/*', 'test/**/*'] },
        ],
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: [
                    './tsconfig.json',
                    './tsconfig.test.json',
                ],
            },
        },
    },
};
