module.exports = {
    extends: [require.resolve('@equisoft/stylelint-config', { paths: [__dirname] })],
    rules: {
        'custom-property-empty-line-before': null,
        'number-max-precision': 5,
        'order/order': null,
        'selector-class-pattern': null,
    },
};
