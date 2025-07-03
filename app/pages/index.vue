<script setup lang="ts">
const { t, locale, tm } = useI18n()

const faqs = ref([
  {
    id: 1,
    question: t('index.faq.q1.question'),
    answer: t('index.faq.q1.answer'),
    isOpen: true, // 第一个FAQ默认打开
  },
  {
    id: 2,
    question: t('index.faq.q2.question'),
    answer: t('index.faq.q2.answer'),
    isOpen: false,
  },
  {
    id: 3,
    question: t('index.faq.q3.question'),
    answer: t('index.faq.q3.answer'),
    isOpen: false,
  },
  {
    id: 4,
    question: t('index.faq.q4.question'),
    answer: t('index.faq.q4.answer'),
    isOpen: false,
  },
  {
    id: 5,
    question: t('index.faq.q5.question'),
    answer: t('index.faq.q5.answer'),
    isOpen: false,
  },
  {
    id: 6,
    question: t('index.faq.q6.question'),
    answer: t('index.faq.q6.answer'),
    isOpen: false,
  },
  {
    id: 7,
    question: t('index.faq.q7.question'),
    answer: t('index.faq.q7.answer'),
    isOpen: false,
  },
  {
    id: 8,
    question: t('index.faq.q8.question'),
    answer: t('index.faq.q8.answer'),
    isOpen: false,
  },
  {
    id: 9,
    question: t('index.faq.q9.question'),
    answer: t('index.faq.q9.answer'),
    isOpen: false,
  },
  {
    id: 10,
    question: t('index.faq.q10.question'),
    answer: t('index.faq.q10.answer'),
    isOpen: false,
  },
  {
    id: 11,
    question: t('index.faq.q11.question'),
    answer: t('index.faq.q11.answer'),
    isOpen: false,
  },
  {
    id: 12,
    question: t('index.faq.q12.question'),
    answer: t('index.faq.q12.answer'),
    isOpen: false,
  },
  {
    id: 13,
    question: t('index.faq.q13.question'),
    answer: t('index.faq.q13.answer'),
    isOpen: false,
  },
  {
    id: 14,
    question: t('index.faq.q14.question'),
    answer: t('index.faq.q14.answer'),
    isOpen: false,
  },
  {
    id: 15,
    question: t('index.faq.q15.question'),
    answer: t('index.faq.q15.answer'),
    isOpen: false,
  },
  {
    id: 16,
    question: t('index.faq.q16.question'),
    answer: t('index.faq.q16.answer'),
    isOpen: false,
  },
  {
    id: 17,
    question: t('index.faq.q17.question'),
    answer: t('index.faq.q17.answer'),
    isOpen: false,
  },
])

// 切换FAQ展开/收起状态
const toggleFaq = (id: number) => {
  const faq = faqs.value.find(item => item.id === id)
  if (faq) {
    faq.isOpen = !faq.isOpen
  }
}

const stripHtml = (html: any): string => {
  if (typeof html !== 'string') {
    return String(html || '')
  }
  return html.replace(/<[^>]*>/g, '')
}

useSeoMeta({
  title: t('index.seo.title'),
  description: t('index.seo.description'),
  ogTitle: t('index.seo.title'),
  ogDescription: t('index.seo.description'),
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: t('index.seo.title'),
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
  ogType: 'website',
  ogLocale: 'en_US',
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: t('index.seo.title'),
  twitterDescription: t('index.seo.description'),
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: t('index.seo.title'),
    type: 'image/png',
  },
})

