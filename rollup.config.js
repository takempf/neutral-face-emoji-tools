import commonjs from '@rollup/plugin-commonjs';
import css from "rollup-plugin-import-css";
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

const config = {
  input: 'src/content.js',
  output: {
    file: 'dist/content.js',
    format: 'iife'
  },
  plugins: [
    css({inject: true}),
    svelte({compilerOptions: {dev: true}}),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
  ]
};

export default config;
