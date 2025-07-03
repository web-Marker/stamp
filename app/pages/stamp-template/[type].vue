<template>
  <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
    <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
      <div class="mt-2 max-w-5xl text-center mx-auto ">
        <h1 class="block font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  leading-tight">
          {{ displayStampType }} Templates
        </h1>
        <p class="mt-4 text-gray-600 text-base sm:text-lg">
          Free editable {{ displayStampType.toLowerCase() }} templates for online editing
        </p>
      </div>
      <!-- End Title -->
    </div>
  </div>

  <!-- 面包屑导航 -->
  <div class="w-full pt-4 px-6 max-w-7xl mx-auto">
    <nav class="flex items-center space-x-2 text-sm text-gray-500 font-semibold">
      <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Home</NuxtLink>
      <span>/</span>
      <NuxtLink to="/stamp-template" class="hover:text-blue-600 transition-colors">Stamp Templates</NuxtLink>
      <span>/</span>
      <span class="text-gray-800 font-medium">{{ displayStampType }}</span>
    </nav>
  </div>

  <!-- Stamp Types Navigation -->
  <div class="w-full pt-6 px-2 max-w-7xl mx-auto">
    <div class="max-w-8xl mx-auto">
      <div class="flex flex-wrap  gap-2 sm:gap-3 max-w-6xl mx-auto">
        <NuxtLink
          v-for="stampType in stampTypes"
          :key="stampType"
          :to="`/stamp-template/${stampType.toLowerCase().replace(/\s+/g, '-')}`"
          class="
              group
              inline-block
              px-4 py-2 sm:px-5 sm:py-3
              rounded-full
              font-medium text-sm sm:text-base
              cursor-pointer
              transition-all duration-200 ease-in-out
              hover:bg-blue-500 hover:text-white hover:shadow-md
              hover:scale-105 hover:-translate-y-0.5
              focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:outline-none
              active:scale-95 active:translate-y-0
              no-underline
              select-none
              touch-manipulation
              min-h-[44px]
              flex items-center justify-center
            "
          :class="stampType.toLowerCase().replace(/\s+/g, '-') === stampTypeParam
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-700'"
        >
          <span class="transition-transform duration-200 group-hover:scale-105 flex items-center gap-1">
            <span class="relative">
              {{ stampType }}
              <!-- 下划线效果 -->
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-200 group-hover:w-full" />
            </span>
            <!-- 外部链接图标 -->
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
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- 筛选结果统计 -->
  <div v-if="!loading && totalTemplates > 0" class="w-full pt-6 px-4 max-w-7xl mx-auto">
    <div class="text-center">
      <p class="text-gray-600">
        Found <span class="font-semibold text-blue-600">{{ totalTemplates }}</span>
        {{ displayStampType.toLowerCase() }} templates
      </p>
    </div>
  </div>

  <!-- 印章模板展示 -->
  <div class="w-full py-8 px-4 max-w-7xl mx-auto">
    <div class="max-w-8xl mx-auto">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-32">
        <div class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p class="text-gray-600 text-sm">
            Loading {{ displayStampType.toLowerCase() }} templates...
          </p>
        </div>
      </div>

      <!-- 模板列表 -->
      <div v-else-if="currentPageTemplates.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <div
          v-for="template in currentPageTemplates"
          :key="template.id"
          class="bg-white rounded-lg shadow-md px-4 py-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow"
        >
          <div class="text-center text-sm lg:text-base font-semibold line-clamp-2 overflow-hidden text-ellipsis px-2 lg:px-0">
            {{ template.name }}
          </div>
          <img
            v-if="template.image"
            :src="template.image"
            :alt="template.alt"
            :title="template.title"
            class="w-full h-auto rounded-lg"
          >
          <UButton
            color="primary"
            variant="solid"
            size="sm"
            class="size-fit text-xs lg:text-sm px-4 lg:px-6 py-2 lg:py-2.5 font-semibold cursor-pointer"
            @click="openEditor(template)"
          >
            Edit This Template
          </UButton>
        </div>
      </div>

      <!-- 没有找到模板时的提示 -->
      <div v-else-if="!loading" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <svg
            class="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p class="text-gray-500 mb-6">
            We couldn't find any {{ displayStampType.toLowerCase() }} templates at the moment.
          </p>
          <NuxtLink
            to="/stamp-template"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Templates
          </NuxtLink>
        </div>
      </div>

      <!-- 分页组件 -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-12 gap-2">
        <!-- 上一页按钮 -->
        <button
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>

        <!-- 页码按钮 -->
        <div class="flex gap-1">
          <button
            v-for="page in displayPages"
            :key="page"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md',
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <!-- 下一页按钮 -->
        <button
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>

      <!-- 分页信息 -->
      <div v-if="!loading && totalTemplates > 0" class="text-center mt-4 text-sm text-gray-600">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalTemplates) }} of {{ totalTemplates }} {{ displayStampType.toLowerCase() }} templates
      </div>
    </div>
  </div>

  <!-- 编辑器模态框 -->
  <div
    v-show="showEditor"
    class="fixed inset-0 z-50 bg-black/60 "
    @click="closeEditor"
  >
    <!-- 模态框内容 -->
    <div class="relative min-h-screen flex items-center justify-center p-4 overflow-y-auto">
      <div class="relative bg-white rounded-lg shadow-xl max-w-7xl w-full h-[95vh] max-h-[850px] overflow-hidden" @click.stop>
        <!-- 模态框头部 -->
        <div class="flex items-center justify-end p-1">
          <!-- 关闭按钮 -->
          <button
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close"
            @click="closeEditor"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- 编辑器内容区域 -->
        <div class="h-[calc(100%-60px)] overflow-auto">
          <Editor
            ref="editor"
          />
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

