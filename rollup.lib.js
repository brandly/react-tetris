import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/js/components/tetris.tsx',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  external: ['react', 'react-dom'],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-external-helpers']
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
