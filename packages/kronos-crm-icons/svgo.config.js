module.exports = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    convertColors: {
                        currentColor: true,
                    },
                    removeViewBox: false,
                },
            },
        },
        {
            name: 'removeDimensions',
        },
    ],
};
