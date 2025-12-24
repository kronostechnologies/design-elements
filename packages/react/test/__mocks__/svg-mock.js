const path = require('path');

module.exports = {
    process(sourceText, sourcePath) {
        const filename = path.basename(sourcePath, '.svg');
        return {
            code: `module.exports = {
                __esModule: true,
                default: (props) => ({
                    $$typeof: Symbol.for('react.element'),
                    type: 'svg',
                    props: { ...props, 'icon-name': '${filename}' },
                    key: null,
                    ref: null,
                 })
            };`,
        };
    },
};
