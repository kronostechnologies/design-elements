module.exports = {
    extends: ['@commitlint/config-conventional'],
    ignores: [(message) => /^chore\(.+\): bump [^ ]+ from [^ ]+ to [^ ]+$/m.test(message)],
    rules: {
        'scope-case': [2, 'always', ['lower-case', 'pascal-case', 'camel-case']],
    },
};
