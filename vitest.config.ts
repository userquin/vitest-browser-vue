/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

function noop() {}

const headless = !!process.env.HEADLESS
const provider = process.env.PROVIDER || 'webdriverio'

export default defineConfig({
  plugins: [
    Vue(),
    // {
    //   name: 'track-before',
    //   enforce: 'pre',
    //   resolveId(id) {
    //     console.log('track-before:resolveId', id)
    //   },
    //   load(id) {
    //     console.log('track-before:load', id)
    //   },
    //   transform(code, id) {
    //     if (id === 'vitest/utils' || id === '@vitest/utils')
    //       console.log('track-before:transform', id, code)
    //   },
    // },
    // {
    //   name: 'track-after',
    //   enforce: 'post',
    //   resolveId(id) {
    //     console.log('track-after:resolveId', id)
    //   },
    //   load(id) {
    //     console.log('track-after:load', id)
    //   },
    // },
  ],
  // TODO: remove this when browser package fixed
  optimizeDeps: {
    exclude: ['vitest', 'vitest/utils', 'vitest/browser', 'vitest/runners', '@vitest/utils'],
    include: [
      '@vitest/utils > concordance',
      '@vitest/utils > loupe',
      '@vitest/utils > pretty-format',
      'vitest > chai',
    ],
  },
  test: {
    include: ['test/basic.test.ts'],
    browser: {
      enabled: true,
      name: 'chrome',
      headless,
      provider,
    },
    open: !headless,
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
