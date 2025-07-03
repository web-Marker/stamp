<template>
  <div>
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
        <div class="mt-2 max-w-5xl text-center mx-auto ">
          <h1 class="block font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
            {{ t('pdfEditor.title') }}
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-2 max-w-2xl lg:max-w-3xl text-center mx-auto px-4">
          <!-- 移动端简短描述 -->
          <p class="block sm:hidden text-base text-gray-600  leading-relaxed">
            {{ t('pdfEditor.mobileTitle') }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <section class="bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
    <div class="max-w-7xl mx-auto space-y-2 leading-relaxed text-lg font-medium">
      <p v-html="t('pdfEditor.desc1')" />
      <p v-html="t('pdfEditor.desc2')" />
      <div class="flex justify-center m-2 mt-10">
        <NuxtLink
          to="/pdf-view"
        >
          <UButton
            size="lg"
            color="primary"
            variant="solid"
            class="px-16 py-5 cursor-pointer
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              text-white font-bold text-2xl
              shadow-lg hover:shadow-xl
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-300 ease-out
              border-0
              rounded-xl"
          >
            <span class="flex items-center space-x-2">
              <!-- 文案放在右边 -->
              <span>{{ t('pdfEditor.openPDFEditor') }}</span>
            </span>
          </UButton>
        </NuxtLink>
      </div>

      <h2 class="text-2xl font-semibold mb-4 mt-16">
        {{ t('pdfEditor.howToAddStampsOrSignatures') }}
      </h2>
      <p>{{ t('pdfEditor.usingStampdyPDFToolIsSimple') }}</p>
      <ul class="list-disc pl-4 space-y-2 list-none">
        <li>{{ t('pdfEditor.desc3') }}</li>
        <li>{{ t('pdfEditor.desc4') }}</li>
        <li>{{ t('pdfEditor.desc5') }}</li>
        <li>{{ t('pdfEditor.desc6') }}</li>
      </ul>
      <p>
        {{ t('pdfEditor.noRegistrationRequired') }}
      </p>

      <div class=" flex justify-center my-6">
        <!-- Testimonials -->
        <div class="relative overflow-hidden max-w-7xl mx-auto px-2  lg:py-2">
          <!-- 主要内容卡片 -->
          <div class="relative bg-white rounded-2xl border border-gray-100 overflow-hidden ">
            <!-- 顶部装饰条 -->

            <div class="py-4 lg:py-5">
              <!-- Grid布局 -->
              <div class="lg:grid lg:grid-cols-6 lg:gap-12 px-8 sm:px-12 lg:px-16">
                <!-- 图片区域 -->
                <div class="hidden lg:block lg:col-span-2 mb-8 lg:mb-0">
                  <div class="relative group">
                    <!-- 图片阴影装饰 -->
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300 transform rotate-3" />
                    <img
                      class="relative rounded-xl shadow-xl w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      src="/example-2.jpg"
                      alt="user using StampDy create stamp"
                    >
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
                        {{ t('index.testimonials.title') }}
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
                          {{ t('index.testimonials.features.0') }}
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
                          {{ t('index.testimonials.features.1') }}
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
                          {{ t('index.testimonials.features.2') }}
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
                          {{ t('index.testimonials.features.3') }}
                        </span>
                      </li>
                    </ul>
                    <div class="flex justify-center">
                      <NuxtLink to="#editor">
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
                        >
                          <span class="flex items-center space-x-3">

                            <span>{{ t('index.hero.cta.tryFree') }}</span>

                          </span>
                        </UButton>
                      </NuxtLink>
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

      <h2 class="text-2xl font-semibold mb-4 mt-6">
        {{ t('pdfEditor.desc7') }}
      </h2>
      <p>
        {{ t('pdfEditor.desc8') }}
      </p>
      <ul class="list-disc pl-4 space-y-2 list-none">
        <li>
          <h3> {{ t('pdfEditor.desc9') }}</h3>
          <p>
            {{ t('pdfEditor.desc10') }}
          </p>
        </li>
        <li>
          <h3> {{ t('pdfEditor.desc11') }}</h3>
          <p>
            {{ t('pdfEditor.desc12') }}
          </p>
        </li>
        <li>
          <h3>
            {{ t('pdfEditor.desc13') }}
          </h3>
          <p>
            {{ t('pdfEditor.desc14') }}
          </p>
        </li>
        <li>
          <h3> {{ t('pdfEditor.desc15') }}</h3>
          <p>
            {{ t('pdfEditor.desc16') }}
          </p>
        </li>
        <li>
          <h3> {{ t('pdfEditor.desc17') }}</h3>
          <p>
            {{ t('pdfEditor.desc18') }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale, tm } = useI18n()

useSeoMeta({
  title: t('pdfEditor.seo.title'),
  description: t('pdfEditor.seo.description'),
  ogTitle: t('pdfEditor.seo.title'),
  ogDescription: t('pdfEditor.seo.description'),
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: t('pdfEditor.seo.title'),
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: locale.value === 'en' ? 'https://stampdy.com/pdf-editor' : `https://stampdy.com/${locale.value}/pdf-editor`,
  ogType: 'website',
  ogLocale: locale.value,
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: t('pdfEditor.seo.title'),
  twitterDescription: t('pdfEditor.seo.description'),
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: t('pdfEditor.seo.title'),
    type: 'image/png',
  },
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': t('pdfEditor.seo.title'),
    'description': t('pdfEditor.seo.description'),
    'url': locale.value === 'en' ? 'https://stampdy.com/pdf-editor' : `https://stampdy.com/${locale.value}/pdf-editor`,
    'inLanguage': locale.value,
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'PDF Editor',
          'item': locale.value === 'en' ? 'https://stampdy.com/pdf-editor' : `https://stampdy.com/${locale.value}/pdf-editor`,
        },
      ],
    },
  },
  {
    '@type': 'WebApplication',
    'name': t('pdfEditor.seo.title'),
    'description': t('pdfEditor.seo.description'),
    'url': locale.value === 'en' ? 'https://stampdy.com/pdf-editor' : `https://stampdy.com/${locale.value}/pdf-editor`,
    'applicationCategory': 'WebApplication',
    'operatingSystem': 'Web Browser',
    'browserRequirements': 'Chrome, Firefox, Safari, Edge',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.6',
      'reviewCount': '65',
      'bestRating': '5',
      'worstRating': '1',
    },
    'featureList': [
      'Add stamps to PDF files',
      'Insert digital signatures',
      'Upload custom seals',
      'Drag and drop positioning',
      'Resize and rotate elements',
      'No registration required',
      'No watermarks',
      'Secure online processing',
    ],
  },
  {
    '@type': 'SoftwareApplication',
    'name': 'Online PDF Stamp Editor',
    'applicationCategory': 'DesignApplication',
    'description': 'Professional PDF editing tool for adding stamps, signatures, and seals to documents online. Perfect for business and personal use.',
    'operatingSystem': 'Web',
    'softwareVersion': '2.0',
    'datePublished': '2024-01-01',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
    'screenshot': 'https://stampdy.com/example-2.jpg',
    'author': {
      '@type': 'Organization',
      'name': 'Stampdy.com',
      'url': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
    },
  },
  {
    '@type': 'Service',
    'name': 'PDF Editing Service',
    'serviceType': 'Document Editing',
    'description': 'Free online service for editing PDF documents by adding stamps, seals, and digital signatures. Secure, fast, and browser-based.',
    'provider': {
      '@type': 'Organization',
      'name': 'Stampdy.com',
      'url': locale.value === 'en' ? 'https://stampdy.com' : `https://stampdy.com/${locale.value}`,
    },
    'areaServed': 'Worldwide',
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': locale.value === 'en' ? 'https://stampdy.com/pdf-editor' : `https://stampdy.com/${locale.value}/pdf-editor`,
      'serviceType': 'Online',
    },
    'category': 'PDF Editing',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'PDF Editing Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Basic PDF Editing',
            'description': 'Add stamps and signatures to PDF files',
          },
          'price': '0',
          'priceCurrency': 'USD',
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Premium Downloads',
            'description': 'High-quality PDF downloads without limitations',
          },
          'price': '1.99',
          'priceCurrency': 'USD',
        },
      ],
    },
  },
  {
    '@type': 'HowTo',
    'name': 'How to Add Stamps to PDF Files Online',
    'description': 'Step-by-step guide to adding stamps, seals, and signatures to PDF documents using Stampdy online editor',
    'image': 'https://stampdy.com/example-2.jpg',
    'totalTime': 'PT3M',
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'Stampdy PDF Editor',
      },
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Upload Your PDF',
        'text': 'Upload your PDF file directly to the online editor. No registration required.',
        'url': 'https://stampdy.com/pdf-editor',
      },
      {
        '@type': 'HowToStep',
        'name': 'Choose Stamp or Signature',
        'text': 'Select from available stamps and signatures, or upload your own custom design.',
        'url': 'https://stampdy.com/pdf-editor',
      },
      {
        '@type': 'HowToStep',
        'name': 'Position and Resize',
        'text': 'Drag the stamp to the desired position, resize or rotate it as needed for perfect placement.',
        'url': 'https://stampdy.com/pdf-editor',
      },
      {
        '@type': 'HowToStep',
        'name': 'Download Edited PDF',
        'text': 'Download your edited PDF file with stamps applied. No watermarks or registration required.',
        'url': 'https://stampdy.com/pdf-editor',
      },
    ],
  },
])
</script>

<style scoped>
</style>
