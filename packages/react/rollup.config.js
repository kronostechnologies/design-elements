import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import svgr from '@svgr/rollup';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/design-elements-react.cjs.js',
        format: 'cjs',
    },
    external: [
        'react',
        'styled-components',
    ],
    plugins: [
        resolve({
            extensions: ['.js', '.jsx'],
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        svgr(),
    ],
};
