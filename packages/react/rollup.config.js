import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/design-elements-react.cjs.js',
        format: 'cjs'
    },
    external: [
        'react',
        'prop-types'
    ],
    plugins: [
        resolve(),
        babel({
          exclude: 'node_modules/**'
        })
    ]
};
