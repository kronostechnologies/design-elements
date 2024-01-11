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
        {
            files: ['*.tsx'],
            rules: {
                indent: 'off', // buggy and conflicting with react/jsx-indent
            },
        },
    ],
    rules: {
        'linebreak-style': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'off',
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
