// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@element-plus/nuxt',
    'nuxt-svgo-loader',
    '@nuxt/content',
  ],
  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: '/p5.min.js',
          defer: true,
        },

      ],
    },
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/nprogress.css', // 添加 NProgress 样式
  ],
  content: {
    build: {
      markdown: {
        rehypePlugins: {
          // 完全禁用这个插件
          'rehype-external-links': false,
        },
      },
    },
  },

  ui: {
    fonts: false,
    colorMode: false,
  },
  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_APP_URL,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      priceId: process.env.STRIPE_ONE_TIME_PRICE_ID,
    },
    mailjet: {
      apiKey: process.env.MAILJET_API_KEY,
      secretKey:
        process.env.MAILJET_SECRET_KEY,
      fromEmail: process.env.MAILJET_FROM_EMAIL || 'service@stampdy.com',
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
