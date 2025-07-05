import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  splitting: false,
  sourcemap: false,
  clean: true,
  skipNodeModulesBundle: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime' // Add this
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";', // Add client directive to built files
    };
  }
});