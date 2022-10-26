module.exports = {
    extends: [require.resolve('@equisoft/stylelint-config', { paths: [__dirname] })],
    rules: {
        // https://github.com/stylelint/stylelint/issues/4953
        // https://github.com/stylelint/stylelint/pull/4944
        'custom-property-empty-line-before': null,
        'function-name-case': null,
        'no-extra-semicolons': null,
        'number-max-precision': 5,
        'order/order': null,
        'selector-class-pattern': null,
        'selector-type-no-unknown': [true, { 'ignoreTypes': ['/--styled-mixin/', '/^\\$\\w+/'] }],
        'value-keyword-case': null,
    },
};
