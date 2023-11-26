import ts from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

import pkg from './package.json'

const banner = `
/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} Lachlan Miller
 * Released under the MIT License
 */
`

function createEntry(options) {
  const { format, input, isBrowser } = options

  const isEsmBrowser = format === 'es' && isBrowser

  const config = {
    input,
    external: [
      'docuejs',
      isEsmBrowser
        ? '@docue/compiler-dom/dist/compiler-dom.esm-browser'
        : '@docue/compiler-dom',
      isEsmBrowser
        ? '@docue/server-renderer/dist/compiler-dom.esm-browser'
        : '@docue/server-renderer'
    ],
    plugins: [
      replace({
        values: {
          'process.env.NODE_ENV': 'true',
          __BROWSER__: isEsmBrowser,
          __USE_PREFIX_IDENTIFIERS__: isEsmBrowser || format === 'cjs'
        },
        preventAssignment: true
      }),
      resolve(),
      commonjs(),
      json()
    ],
    output: {
      banner,
      name: 'DocueTestUtils',
      file: 'dist/docue-test-utils.browser.js',
      format,
      globals: {
        docuejs: 'Docue',
        '@docue/compiler-dom': 'DocueCompilerDOM',
        '@docue/server-renderer': 'DocueServerRenderer'
      }
    }
  }

  if (format === 'es') {
    config.output.file = pkg.module
    if (isBrowser) {
      config.output.file = 'dist/docue-test-utils.esm-browser.js'
    }
  }
  if (format === 'cjs') {
    config.output.file = pkg.main
  }
  console.log(`Building ${format}: ${config.output.file}`)

  config.plugins.push(
    ts({
      include: ['src/**/*.ts', 'types/**/*.d.ts'],
      compilerOptions: {
        declaration: format === 'es',
        target: 'es5', // not sure what this should be?
        module: format === 'cjs' ? 'es2015' : 'esnext'
      }
    })
  )

  return config
}

export default [
  createEntry({ format: 'es', input: 'src/index.ts', isBrowser: false }),
  createEntry({ format: 'es', input: 'src/index.ts', isBrowser: true }),
  createEntry({ format: 'iife', input: 'src/index.ts', isBrowser: true }),
  createEntry({ format: 'cjs', input: 'src/index.ts', isBrowser: false })
]
