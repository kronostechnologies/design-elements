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
        'react/jsx-no-bind': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    }
};
