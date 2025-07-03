<template>
  <!-- 标签页面 -->
  <div v-if="isTagPage" class="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
    <div class="max-w-4xl mx-auto">
      <!-- 面包屑导航 -->
      <nav class="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 font-medium">
        <NuxtLink to="/blog" class="hover:text-blue-600 transition-colors truncate">Blog</NuxtLink>
        <span>/</span>
        <span class="text-gray-900 truncate">{{ currentSlug }}</span>
      </nav>

      <!-- 标签标题 -->
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2 sm:px-0">
          {{ currentSlug }}
        </h1>
      </div>

      <!-- 文章列表 -->
      <div v-if="tagArticles && tagArticles.length > 0" class="space-y-4 sm:space-y-6 lg:space-y-8">
        <article
          v-for="article in tagArticles"
          :key="article.path"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 border border-gray-200"
        >
          <!-- 标题 -->
          <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight mb-3">
            <NuxtLink
              :to="article.path"
              class="text-gray-900 hover:text-blue-600 transition-colors"
            >
              {{ article.title }}
            </NuxtLink>
          </h2>

          <p v-if="article.description" class="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base leading-relaxed">
            {{ article.description }}
          </p>

          <div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <!-- 时间和标签 -->
            <div class="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
              <time v-if="article.meta?.createdAt" :datetime="article.meta.createdAt as string" class="shrink-0 font-medium">
                {{ formatDate(article.meta.createdAt as string) }}
              </time>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium shrink-0">
                {{ article.meta?.tag }}
              </span>
            </div>

            <!-- Read more 按钮 -->
            <NuxtLink
              :to="article.path"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base font-medium shrink-0 self-start sm:self-auto"
            >
              Read more
              <svg
                class="ml-1 w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- 没有文章时的提示 -->
      <div v-else class="text-center py-8 sm:py-12 px-4">
        <div class="text-gray-400 mb-4">
          <svg
            class="mx-auto w-12 h-12 sm:w-16 sm:h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">
          No articles
        </h3>
        <p class="text-sm sm:text-base text-gray-500 mb-6">
          No articles, stay tuned
        </p>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
        >
          Browse other Stamp Blogs
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- 文章详情页面 -->
  <article v-else-if="article" class="min-h-screen bg-gray-50">
    <!-- 文章头部背景区域 -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto w-full px-3 sm:px-4 pt-6 sm:pt-8">
        <!-- 面包屑导航 -->
        <nav class="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto font-medium">
          <NuxtLink to="/blog" class="hover:text-blue-600 transition-colors font-medium whitespace-nowrap">Blog</NuxtLink>
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <NuxtLink
            v-if="article.meta?.tag"
            :to="`/blog/${encodeURIComponent(article.meta.routePa)}`"
            class="hover:text-blue-600 transition-colors font-medium whitespace-nowrap"
          >
            {{ article.meta.tag }}
          </NuxtLink>
          <svg
            v-if="article.meta?.tag"
            class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-gray-700 font-medium truncate">{{ article.meta?.fileName }}</span>
        </nav>

        <!-- 文章元信息 -->
        <div class="flex items-center justify-between mb-3 sm:mb-2 gap-3">
          <!-- 发布时间 -->
          <div class="flex items-center">
            <time v-if="article.meta?.createdAt" :datetime="article.meta.createdAt" class="text-gray-600 text-xs sm:text-sm font-medium">
              {{ formatDate(article.meta.createdAt) }}
            </time>
          </div>

          <!-- 标签 -->
          <div v-if="article.meta?.tag" class="flex items-center shrink-0">
            <NuxtLink
              :to="`/blog/${encodeURIComponent(article.meta.routePa)}`"
              class="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 mr-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span class="truncate">{{ article.meta.tag }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- 文章标题 -->
        <header class="text-center max-w-4xl mx-auto pb-4 sm:pb-6 mt-4">
          <h1 class="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight px-2 sm:px-0">
            {{ article.title }}
          </h1>
        </header>
      </div>
    </div>

    <!-- 文章内容区域 -->
    <div class="max-w-6xl mx-auto py-3 sm:py-4 px-3 sm:px-4">
      <!-- 文章正文 -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-6 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <div class="prose prose-sm sm:prose prose-lg prose-gray max-w-none">
            <ContentRenderer :value="article" />
          </div>
        </div>
      </div>
    </div>
  </article>

  <!-- 页面不存在 -->
  <div v-else class="container mx-auto px-3 sm:px-4 py-8">
    <div class="max-w-8xl mx-auto text-center">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Page not found
      </h1>
      <NuxtLink to="/blog" class="text-blue-600 hover:text-blue-800 text-sm sm:text-base">Back to blog home</NuxtLink>
    </div>
  </div>

  <Entry v-if="article?.meta?.showEntry" />