// 获取路由参数
const route = useRoute()
const stampTypeParam = route.params.type as string

// 定义所有印章类型
const stampTypes = [
  'India seals', 'Company seals', 'Design seals', 'Custom stamps',
  'Bank stamps', 'Medical stamps', 'Businness stamps', 'Wedding stamps',
  'Justice stamps', 'Notary stamps', 'Library seal', 'Rubber Stamp',
  'Government seal', 'Corporate stamps', 'Stamp received', 'School stamp',
  'Text stamp', 'Date stamp', 'Logo stamp', 'Red stamp', 'Square seal',
  'Chinese seal', 'Deposit only stamp', 'Address stamp',
]

// 将URL参数转换回显示名称 (india-seals -> India seals)
const displayStampType = computed(() => {
  return stampTypeParam
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// 路由相关
const router = useRouter()

// 响应式每页数量
const itemsPerPage = ref(12)

// 获取当前页码
const currentPage = computed(() => {
  const page = parseInt(route.query.page as string) || 1
  return Math.max(1, page)
})

// 所有模板文件（非eager加载）
const templateGlob = import.meta.glob('@/components/editor/templates/*.json')
const imageGlob = import.meta.glob('@/components/editor/templates/*.png', { query: '?url' })

// 过滤后的模板key
const filteredTemplateKeys = ref<string[]>([])
const totalTemplates = computed(() => filteredTemplateKeys.value.length)

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(totalTemplates.value / itemsPerPage.value)
})

