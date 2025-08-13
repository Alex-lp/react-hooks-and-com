const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const esbuild = require('rollup-plugin-esbuild').default;
const { dts } = require('rollup-plugin-dts');

module.exports = [
  {
    input: 'src/lib/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      esbuild({
        include: ['src/lib/**/*'],
        exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        sourceMap: true,
        minify: false,
        target: 'es2020'
      }),
    ],
  },
  {
    input: 'src/lib/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    external: ['react', 'react-dom'],
    plugins: [dts()],
  },
]; 