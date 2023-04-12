/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

function noop() {}

export default defineConfig({
  plugins: [
    Vue(),
    {
      name: 'track-before',
      enforce: 'pre',
      resolveId(id) {
        console.log('track-before:resolveId', id)
      },
      load(id) {
        console.log('track-before:load', id)
      },
      transform(code, id) {
        if (id === 'vitest/utils' || id === '@vitest/utils')
          console.log('track-before:transform', id, code)
      },
    },
    {
      name: 'track-after',
      enforce: 'post',
      resolveId(id) {
        console.log('track-after:resolveId', id)
      },
      load(id) {
        console.log('track-after:load', id)
      },
    },
  ],
  /* resolve: {
    alias: {
      'vitest/utils': `${resolve(__dirname, './node_modules/vitest/dist/utils.js').replace(/\\/g, '/')}`,
      '@vitest/utils': `file:///${resolve(__dirname, './node_modules/@vitest/utils/dist/index.js').replace(/\\/g, '/')}`,
    },
  }, */
  optimizeDeps: {
    exclude: ['vitest/utils'],
    include: ['@vitest/utils', 'vitest/browser'],
  },
  test: {
    include: ['test/basic.test.ts'],
    browser: {
      enabled: true,
      name: 'chrome',
      headless: false,
      provider: 'webdriverio',
    },
    open: true,
    isolate: false,
    outputFile: './browser.json',
    reporters: ['json', {
      onInit: noop,
      onPathsCollected: noop,
      onCollected: noop,
      onFinished: noop,
      onTaskUpdate: noop,
      onTestRemoved: noop,
      onWatcherStart: noop,
      onWatcherRerun: noop,
      onServerRestart: noop,
      onUserConsoleLog: noop,
    }, 'default'],
    // globals: true,
    // environment: 'jsdom',
  },
})