useSeoMeta({
  title: `${displayStampType.value} Stamp Templates – Free Online Editor | Stampdy`,
  description: `Browse free and editable ${displayStampType.value.toLowerCase()} stamp templates. Use our online stamp maker to customize, preview, and edit directly in your browser.`,
  ogTitle: `${displayStampType.value} Stamp Templates – Free Online Editor | Stampdy`,
  ogDescription: `Browse free and editable ${displayStampType.value.toLowerCase()} stamp templates. Use our online stamp maker to customize, preview, and edit directly in your browser.`,
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: `${displayStampType.value} Stamp Templates – Free Online Editor | Stampdy`,
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: `https://stampdy.com/stamp-template/${displayStampType.value.toLowerCase().replace(/\s+/g, '-')}`,
  ogType: 'website',
  ogLocale: 'en_US',
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: `${displayStampType.value} Stamp Templates – Free Online Editor | Stampdy`,
  twitterDescription: `Browse free and editable ${displayStampType.value.toLowerCase()} stamp templates. Use our online stamp maker to customize, preview, and edit directly in your browser.`,
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: `${displayStampType.value} Stamp Templates – Free Online Editor | Stampdy`,
    type: 'image/png',
  },
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': `${displayStampType.value} Stamp Templates – Free Online Editor | Stampdy`,
    'description': `Browse free and editable ${displayStampType.value.toLowerCase()} stamp templates. Use our online stamp maker to customize, preview, and edit directly in your browser.`,
    'url': `https://stampdy.com/stamp-template/${displayStampType.value.toLowerCase().replace(/\s+/g, '-')}`,
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
          'name': 'Stamp Templates',
          'item': 'https://stampdy.com/stamp-template',
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': `${displayStampType.value} Stamp Templates`,
          'item': `https://stampdy.com/stamp-template/${displayStampType.value.toLowerCase().replace(/\s+/g, '-')}`,
        },
      ],
    },
  },
  {
    '@type': 'CollectionPage',
    'name': `${displayStampType.value} Templates Collection`,
    'description': `Professional ${displayStampType.value.toLowerCase()} templates for business and personal use. All templates are free to edit, customize, and download.`,
    'url': `https://stampdy.com/stamp-template/${displayStampType.value.toLowerCase().replace(/\s+/g, '-')}`,
    'inLanguage': 'en_US',
    'mainEntity': {
      '@type': 'ItemList',
      'name': `${displayStampType.value} Templates`,
      'description': `Collection of professional ${displayStampType.value.toLowerCase()} templates`,
      'numberOfItems': totalTemplates.value,
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Stampdy.com',
      'url': 'https://stampdy.com',
    },
  },
  {
    '@type': 'Product',
    'name': `${displayStampType.value} Template Collection`,
    'description': `Professional ${displayStampType.value.toLowerCase()} templates including editable designs for business, official, and personal use. Easy to customize and download.`,
    'category': `${displayStampType.value} Templates`,
    'brand': {
      '@type': 'Brand',
      'name': 'Stampdy',
    },
    'offers': {
      '@type': 'Offer',
      'price': '1.99',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'url': `https://stampdy.com/stamp-template/${displayStampType.value.toLowerCase().replace(/\s+/g, '-')}`,
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.7',
      'reviewCount': '45',
      'bestRating': '5',
      'worstRating': '1',
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Business owners, Professionals, Individuals',
    },
  },
  {
    '@type': 'Service',
    'name': `${displayStampType.value} Template Design Service`,
    'serviceType': 'Template Design',
    'description': `Free access to professional ${displayStampType.value.toLowerCase()} templates with online editing capabilities. Customize layouts, add text, logos, and download instantly.`,
    'provider': {
      '@type': 'Organization',
      'name': 'Stampdy.com',
      'url': 'https://stampdy.com',
    },
    'areaServed': 'Worldwide',
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': `https://stampdy.com/stamp-template/${displayStampType.value.toLowerCase().replace(/\s+/g, '-')}`,
      'serviceType': 'Online',
    },
    'category': 'Design Templates',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${displayStampType.value} Templates`,
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Template Editing',
            'description': 'Online template customization and editing',
          },
          'price': '0',
          'priceCurrency': 'USD',
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Template Download',
            'description': 'High-quality template download in multiple formats',
          },
          'price': '1.99',
          'priceCurrency': 'USD',
        },
      ],
    },
  },
])

// 计算显示的页码
const displayPages = computed(() => {
  const pages = []
  const maxDisplay = 7
  const halfDisplay = Math.floor(maxDisplay / 2)

  let start = Math.max(1, currentPage.value - halfDisplay)
  let end = Math.min(totalPages.value, start + maxDisplay - 1)

  // 调整start以确保显示足够的页码
  start = Math.max(1, end - maxDisplay + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// 当前页模板数据
const currentPageTemplates = ref<any[]>([])
const loading = ref(false)

// 响应式设置每页数量
onMounted(() => {
  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) {
      itemsPerPage.value = 6 // 移动端：6个 (1列 x 6行)
    } else if (window.innerWidth < 1024) {
      itemsPerPage.value = 8 // iPad端：8个 (2列 x 4行)
    } else {
      itemsPerPage.value = 12 // PC端：12个 (4列 x 3行)
    }
  }

  updateItemsPerPage()
  window.addEventListener('resize', updateItemsPerPage)

  onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerPage)
  })
})

// 过滤模板
const filterTemplates = async () => {
  const targetStampType = displayStampType.value
  if (!targetStampType) {
    filteredTemplateKeys.value = []
    return
  }

  loading.value = true
  try {
    const allTemplateKeys = Object.keys(templateGlob)
    const filtered = []

    // 批量检查模板类型
    for (const templatePath of allTemplateKeys) {
      try {
        const templateLoader = templateGlob[templatePath]
        if (templateLoader) {
          const templateModule = await templateLoader() as any
          const templateData = templateModule.default

          // 匹配stampType字段，忽略大小写和空格差异
          const templateType = templateData.stampType?.toLowerCase().replace(/\s+/g, ' ').trim()
          const targetType = targetStampType.toLowerCase().replace(/\s+/g, ' ').trim()

          if (templateType === targetType) {
            filtered.push(templatePath)
          }
        }
      } catch (error) {
        console.warn(`Failed to check template: ${templatePath}`, error)
      }
    }

    filteredTemplateKeys.value = filtered
  } catch (error) {
    console.error('Error filtering templates:', error)
  } finally {
    loading.value = false
  }
}

// 加载当前页模板
const loadPageTemplates = async () => {
  if (filteredTemplateKeys.value.length === 0) return

  loading.value = true
  try {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = Math.min(start + itemsPerPage.value, filteredTemplateKeys.value.length)

    const pageKeys = filteredTemplateKeys.value.slice(start, end)
    const templates = []

    for (const templatePath of pageKeys) {
      try {
        // 加载JSON
        const templateLoader = templateGlob[templatePath]
        if (templateLoader) {
          const templateModule = await templateLoader() as any
          const templateData = templateModule.default

          // 加载对应图片
          const imagePath = templatePath.replace('.json', '.png')
          let imageUrl = null

          const imageLoader = imageGlob[imagePath]
          if (imageLoader) {
            const imageModule = await imageLoader() as any
            imageUrl = imageModule.default
          }

          templates.push({
            ...templateData,
            image: imageUrl,
          })
        }
      } catch (error) {
        console.warn(`Failed to load template: ${templatePath}`, error)
      }
    }

    currentPageTemplates.value = templates
  } catch (error) {
    console.error('Error loading templates:', error)
  } finally {
    loading.value = false
  }
}

// 分页方法
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    const query = page === 1 ? {} : { page: page.toString() }
    router.push({ query })
  }
}

// 监听类型变化，重新过滤
watch(displayStampType, async () => {
  await filterTemplates()
  if (currentPage.value !== 1) {
    // 重置到第一页
    router.push({ query: {} })
  } else {
    await loadPageTemplates()
  }
}, { immediate: true })

// 监听页码和每页数量变化
watch(currentPage, loadPageTemplates)
watch(itemsPerPage, async () => {
  if (filteredTemplateKeys.value.length > 0) {
    await loadPageTemplates()
  }
})

// 编辑器相关
const showEditor = ref(false)
const editor = useTemplateRef('editor')

const openEditor = (template: any) => {
  if (template) {
    editor.value?.chooseTemplate(template)
  }
  showEditor.value = true
}

const closeEditor = () => {
  showEditor.value = false
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
