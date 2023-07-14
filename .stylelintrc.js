module.exports = {
    extends: [require.resolve('@equisoft/stylelint-config', { paths: [__dirname] })],
    rules: {
        'custom-property-empty-line-before': null,
        'number-max-precision': 6,
        'order/order': null,
        'selector-class-pattern': null,
    },
};