</template>

<script setup lang="ts">
const { locale } = useI18n()

if (locale.value !== 'en') {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const route = useRoute()
const currentSlug = decodeURIComponent(route.params.slug as string).replace(/-/g, ' ')
const originalSlug = route.params.slug as string

// 1. 先获取所有文章来确定可用的标签
const { data: allArticles } = await useAsyncData('all-blog-articles', () =>
  queryCollection('blog').select('meta').all(),
{
  server: true,
  default: () => [],
})

// 2. 获取所有可用的标签
const availableTags = computed(() => {
  if (!allArticles.value) return []
  const tags = new Set()
  allArticles.value.forEach((article: any) => {
    if (article.meta?.tag) {
      tags.add(article.meta.tag)
    }
  })
  return Array.from(tags)
})

// 3. 判断当前 slug 是标签还是文章
const isTagPage = computed(() => {
  return availableTags.value.includes(currentSlug)
})

// 4. 如果是标签页面，获取该标签下的文章
const { data: tagArticles } = await useAsyncData(
  `tag-${currentSlug}`,
  () => {
    if (!isTagPage.value) return null
    return queryCollection('blog').all().then(articles =>
      articles.filter((article: any) => article.meta?.tag === currentSlug),
    )
  },
  {
    server: true,
    default: () => [],
  },
)

// 5. 如果是文章页面，获取文章内容
const { data: article } = await useAsyncData(
  `article-${originalSlug}`,
  () => {
    if (isTagPage.value) return null
    console.log('🚀 ~ currentSlug:', originalSlug)

    // 尝试不同的路径格式
    return queryCollection('blog')
      .path(`/blog/${originalSlug}`) // 尝试完整路径
      .first()
  },
  {
    server: true,
    default: () => null,
  },
)

useSeoMeta({
  title: isTagPage.value ? `${currentSlug} Stamp Guides & Articles | StampDy Blog` : article.value ? article.value?.title : 'Page not found',
  description: isTagPage.value
    ? `Discover all tutorials, tips, and tricks about ${currentSlug} in our StampDy blog. Learn how to design, create, and customize stamps online with ease.`
    : article.value ? article.value?.description : 'Page not found',
  ogTitle: isTagPage.value ? `${currentSlug} Stamp Guides & Articles | StampDy Blog` : article.value ? article.value?.title : 'Page not found',
  ogDescription: isTagPage.value
    ? `Discover all tutorials, tips, and tricks about ${currentSlug} in our StampDy blog. Learn how to design, create, and customize stamps online with ease.`
    : article.value ? article.value?.description : 'Page not found',
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: isTagPage.value ? `${currentSlug} Stamp Guides & Articles | StampDy Blog` : article.value ? article.value?.title : 'Page not found',
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: isTagPage.value ? `https://stampdy.com/blog/${currentSlug}` : `https://stampdy.com/blog/${originalSlug}`,
  ogType: 'website',
  ogLocale: 'en_US',
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: isTagPage.value ? `${currentSlug} Stamp Guides & Articles | StampDy Blog` : article.value ? article.value?.title : 'Page not found',
  twitterDescription: isTagPage.value
    ? `Discover all tutorials, tips, and tricks about ${currentSlug} in our StampDy blog. Learn how to design, create, and customize stamps online with ease.`
    : article.value ? article.value?.description : 'Page not found',
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: isTagPage.value ? `${currentSlug} Stamp Guides & Articles | StampDy Blog` : article.value ? article.value?.title : 'Page not found',
    type: 'image/png',
  },
})

