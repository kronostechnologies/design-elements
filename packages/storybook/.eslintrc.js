module.exports = {
    extends: [
        '@equisoft/eslint-config-typescript-react',
        'plugin:import/typescript',
        'plugin:storybook/recommended',
    ],
    overrides: [
        {
            files: ['*.stories.tsx'],
            rules: {
                'import/no-default-export': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
            },
        },
    ],
    rules: {
        'linebreak-style': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: [
                    './tsconfig.json',
                ],
            },
        },
    },
};
