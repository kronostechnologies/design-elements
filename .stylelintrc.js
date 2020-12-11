module.exports = {
    extends: [require.resolve('@equisoft/stylelint-config', { paths: [__dirname] })],
    rules: {
        // https://github.com/stylelint/stylelint/issues/4953
        // https://github.com/stylelint/stylelint/pull/4944
        'function-name-case': null,
        'no-extra-semicolons': null,
        'value-keyword-case': null,
    },
};
