module.exports = {
    extends: [
        '@equisoft/eslint-config-typescript-react',
        'plugin:import/typescript',
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
