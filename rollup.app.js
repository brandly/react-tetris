import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'app/main.js',
  output: {
    file: 'dist/main.js',
    format: 'iife'
  },
  name: 'Tetris',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement'
        ]
      }
    }),
    globals(),
    builtins()
  ]
};
