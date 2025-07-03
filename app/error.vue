<template>
  <NuxtLayout name="landing">
    <div>
      <!-- 页面头部 -->
      <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div class="py-8 px-4 sm:px-6 lg:px-8 text-center mx-auto">
          <div class="mt-2 max-w-4xl text-center mx-auto">
            <h1 class="block font-bold text-gray-800 text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Page Not Found
            </h1>
            <p class="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved
            </p>
          </div>
        </div>
      </div>

      <!-- 错误内容区域 -->
      <div class="bg-gray-50 py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
              <!-- 404 大数字 -->
              <div class="mb-8">
                <h2 class="text-8xl sm:text-9xl font-bold text-blue-600 mb-4">
                  {{ error?.statusCode || 404 }}
                </h2>
                <div class="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
              </div>

              <!-- 错误信息 -->
              <div class="mb-12">
                <h3 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                  Oops! Page not found
                </h3>
                <p class="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
                  The page you're looking for might have been moved, deleted, or you entered the wrong URL.
                  Don't worry, let's get you back on track!
                </p>
              </div>

              <!-- 导航选项 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <!-- 首页 -->
                <NuxtLink
                  to="/"
                  class="group bg-blue-50 hover:bg-blue-100 rounded-lg p-6 transition-all duration-200 hover:shadow-md border border-blue-200"
                >
                  <div class="text-blue-600 mb-4">
                    <svg
                      class="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Home Page
                  </h4>
                  <p class="text-sm text-gray-600 mt-2">
                    Return to our homepage
                  </p>
                </NuxtLink>

                <!-- 印章制作工具 -->
                <NuxtLink
                  to="/stamp-maker"
                  class="group bg-green-50 hover:bg-green-100 rounded-lg p-6 transition-all duration-200 hover:shadow-md border border-green-200"
                >
                  <div class="text-green-600 mb-4">
                    <svg
                      class="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M7 17l-2-2M15 7l-2-2"
                      />
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    Stamp Maker
                  </h4>
                  <p class="text-sm text-gray-600 mt-2">
                    Create custom stamps online
                  </p>
                </NuxtLink>

                <!-- 模板库 -->
                <NuxtLink
                  to="/stamp-template"
                  class="group bg-purple-50 hover:bg-purple-100 rounded-lg p-6 transition-all duration-200 hover:shadow-md border border-purple-200"
                >
                  <div class="text-purple-600 mb-4">
                    <svg
                      class="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Templates
                  </h4>
                  <p class="text-sm text-gray-600 mt-2">
                    Browse stamp templates
                  </p>
                </NuxtLink>
              </div>

              <!-- 主要操作按钮 -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <NuxtLink
                  to="/"
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </NuxtLink>

                <button
                  class="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  @click="$router.go(-1)"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  Go Back
                </button>
              </div>

              <!-- 帮助信息 -->
              <div class="mt-12 pt-8 border-t border-gray-200">
                <p class="text-sm text-gray-500 mb-4">
                  Need help? Here are some popular pages:
                </p>
                <div class="flex flex-wrap justify-center gap-4 text-sm">
                  <NuxtLink to="/stamp-maker" class="text-blue-600 hover:text-blue-800 hover:underline">
                    Online Stamp Maker
                  </NuxtLink>
                  <NuxtLink to="/pdf-editor" class="text-blue-600 hover:text-blue-800 hover:underline">
                    PDF Editor
                  </NuxtLink>
                  <NuxtLink to="/blog" class="text-blue-600 hover:text-blue-800 hover:underline">
                    Blog & Tips
                  </NuxtLink>
                  <NuxtLink to="/user-agreement" class="text-blue-600 hover:text-blue-800 hover:underline">
                    User Agreement
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// 定义页面属性
definePageMeta({
  layout: false,
})

// 接收错误对象
const props = defineProps({
  error: Object,
})

// SEO Meta
useSeoMeta({
  title: `Page Not Found (${props.error?.statusCode || 404}) | Stampdy`,
  description: 'The page you\'re looking for doesn\'t exist. Explore our online stamp maker, templates, and PDF editor tools.',
  ogTitle: `Page Not Found (${props.error?.statusCode || 404}) | Stampdy`,
  ogDescription: 'The page you\'re looking for doesn\'t exist. Explore our online stamp maker, templates, and PDF editor tools.',
  ogType: 'website',
  ogUrl: `https://stampdy.com/error/${props.error?.statusCode || 404}`,
  ogImage: 'https://stampdy.com/og-stampdy.png',
  ogImageAlt: `Page Not Found - Stampdy`,
  ogSiteName: 'Stampdy.com',
  ogImageWidth: 2042,
  ogImageHeight: 1107,
  ogImageType: 'image/png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://stampdy.com/og-stampdy.png',
})

// Schema.org
useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': `Page Not Found (${props.error?.statusCode || 404}) | Stampdy`,
    'description': 'The page you\'re looking for doesn\'t exist. Explore our online stamp maker, templates, and PDF editor tools.',
    'url': `https://stampdy.com/error/${props.error?.statusCode || 404}`,
    'inLanguage': 'en_US',
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Stampdy.com',
      'url': 'https://stampdy.com',
    },
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
          'name': `Error ${props.error?.statusCode || 404}`,
          'item': `https://stampdy.com/error/${props.error?.statusCode || 404}`,
        },
      ],
    },
  },
])
</script>

<style scoped>
/* 卡片悬停效果 */
.group:hover {
  transform: translateY(-2px);
}

/* 按钮动画 */
button, a {
  transition: all 0.2s ease;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .grid-cols-1 {
    gap: 1rem;
  }
}
</style>
