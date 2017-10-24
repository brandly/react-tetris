import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/main.js',
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
    commonjs(),
    globals(),
    builtins()
  ]
};
