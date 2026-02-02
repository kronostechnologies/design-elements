module.exports = {
    extends: [
        '@equisoft/eslint-config-typescript-react',
        'plugin:import/typescript',
    ],
    rules: {
        'import/no-extraneous-dependencies': ['error',
            { devDependencies: ['src/**/*.test.{ts,tsx}', 'src/test-utils/**/*', 'test/**/*'] },
        ],
        'linebreak-style': 'off',
        'react/display-name': ['error', { ignoreTranspilerName: true }],
        'react/jsx-no-bind': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    overrides: [
        {
            files: ['*.tsx'],
            rules: {
                indent: 'off', // buggy and conflicting with react/jsx-indent
            },
        },
        {
            files: ['src/test-utils/**/*', '**/*.{test,spec}.*'],
            rules: {
                'react/display-name': 'off',
            },
        },
    ],
};