useSchemaOrg(
  [
    defineWebSite({
      name: 'Stampdy.com',
      url: locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      inLanguage: locale.value,
      description: t('index.seo.description'),
    }),
    {
      '@type': 'Service',
      'name': 'Stampdy.com',
      'serviceType': 'Stamp Services',
      'description': t('index.seo.description'),
      'provider': {
        '@type': 'Organization',
        'name': 'Stampdy.com',
        'url': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      },
    },
    {
      '@type': 'Article',
      '@id': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      },
      'author': {
        '@type': 'Organization',
        'name': 'Stampdy.com',
        'url': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      },
      'image': 'https://stampdy.com/og-stampdy.png',
      'name': 'Stampdy.com',
      'headline': t('index.seo.title'),
      'description': t('index.seo.description'),
      'url': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      'datePublished': '2025-06-30T00:00:00.000Z',
      'dateModified': '2025-06-30T00:00:00.000Z',
      'publisher': {
        '@type': 'Organization',
        'name': 'Stampdy.com',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://stampdy.com/og-stampdy.png',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.value.map((faq: any) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': stripHtml(faq.answer),
        },
      })),
    },
    {
      '@type': 'Organization',
      'name': 'Stampdy.com',
      'url': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
      'logo': 'https://stampdy.com/og-stampdy.png',
      'contactPoint': {
        'email': 'service@stampdy.com',
        '@type': 'ContactPoint',
        'contactType': 'customer support',
      },
    },
  ],
)

const editor = useTemplateRef('editor')

const exportTemplate = () => {
  editor.value!.exportTemplate()
}

