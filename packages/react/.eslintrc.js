module.exports = {
    extends: [
        '@equisoft/eslint-config-typescript-react',
        'plugin:import/typescript',
    ],
    rules: {
        'import/no-unresolved': ['error', { ignore: ['^@design-elements'] }],
        'import/no-extraneous-dependencies': ['error',
            { devDependencies: ['src/**/*.test.{ts,tsx}', 'src/test-utils/**/*'] },
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
