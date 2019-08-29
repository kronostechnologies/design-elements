import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import svgr from '@svgr/rollup';
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/index.ts',
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
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        }),
        svgr({ icon: true }),
        typescript(),
    ],
};