// 添加滚动到编辑器的方法
const scrollToEditor = () => {
  // 直接通过 ID 选择器找到编辑器元素
  const editorElement = document.getElementById('stamp-editor')
  if (editorElement) {
    editorElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const stampTypes = ['India seals',
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

// FAQ 数据数组
</script>

<template>
  <div>
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
        <div class="mt-2 max-w-5xl text-center mx-auto ">
          <h1 class="block font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
            {{ t('index.hero.title') }} <span class="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">{{ t('index.hero.brandName') }}</span>
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-2 max-w-2xl lg:max-w-3xl text-center mx-auto px-4">
          <!-- 移动端简短描述 -->
          <p class="block sm:hidden text-base text-gray-600  leading-relaxed">
            Free online stamp maker, create professional-quality stamps in minutes. No registration required.
          </p>

          <!-- 移动端按钮 - 添加到移动端描述后面 -->
          <!-- <div class="block sm:hidden mt-4">
            <UButton
              icon="i-lucide-stamp"
              size="lg"
              color="primary"
              variant="solid"
              class="cursor-pointer font-semibold px-6 py-3 text-base"
              @click="scrollToEditor"
            >
              Try Making Stamp
            </UButton>
          </div> -->

          <!-- 桌面端完整描述 -->
        </div>
        <p class="hidden max-w-5xl mx-auto sm:block text-base sm:text-lg text-gray-600 dark:text-neutral-400 leading-relaxed">
          {{ t('index.hero.subtitle.desktop') }}
        </p>
      </div>
    </div>

    <Editor ref="editor" />

    <!-- <div class="flex justify-center m-2">
      <UButton size="lg" @click="exportTemplate">
        <span class="px-4">Export</span>
      </UButton>
    </div> -->

    <!-- Enhanced stamp type selection area -->
    <div class="w-full py-8 px-4">
      <div class="max-w-8xl mx-auto">
        <!-- Title section -->

        <!-- Button group container -->
        <div class="flex flex-wrap justify-center gap-3 max-w-7xl mx-auto">
          <NuxtLink
            v-for="stampType in stampTypes"
            :key="stampType"
            :to="''"
            target="_blank"
            class="
              inline-block
              cursor-pointer
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-lg hover:-translate-y-1
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:scale-95 active:translate-y-0
              no-underline
            "
          >
            <UButton
              color="neutral"
              variant="ghost"
              size="md"
              class="
                font-medium px-4 py-2
                border border-gray-200
                text-gray-700
                hover:text-primary
                bg-transparent hover:bg-transparent
                shadow-sm hover:shadow-md
                cursor-pointer stamptype-btn
                text-sm sm:text-base
                w-full h-full
                transition-all duration-200
                hover:underline
                hover:decoration-primary
                hover:underline-offset-5
              "
            >
              {{ stampType }}
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <section class="hidden lg:block bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto space-y-2 leading-relaxed text-lg font-medium">
        <h2 class="text-2xl font-semibold mb-4">
          {{ t('index.sections.designOnline.title') }}
        </h2>

        <p v-html="t('index.sections.designOnline.paragraph1')" />

        <p>{{ t('index.sections.designOnline.paragraph2') }}</p>

        <p v-html="t('index.sections.designOnline.paragraph3')" />

        <h2 class="text-2xl font-semibold mt-8 mb-4">
          {{ t('index.sections.whyCreateOnline.title') }}
        </h2>

        <p>{{ t('index.sections.whyCreateOnline.paragraph1') }}</p>

        <p>{{ t('index.sections.whyCreateOnline.paragraph2') }}</p>

        <p>{{ t('index.sections.whyCreateOnline.paragraph3') }}</p>
        <ul class="list-disc pl-4 space-y-1 list-none">
          <li>{{ t('index.sections.whyCreateOnline.features.0') }}</li>
          <li>{{ t('index.sections.whyCreateOnline.features.1') }}</li>
          <li>{{ t('index.sections.whyCreateOnline.features.2') }}</li>
          <li>{{ t('index.sections.whyCreateOnline.features.3') }}</li>
          <li>{{ t('index.sections.whyCreateOnline.features.4') }}</li>
        </ul>

        <p>{{ t('index.sections.whyCreateOnline.paragraph4') }}</p>

        <h2 class="text-2xl font-semibold mt-8">
          {{ t('index.sections.whatCanYouDo.title') }}
        </h2>

        <p>{{ t('index.sections.whatCanYouDo.paragraph1') }}</p>

        <p>{{ t('index.sections.whatCanYouDo.paragraph2') }}</p>
        <ul class="list-disc pl-4 space-y-1 list-none">
          <li>{{ t('index.sections.whatCanYouDo.features.0') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.1') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.2') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.3') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.4') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.5') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.6') }}</li>
          <li>{{ t('index.sections.whatCanYouDo.features.7') }}</li>
        </ul>

        <p>{{ t('index.sections.whatCanYouDo.paragraph3') }}</p>

        <div class="hidden lg:flex justify-center my-6">
          <!-- Testimonials -->
          <div class="relative overflow-hidden max-w-7xl mx-auto px-2  lg:py-2">
            <!-- 主要内容卡片 -->
            <div class="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ">
              <!-- 顶部装饰条 -->
              <div class="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />

              <div class="py-4 lg:py-5">
                <!-- 原有的渐变装饰 - 优化位置 -->
                <div aria-hidden="true" class="absolute top-8 left-8 -z-1">
                  <div class="bg-purple-200 opacity-10 blur-3xl w-96 h-96 rounded-full dark:bg-purple-900 dark:opacity-10" />
                </div>

                <!-- Grid布局 -->
                <div class="lg:grid lg:grid-cols-6 lg:gap-12 px-8 sm:px-12 lg:px-16">
                  <!-- 图片区域 -->
                  <div class="hidden lg:block lg:col-span-2 mb-8 lg:mb-0">
                    <div class="relative group">
                      <!-- 图片阴影装饰 -->
                      <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300 transform rotate-3" />
                      <img
                        class="relative rounded-xl shadow-xl w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        src="/example-1.jpg"
                        alt="user using online stamp maker"
                      >
                      <!-- 装饰小圆点 -->
                      <div class="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg" />
                      <div class="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse delay-1000 shadow-lg" />
                    </div>
                  </div>

                  <!-- 内容区域 -->
                  <div class="lg:col-span-4">
                    <!-- Blockquote -->
                    <blockquote class="space-y-6">
                      <!-- 引号装饰 -->
                      <div class="relative">
                        <svg class="absolute -top-6 -left-6 w-10 h-10 text-blue-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                        </svg>
                        <h2
                          class="text-xl text-gray-800 lg:text-2xl lg:leading-normal dark:text-neutral-200 pl-4 font-bold"
                        >
                          {{ t('index.ad.title') }}
                        </h2>
                      </div>

                      <!-- 特色列表 -->
                      <ul class="space-y-4 pl-4 font-semibold">
                        <li class="flex items-start space-x-4">
                          <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <svg
                              class="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span class="text-gray-700 text-base leading-relaxed">
                            {{ t('index.ad.features.0') }}
                          </span>
                        </li>
                        <li class="flex items-start space-x-4">
                          <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mt-0.5">
                            <svg
                              class="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span class="text-gray-700 text-base leading-relaxed">
                            {{ t('index.ad.features.1') }}
                          </span>
                        </li>
                        <li class="flex items-start space-x-4">
                          <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mt-0.5">
                            <svg
                              class="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span class="text-gray-700 text-base leading-relaxed">
                            {{ t('index.ad.features.2') }}
                          </span>
                        </li>
                        <li class="flex items-start space-x-4">
                          <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mt-0.5">
                            <svg
                              class="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span class="text-gray-700 text-base leading-relaxed">
                            {{ t('index.ad.features.3') }}
                          </span>
                        </li>
                      </ul>
                      <div class="flex justify-center">
                        <UButton
                          size="md"
                          color="primary"
                          variant="solid"
                          class="
                            cursor-pointer
                            px-16 py-4
                            bg-gradient-to-r from-blue-600 to-purple-600
                            hover:from-blue-700 hover:to-purple-700
                            text-white font-bold text-lg
                            shadow-lg hover:shadow-xl
                            transform hover:scale-105 hover:-translate-y-1
                            transition-all duration-300 ease-out
                            border-0
                            rounded-xl
                          "
                          @click="scrollToEditor"
                        >
                          <span class="flex items-center space-x-3">

                            <span>{{ t('index.ad.button') }}</span>
                            <svg
                              class="w-4 h-4 animate-bounce"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                          </span>
                        </UButton>
                      </div>
                    </blockquote>
                    <!-- End Blockquote -->
                  </div>
                  <!-- End Col -->
                </div>
                <!-- End Grid -->
              </div>
            </div>
          </div>
          <!-- End Testimonials -->
        </div>

        <h2 class="text-2xl font-semibold mt-8">
          {{ t('index.sections.howToCreate.title') }}
        </h2>

        <p>{{ t('index.sections.howToCreate.paragraph1') }}</p>

        <ol class="list-decimal pl-6 space-y-2 list-none font-normal">
          <li><span class="font-medium ">{{ t('index.sections.howToCreate.steps.0.title') }}</span><br>{{ t('index.sections.howToCreate.steps.0.description') }}</li>
          <li><span class="font-medium">{{ t('index.sections.howToCreate.steps.1.title') }}</span><br>{{ t('index.sections.howToCreate.steps.1.description') }}</li>
          <li><span class="font-medium ">{{ t('index.sections.howToCreate.steps.2.title') }}</span><br>{{ t('index.sections.howToCreate.steps.2.description') }}</li>
          <li><span class="font-medium">{{ t('index.sections.howToCreate.steps.3.title') }}</span><br>{{ t('index.sections.howToCreate.steps.3.description') }}</li>
          <li><span class="font-medium">{{ t('index.sections.howToCreate.steps.4.title') }}</span><br>{{ t('index.sections.howToCreate.steps.4.description') }}</li>
          <li><span class="font-medium">{{ t('index.sections.howToCreate.steps.5.title') }}</span><br>{{ t('index.sections.howToCreate.steps.5.description') }}</li>
          <li><span class="font-medium">{{ t('index.sections.howToCreate.steps.6.title') }}</span><br>{{ t('index.sections.howToCreate.steps.6.description') }}</li>
        </ol>

        <h2 class="text-2xl font-semibold mt-8">
          {{ t('index.sections.templatesPersonalization.title') }}
        </h2>

        <p v-html="t('index.sections.templatesPersonalization.paragraph1')" />

        <p>{{ t('index.sections.templatesPersonalization.paragraph2') }}</p>

        <p>{{ t('index.sections.templatesPersonalization.paragraph3') }}</p>
        <ul class="list-disc pl-6 space-y-1 list-none">
          <li>{{ t('index.sections.templatesPersonalization.features.0') }}</li>
          <li>{{ t('index.sections.templatesPersonalization.features.1') }}</li>
          <li>{{ t('index.sections.templatesPersonalization.features.2') }}</li>
          <li>{{ t('index.sections.templatesPersonalization.features.3') }}</li>
        </ul>

        <p>{{ t('index.sections.templatesPersonalization.paragraph4') }}</p>

        <h2 class="text-2xl font-semibold mt-8">
          {{ t('index.sections.downloadUse.title') }}
        </h2>

        <p>{{ t('index.sections.downloadUse.paragraph1') }}</p>
        <ul class="list-disc pl-6 space-y-1 list-none">
          <li> <span class="font-medium">{{ t('index.sections.downloadUse.formats.0.type') }}</span> – {{ t('index.sections.downloadUse.formats.0.description') }}</li>
          <li> <span class="font-medium">{{ t('index.sections.downloadUse.formats.1.type') }}</span> – {{ t('index.sections.downloadUse.formats.1.description') }}</li>
          <li> <span class="font-medium">{{ t('index.sections.downloadUse.formats.2.type') }}</span> – {{ t('index.sections.downloadUse.formats.2.description') }}</li>
          <li> <span class="font-medium">{{ t('index.sections.downloadUse.formats.3.type') }}</span> – {{ t('index.sections.downloadUse.formats.3.description') }}</li>
        </ul>

        <p>{{ t('index.sections.downloadUse.paragraph2') }}</p>

        <p>{{ t('index.sections.downloadUse.paragraph3') }}</p>
      </div>
    </section>

    <section class="lg:hidden bg-white text-gray-800 py-10 px-4 sm:px-6 md:px-8">
      <div class="max-w-3xl mx-auto space-y-4 leading-relaxed text-base font-normal">
        <h2 class="text-xl font-semibold mb-3">
          {{ t('index.mobileContent.title') }}
        </h2>

        <p v-html="t('index.mobileContent.paragraph1')" />

        <p>{{ t('index.mobileContent.paragraph2') }}</p>

        <h2 class="text-xl font-semibold mt-6">
          {{ t('index.mobileContent.templatesSection.title') }}
        </h2>

        <p v-html="t('index.mobileContent.templatesSection.paragraph1')" />
        <p>{{ t('index.mobileContent.templatesSection.paragraph2') }}</p>

        <h2 class="text-xl font-semibold mt-6">
          {{ t('index.mobileContent.featuresSection.title') }}
        </h2>

        <ul class="list-disc pl-5 space-y-1">
          <li>{{ t('index.mobileContent.featuresSection.features.0') }}</li>
          <li>{{ t('index.mobileContent.featuresSection.features.1') }}</li>
          <li>{{ t('index.mobileContent.featuresSection.features.2') }}</li>
          <li>{{ t('index.mobileContent.featuresSection.features.3') }}</li>
          <li>{{ t('index.mobileContent.featuresSection.features.4') }}</li>
          <li>{{ t('index.mobileContent.featuresSection.features.5') }}</li>
        </ul>

        <p v-html="t('index.mobileContent.featuresSection.paragraph')" />

        <h2 class="text-xl font-semibold mt-6">
          {{ t('index.mobileContent.mobileDesign.title') }}
        </h2>

        <p v-html="t('index.mobileContent.mobileDesign.paragraph')" />

        <h2 class="text-xl font-semibold mt-6">
          {{ t('index.mobileContent.howItWorks.title') }}
        </h2>

        <ol class="list-decimal pl-6 space-y-1">
          <li>{{ t('index.mobileContent.howItWorks.steps.0') }}</li>
          <li>{{ t('index.mobileContent.howItWorks.steps.1') }}</li>
          <li>{{ t('index.mobileContent.howItWorks.steps.2') }}</li>
          <li>{{ t('index.mobileContent.howItWorks.steps.3') }}</li>
          <li>{{ t('index.mobileContent.howItWorks.steps.4') }}</li>
          <li>{{ t('index.mobileContent.howItWorks.steps.5') }}</li>
          <li>{{ t('index.mobileContent.howItWorks.steps.6') }}</li>
        </ol>

        <h2 class="text-xl font-semibold mt-6">
          {{ t('index.mobileContent.instantDownload.title') }}
        </h2>

        <ul class="list-disc pl-5 space-y-1">
          <li><strong>{{ t('index.mobileContent.instantDownload.formats.0.type') }}</strong> — {{ t('index.mobileContent.instantDownload.formats.0.description') }}</li>
          <li><strong>{{ t('index.mobileContent.instantDownload.formats.1.type') }}</strong> — {{ t('index.mobileContent.instantDownload.formats.1.description') }}</li>
          <li><strong>{{ t('index.mobileContent.instantDownload.formats.2.type') }}</strong> — {{ t('index.mobileContent.instantDownload.formats.2.description') }}</li>
          <li><strong>{{ t('index.mobileContent.instantDownload.formats.3.type') }}</strong> — {{ t('index.mobileContent.instantDownload.formats.3.description') }}</li>
        </ul>

        <p>{{ t('index.mobileContent.instantDownload.paragraph') }}</p>

        <h2 class="text-xl font-semibold mt-6">
          {{ t('index.mobileContent.tryStampdy.title') }}
        </h2>

        <p v-html="t('index.mobileContent.tryStampdy.paragraph1')" />
        <p>{{ t('index.mobileContent.tryStampdy.paragraph2') }}</p>

        <div class="mt-4 flex justify-center">
          <UButton
            size="md"
            color="primary"
            variant="solid"
            class="py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-base shadow-md hover:shadow-lg rounded-xl hover:scale-105 transition-transform text-center px-8"
            @click="scrollToEditor"
          >
            Try for Free
          </UButton>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <div class="px-4 py-4 mx-auto">
      <div class="max-w-7xl mx-auto mb-6 lg:mb-10 lg:mb-14">
        <h2 class="text-xl sm:text-2xl font-semibold text-center lg:text-left">
          ❓ Frequently Asked Questions — All About Creating Your Stamp Online
        </h2>
      </div>
      <!-- End Title -->

      <div class="max-w-7xl mx-auto">
        <!-- Accordion -->
        <div class="space-y-3 lg:space-y-4">
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="rounded-xl p-4 lg:p-6"
            :class="faq.isOpen ? 'bg-gray-100' : ''"
          >
            <!-- Question Button -->
            <button
              class="group pb-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-hidden focus:text-gray-500"
              :aria-expanded="faq.isOpen"
              @click="toggleFaq(faq.id)"
            >
              <h3 class="text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer pr-2">
                {{ faq.question }}
              </h3>

              <!-- Toggle Icon -->
              <svg
                class="shrink-0 w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-gray-500 transition-transform duration-300"
                :class="faq.isOpen ? 'rotate-180' : ''"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <!-- Answer Content with Slide Transition -->
            <div
              class="overflow-hidden transition-all duration-300"
              :class="faq.isOpen ? 'max-h-96 mt-3' : 'max-h-0'"
            >
              <div class="pb-2">
                <p
                  class="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed font-medium"
                  v-html="faq.answer"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- End Accordion -->
      </div>
    </div>
    <!-- End FAQ -->

    <Entry v-if="locale === 'en'" />
  </div>
</template>

<style scoped>
/* Custom hover animations */
.stamptype-btn:hover {
  transform: translateY(-2px) scale(1.02);
}

.stamptype-btn:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 0.1s;
}

/* Force transparent background for UButton component */
.stamptype-btn button {
  background-color: transparent !important;
}

.stamptype-btn:hover button {
  background-color: transparent !important;
}
</style>
