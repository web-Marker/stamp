// https://nuxt.com/docs/api/configuration/nuxt-config
import { blogMeta, blogTags } from './app/data/blog'

const locales = [
  'en',
]

const _templates = ['India seals',
  'Company seals',
  'Design seals',
  'Custom stamps',
  'Bank stamps',
  'Medical stamps',
  'Businness stamps',
  'Wedding stamps',
  'Justice stamps',
  'Notary stamps',
  'Library seal',
  'Rubber Stamp',
  'Government seal',
  'Corporate stamps',
  'Stamp received',
  'School stamp',
  'Text stamp',
  'Date stamp',
  'Logo stamp',
  'Red stamp',
  'Square seal',
  'Chinese seal',
  'Deposit only stamp',
  'Address stamp']
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@element-plus/nuxt',
    'nuxt-svgo-loader',
    '@nuxtjs/i18n',
    'nuxt-schema-org',
    '@nuxt/content',

  ],
  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      meta: [

        {
          name: 'author',
          content: 'The stamp dy team',
        },
        {
          name: 'copyright',
          content: 'stampdy.com',
        },

      ],
      link: [
        // {
        //   rel: 'canonical',
        //   href: 'https://domainhunt.site',
        // },
        {
          rel: 'image_src',
          href: 'https://stampdy.com/og-stampdy.png',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'shortcut icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
      script: [
        {
          src: '/polyfills.js',
          defer: true,
        },
        {
          src: '/docx.js',
          defer: true,
        },
        {
          src: '/jspdf.min.js',
          defer: true,
        },
        {
          src: '/p5.min.js',
          defer: true,
        },
        {
          src: `https://www.googletagmanager.com/gtag/js?id=G-SPT6210FEJ`,
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZNTKBZ6RBP');
          `,
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
      appName: process.env.NUXT_APP_NAME,
      isDev: process.env.NODE_ENV === 'development',
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

  experimental: {
    payloadExtraction: true, // 启用 payload 提取优化
  },
  compatibilityDate: '2024-07-30',
  nitro: {
    minify: true,
    prerender: {
      routes: ['/', '/stamp-maker', '/pdf-editor', '/pdf-view', '/user-agreement', '/privacy'],
      failOnError: false, // 避免预渲染错误导致构建失败
    },

    routeRules: {
      '/': { prerender: true, index: true }, // 明确预渲染首页
      '/blog/**': { prerender: true },
      '/**': {
        headers: {
          'Content-Security-Policy':
            'frame-ancestors \'self\' https://pay.google.com https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com;',
          'X-Frame-Options': 'SAMEORIGIN',
        },
      },
    },
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            '/docs/*',
          ],
        },
      },
    },
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    kv: true,
    database: true,
  },

  // vite: {
  //   esbuild: {
  //     drop:
  //       process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  //   },
  // },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },

  hooks: {
    'nitro:init': async (nitro) => {
      blogMeta.forEach((article) => {
        nitro.options.prerender.routes.push(`/blog/${article.slug}`)
      })
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
  i18n: {
    baseUrl: 'https://stampdy.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false,
    },
    trailingSlash: false,
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        language: 'en-US',
        dir: 'ltr',
        isCatchallLocale: true,
      },
    ],
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/components/editor/img',
    }],
  },
  sitemap: {
    xsl: process.env.NODE_ENV === 'production' ? false : '/__sitemap__/style.xsl',
    exclude: [
      '/api/**', // 排除API路径
    ],
    sitemapName: 'sitemap.xml',
    autoLastmod: true,
    autoI18n: false, // 禁用自动i18n集成，使用手动配置
    sitemapsPathPrefix: false, // 避免sitemap路径前缀干扰
    sitemaps: {
      'sitemap-general': {
        sitemapName: 'sitemap-general.xml',
        urls: () => {
          // 定义仅英文页面和多语言页面
          const englishOnlyPages = ['/stamp-template', '/pdf-view', '/user-agreement', '/privacy', '/blog']
          const multiLangPages = ['/', '/stamp-maker', '/pdf-editor']

          const navUrls: any = []

          // 处理仅英文页面
          englishOnlyPages.forEach((path) => {
            navUrls.push({
              loc: `https://stampdy.com${path}`,
              priority: 0.9,
              changefreq: 'monthly',
              lastmod: '2025-07-01T23:12:51+01:00',
            })
          })

          // 处理多语言页面
          multiLangPages.forEach((path) => {
            locales.forEach((locale) => {
              const currentUrl = locale === 'en' ? path : `/${locale}${path}`

              // 创建该页面所有语言版本的 alternatives
              const alternatives = locales.map(altLocale => ({
                hreflang: altLocale === 'en' ? 'x-default' : altLocale,
                href: `https://stampdy.com${
                  altLocale === 'en' ? path : `/${altLocale}${path}`
                }`,
              }))

              navUrls.push({
                loc: `https://stampdy.com${currentUrl}`,
                priority: path === '/' ? 1.0 : 0.9,
                changefreq: 'monthly',
                lastmod: '2025-07-01T23:12:51+01:00',
                alternatives: alternatives,
              })
            })
          })
          return navUrls
        },
      },
      'sitemap-blog': {
        sitemapName: 'sitemap-blog.xml',
        urls: () => {
          const blogUrls: any = []

          blogTags.forEach((tag) => {
            blogUrls.push({
              loc: `https://stampdy.com/blog/${tag}`,
              priority: 0.8,
              changefreq: 'weekly',
              lastmod: '2025-07-01T23:12:51+01:00',
            })
          })

          blogMeta.forEach((article) => {
            blogUrls.push({
              loc: `https://stampdy.com/blog/${article.slug}`,
              priority: 0.7,
              changefreq: 'weekly',
              lastmod: '2025-07-01T23:12:51+01:00',
            })
          })
          return blogUrls
        },
      },
      'sitemap-template': {
        sitemapName: 'sitemap-template.xml',
        urls: () => {
          const templateUrls: any = []
          _templates.forEach((template) => {
            templateUrls.push({
              loc: `https://stampdy.com/template/${template.toLowerCase().replace(/\s+/g, '-')}`,
              priority: 0.7,
              changefreq: 'weekly',
              lastmod: '2025-07-01T23:12:51+01:00',
            })
          })
          return templateUrls
        },
      },
    },
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
