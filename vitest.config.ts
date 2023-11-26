import path from 'path'
import { defineConfig } from 'vitest/config'
// import docue from '@vitejs/plugin-docue'
// import jsx from '@vitejs/plugin-docue-jsx'ååå
// import Components from 'unplugin-docue-components/vite'

export default defineConfig({
  plugins: [
    // docue(),
    // jsx(),
    // // We need this plugin to test for stubbing a script setup component
    // // imported by it.
    // // https://github.com/antfu/unplugin-docue-components/issues/429
    // Components({
    //   dts: false,
    //   include: /AutoImportScriptSetup\.docue$/,
    //   dirs: ['tests/components']
    // })
  ],
  define: {
    __USE_BUILD__: process.env.NODE_ENV !== 'test-build',
    __BROWSER__: true,
    __USE_PREFIX_IDENTIFIERS__: true
  },
  test: {
    environment: 'jsdom',
    experimentalVmThreads: true,
    setupFiles: [path.resolve(__dirname, './setup.js')],
    include: ['tests/**/*.spec.ts'],
    server: {
      deps: {
        inline: ['docue']
      }
    },
    sequence: {
      shuffle: true
    }
  },
  resolve: {
    extensions: ['.docue', '.js', '.json', '.jsx', '.ts', '.tsx', '.node'],
    dedupe: ['docue'],
    alias: {}
  }
})