const schemaData = computed(() => {
  // 标签页面的 Schema
  if (isTagPage.value) {
    return [
      {
        '@type': 'WebPage',
        'name': `${currentSlug} Stamp Guides & Articles | StampDy Blog`,
        'description': `Discover all tutorials, tips, and tricks about ${currentSlug} in our StampDy blog. Learn how to design, create, and customize stamps online with ease.`,
        'url': `https://stampdy.com/blog/${originalSlug}`,
        'inLanguage': 'en_US',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://stampdy.com',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': 'https://stampdy.com/blog',
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': currentSlug,
              'item': `https://stampdy.com/blog/${originalSlug}`,
            },
          ],
        },
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
        },
      },
      {
        '@type': 'CollectionPage',
        'name': `${currentSlug} Articles Collection`,
        'description': `Complete collection of ${currentSlug.toLowerCase()} related articles and tutorials for stamp creation and design.`,
        'url': `https://stampdy.com/blog/${originalSlug}`,
        'inLanguage': 'en_US',
        'mainEntity': {
          '@type': 'ItemList',
          'name': `${currentSlug} Articles`,
          'description': `Articles about ${currentSlug.toLowerCase()} stamp design and creation`,
          'numberOfItems': tagArticles.value?.length || 0,
          'itemListElement': tagArticles.value?.map((article: any, index: number) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
              '@type': 'Article',
              'headline': article.title,
              'description': article.description,
              'url': `https://stampdy.com${article.path}`,
              'datePublished': article.meta?.createdAt,
              'author': {
                '@type': 'Organization',
                'name': 'Stampdy.com',
              },
            },
          })) || [],
        },
        'isPartOf': {
          '@type': 'Blog',
          'name': 'Stampdy Blog',
          'url': 'https://stampdy.com/blog',
        },
      },
      {
        '@type': 'Blog',
        'name': `${currentSlug} - Stampdy Blog`,
        'description': `Specialized content about ${currentSlug.toLowerCase()} in stamp design and creation. Expert tips and tutorials.`,
        'url': `https://stampdy.com/blog/${originalSlug}`,
        'inLanguage': 'en_US',
        'author': {
          '@type': 'Organization',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://stampdy.com/og-stampdy.png',
            'width': 2042,
            'height': 1107,
          },
        },
        'about': {
          '@type': 'Thing',
          'name': currentSlug,
          'description': `${currentSlug} related to stamp design and creation`,
        },
      },
    ]
  }

  // 文章详情页的 Schema
  if (article.value) {
    return [
      {
        '@type': 'WebPage',
        'name': article.value.title,
        'description': article.value.description,
        'url': `https://stampdy.com/blog/${originalSlug}`,
        'inLanguage': 'en_US',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://stampdy.com',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': 'https://stampdy.com/blog',
            },
            ...(article.value.meta?.tag
              ? [{
                  '@type': 'ListItem',
                  'position': 3,
                  'name': article.value.meta.tag,
                  'item': `https://stampdy.com/blog/${encodeURIComponent(article.value.meta.routePa)}`,
                }]
              : []),
            {
              '@type': 'ListItem',
              'position': article.value.meta?.tag ? 4 : 3,
              'name': article.value.title,
              'item': `https://stampdy.com/blog/${originalSlug}`,
            },
          ],
        },
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
        },
      },
      {
        '@type': 'Article',
        'headline': article.value.title,
        'description': article.value.description,
        'url': `https://stampdy.com/blog/${originalSlug}`,
        'datePublished': article.value.meta?.createdAt,
        'dateModified': article.value.meta?.updatedAt || article.value.meta?.createdAt,
        'author': {
          '@type': 'Organization',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://stampdy.com/og-stampdy.png',
            'width': 2042,
            'height': 1107,
          },
        },
        'image': {
          '@type': 'ImageObject',
          'url': 'https://stampdy.com/og-stampdy.png',
          'width': 2042,
          'height': 1107,
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://stampdy.com/blog/${originalSlug}`,
        },
        'articleSection': article.value.meta?.tag || 'Stamp Design',
        'keywords': [
          'stamp design',
          'online stamp maker',
          'custom stamps',
          article.value.meta?.tag,
          'rubber stamps',
          'seal creation',
        ].filter(Boolean),
        'wordCount': article.value.body?.children?.length * 50 || 500,
        'inLanguage': 'en_US',
      },
      {
        '@type': 'BlogPosting',
        'headline': article.value.title,
        'description': article.value.description,
        'url': `https://stampdy.com/blog/${originalSlug}`,
        'datePublished': article.value.meta?.createdAt,
        'dateModified': article.value.meta?.updatedAt || article.value.meta?.createdAt,
        'author': {
          '@type': 'Organization',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Stampdy.com',
          'url': 'https://stampdy.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://stampdy.com/og-stampdy.png',
            'width': 2042,
            'height': 1107,
          },
        },
        'image': {
          '@type': 'ImageObject',
          'url': 'https://stampdy.com/og-stampdy.png',
          'width': 2042,
          'height': 1107,
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://stampdy.com/blog/${originalSlug}`,
        },
        'isPartOf': {
          '@type': 'Blog',
          'name': 'Stampdy Blog',
          'url': 'https://stampdy.com/blog',
        },
        'about': {
          '@type': 'Thing',
          'name': 'Stamp Design',
          'description': 'Online stamp creation and design tutorials',
        },
      },
    ]
  }

  // 404 页面的 Schema
  return [
    {
      '@type': 'WebPage',
      'name': 'Page Not Found - Stampdy Blog',
      'description': 'The requested page could not be found. Please check the URL or browse our available content.',
      'url': `https://stampdy.com/blog/${originalSlug}`,
      'inLanguage': 'en_US',
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://stampdy.com',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blog',
            'item': 'https://stampdy.com/blog',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Page Not Found',
            'item': `https://stampdy.com/blog/${originalSlug}`,
          },
        ],
      },
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Stampdy.com',
        'url': 'https://stampdy.com',
      },
    },
  ]
})

