<template>
  <div>
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
        <div class="mt-2 max-w-5xl text-center mx-auto ">
          <h1 class="block font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  leading-tight">
            Tips for Create Stamps Online — StampDy
          </h1>
        </div>
      <!-- End Title -->
      </div>
    </div>
    <div class="w-full pt-8 px-4 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="tag in tags"
          :key="tag.name"
          class="group cursor-pointer"
          @click="navigateToTag(tag.path)"
        >
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h2 class="text-xl font-semibold text-blue-800 transition-colors underline underline-offset-5 whitespace-nowrap mx-auto">
                {{ tag.name }}
              </h2>
              <svg
                class="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

const { data: articles } = useAsyncData(route.path, () =>
  queryCollection('blog')
    .select('meta')
    .all(),
)

useSeoMeta({
  title: 'Create and Customize Rubber Stamps Online | StampDy Blog',
  description: 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
  ogTitle: 'Create and Customize Rubber Stamps Online | StampDy Blog',
  ogDescription: 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: 'Create and Customize Rubber Stamps Online | StampDy Blog',
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: 'https://stampdy.com/blog',
  ogType: 'website',
  ogLocale: 'en_US',
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Create and Customize Rubber Stamps Online | StampDy Blog',
  twitterDescription: 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: 'Create and Customize Rubber Stamps Online | StampDy Blog',
    type: 'image/png',
  },
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Create and Customize Rubber Stamps Online | StampDy Blog',
    'description': 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
    'url': 'https://stampdy.com/blog',
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
      ],
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Stampdy.com',
      'url': 'https://stampdy.com',
    },
  },
  {
    '@type': 'Blog',
    'name': 'Create and Customize Rubber Stamps Online | StampDy Blog',
    'description': 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
    'url': 'https://stampdy.com/blog',
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
      'name': 'Create and Customize Rubber Stamps Online',
      'description': 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
    },
  },
  {
    '@type': 'CollectionPage',
    'name': 'Create and Customize Rubber Stamps Online | StampDy Blog',
    'description': 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
    'url': 'https://stampdy.com/blog',
    'inLanguage': 'en_US',
    'mainEntity': {
      '@type': 'ItemList',
      'name': 'Blog Articles',
      'description': 'Helpful articles about stamp creation and design',
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Stampdy.com',
      'url': 'https://stampdy.com',
    },
  },
  {
    '@type': 'Organization',
    'name': 'Stampdy',
    'url': 'https://stampdy.com',
    'description': 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://stampdy.com/og-stampdy.png',
      'width': 2042,
      'height': 1107,
    },
    'sameAs': [
      'https://stampdy.com',
      'https://stampdy.com/blog',
      'https://stampdy.com/stamp-maker',
      'https://stampdy.com/stamp-template',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'areaServed': 'Worldwide',
      'availableLanguage': 'English',
    },
  },
  {
    '@type': 'WebSite',
    'name': 'Stampdy Blog',
    'description': 'Explore expert tips and insights on how to create, design, and order rubber stamps online. From DIY stamp makers to seal design tools — learn it all at StampDy Blog',
    'url': 'https://stampdy.com/blog',
    'inLanguage': 'en_US',
    'publisher': {
      '@type': 'Organization',
      'name': 'Stampdy.com',
      'url': 'https://stampdy.com',
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://stampdy.com/blog/{search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Business owners, Designers, Professionals, Students',
    },
  },
])

// 统计标签和文章数量
const tags = computed(() => {
  if (!articles.value) return []

  const tagCounts = new Map()

  articles.value.forEach((article: any) => {
    if (article.meta?.tag) {
      const tagName = article.meta.tag
      const currentCount = tagCounts.get(tagName)?.count || 0

      tagCounts.set(tagName, {
        name: tagName,
        path: article.meta.routePa,
        count: currentCount + 1,
      })
    }
  })

  return Array.from(tagCounts.values()).sort((a, b) => b.count - a.count)
})

// 导航到标签页面
const navigateToTag = (tagName: string) => {
  navigateTo(`/blog/${encodeURIComponent(tagName)}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
