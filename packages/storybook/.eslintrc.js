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
        'react-hooks/rules-of-hooks': 'off',
        'jsx-quotes': [2, 'prefer-double'],
        'storybook/prefer-pascal-case': 'error',
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