useSchemaOrg(schemaData)

// 格式化日期
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
</script>

<style scoped>
/* 自定义 prose 样式 - 移动端优化版本 */
:deep(.prose) {
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: none;
  font-weight: 400;
}

:deep(.prose br) {
  display: none;
}

@media (min-width: 640px) {
  :deep(.prose) {
    font-size: 1.125rem;
  }
}

/* 标题样式 - 响应式 */
:deep(.prose h1) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-top: 0;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  :deep(.prose h1) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose h1) {
    font-size: 2.25rem;
  }
}

:deep(.prose h3) {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

@media (min-width: 640px) {
  :deep(.prose h3) {
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose h3) {
    font-size: 1.5rem;
    margin-top: 2.5rem;
  }
}

:deep(.prose h4) {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  :deep(.prose h4) {
    font-size: 1.125rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
}

:deep(.prose h5) {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  :deep(.prose h5) {
    font-size: 1rem;
  }
}

:deep(.prose h6) {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  :deep(.prose h6) {
    font-size: 0.95rem;
  }
}

/* 段落样式 */
:deep(.prose p) {
  margin-bottom: 0.3rem;
}

/* 引用块样式 - 移动端优化 */
:deep(.prose blockquote) {
  border-left: 3px solid #3b82f6;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0.375rem;
  font-style: italic;
  position: relative;
}

@media (min-width: 640px) {
  :deep(.prose blockquote) {
    border-left-width: 4px;
    padding: 1.25rem 1.5rem;
    margin: 1.75rem 0;
    border-radius: 0.5rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose blockquote) {
    padding: 1.5rem 2rem;
    margin: 1.5rem 0;
  }
}

:deep(.prose blockquote::before) {
  content: '"';
  font-size: 2.5rem;
  color: #3b82f6;
  position: absolute;
  top: -0.25rem;
  left: 0.75rem;
  opacity: 0.3;
}

@media (min-width: 640px) {
  :deep(.prose blockquote::before) {
    font-size: 3rem;
    top: -0.375rem;
    left: 1rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose blockquote::before) {
    font-size: 4rem;
    top: -0.5rem;
  }
}

:deep(.prose blockquote p) {
  margin-bottom: 0.75rem;
}

@media (min-width: 640px) {
  :deep(.prose blockquote p) {
    margin-bottom: 1rem;
  }
}

:deep(.prose blockquote p:last-child) {
  margin-bottom: 0;
}

/* 链接样式 */
:deep(.prose a) {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
  word-break: break-word;
}

:deep(.prose a:hover) {
  color: #1d4ed8;
  border-bottom-color: #3b82f6;
}

/* 列表样式 - 移动端优化 */
:deep(.prose ul) {
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

:deep(.prose ol) {
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

:deep(.prose li) {
  margin: 0.2rem 0;
}

:deep(.prose li p) {
  margin-bottom: 0.5rem;
}

/* 行内代码样式 */
:deep(.prose code) {
  background: #f1f5f9;
  color: #1e293b;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.85em;
  font-weight: 500;
  word-break: break-word;
}

/* 代码块样式 - 移动端优化 */
:deep(.prose pre) {
  background: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  overflow-x: auto;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 640px) {
  :deep(.prose pre) {
    font-size: 0.9rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose pre) {
    font-size: 1rem;
  }
}

:deep(.prose pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  word-break: normal;
}

/* 表格样式 - 移动端优化 */
:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: white;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 640px) {
  :deep(.prose table) {
    margin: 1.75rem 0;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    display: table;
    white-space: normal;
  }
}

@media (min-width: 1024px) {
  :deep(.prose table) {
    margin: 2rem 0;
    font-size: 1rem;
  }
}

:deep(.prose thead) {
  display: table-header-group;
}

:deep(.prose tbody) {
  display: table-row-group;
}

:deep(.prose tr) {
  display: table-row;
}

:deep(.prose th) {
  background: #f8fafc;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.8rem;
  display: table-cell;
}

@media (min-width: 640px) {
  :deep(.prose th) {
    padding: 0.875rem;
    font-size: 0.875rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose th) {
    padding: 1rem;
    font-size: 1rem;
  }
}

:deep(.prose td) {
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  display: table-cell;
}

@media (min-width: 640px) {
  :deep(.prose td) {
    padding: 0.875rem;
  }
}

@media (min-width: 1024px) {
  :deep(.prose td) {
    padding: 1rem;
  }
}

:deep(.prose tr:last-child td) {
  border-bottom: none;
}

/* 分隔线样式 */
:deep(.prose hr) {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0.5rem 0;
}

/* 强调文本样式 */
:deep(.prose strong) {
  font-weight: 600;
  color: #111827;
}

:deep(.prose em) {
  font-style: italic;
  color: #374151;
  font-size: 0.9rem;
}

/* 删除线文本样式 */
:deep(.prose del) {
  text-decoration: line-through;
  color: #6b7280;
}

/* 小文本样式 */
:deep(.prose small) {
  font-size: 0.875em;
  color: #6b7280;
}

/* 上标和下标样式 */
:deep(.prose sup),
:deep(.prose sub) {
  font-size: 0.75em;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

:deep(.prose sup) {
  top: -0.5em;
}

:deep(.prose sub) {
  bottom: -0.25em;
}

/* 键盘按键样式 */
:deep(.prose kbd) {
  background: #f3f4f6;
  color: #111827;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-weight: 500;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 2px #fff;
}

/* 标记文本样式 */
:deep(.prose mark) {
  background: #fef3c7;
  color: #92400e;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

/* 移动端特定样式 */
@media (max-width: 640px) {
  /* 确保长链接不会溢出 */
  :deep(.prose a) {
    word-break: break-word;
    hyphens: auto;
  }

  /* 代码块在移动端的水平滚动优化 */
  :deep(.prose pre) {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  /* 表格在移动端的处理 */
  :deep(.prose table) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  /* 长单词换行 */
  :deep(.prose p),
  :deep(.prose li) {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

}
</style>
