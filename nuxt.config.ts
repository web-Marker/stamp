import { addVitePlugin } from '@nuxt/kit'
import babel from 'vite-plugin-babel'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@element-plus/nuxt',
    'nuxt-svgo-loader',
    () => {
      addVitePlugin({
        ...babel({
          filter: /\.[jt]s$/,
          babelConfig: {
            babelrc: false,
            configFile: false,
            plugins: [
              ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
              '@babel/plugin-transform-class-properties',
            ],
            assumptions: {
              setPublicClassFields: true,
            },
          },
        }),
        enforce: undefined, // 确保在esbuild编译ts后执行转换
      })
    },
  ],
  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js',
          defer: true,
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
    colorMode: false,
  },
  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
    },
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {},

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/components/editor/img',
    }],
  },
  svgoLoader: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
              cleanupIds: {
                minify: false,
              },
            },
          },
        },
        // 'removeDimensions',
      ],
    },
  },

})
