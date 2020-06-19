import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/js/components/tetris.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  name: 'Tetris',
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-external-helpers', 'lodash']
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs({
      ignore: ['react', 'react-dom']
    }),
    globals(),
    builtins()
  ]
};
