<template>
  <div>
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
        <div class="mt-2 max-w-5xl text-center mx-auto ">
          <h1 class="block font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  leading-tight">
            {{ t('stampMaker.title') }}
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-2 max-w-2xl lg:max-w-3xl text-center mx-auto px-4">
          <!-- 移动端简短描述 -->
          <p class="block sm:hidden text-base text-gray-600  leading-relaxed">
            {{ t('stampMaker.description') }}
          </p>

          <!-- 移动端按钮 - 添加到移动端描述后面 -->
          <!-- <div class="block sm:hidden mt-4">
            <UButton
              icon="i-lucide-stamp"
              size="lg"
              color="primary"
              variant="solid"
              class="cursor-pointer font-semibold px-6 py-3 text-base"
            >
              Try Making Stamp
            </UButton>
          </div> -->

          <!-- 桌面端完整描述 -->
        </div>
        <p class="hidden max-w-5xl mx-auto sm:block text-base sm:text-lg text-gray-600 dark:text-neutral-400 leading-relaxed">
          {{ t('stampMaker.desc2') }}
        </p>
      </div>
    </div>
  </div>
  <Editor ref="editor" />

  <!-- Enhanced stamp type selection area -->
  <div class="w-full pt-8 px-4">
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

  <div class="max-w-7xl w-full mx-auto py-16 px-12">
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      dots
      :autoplay="{ delay: 4000 }"
      :items="Object.entries(templates).slice(0, 10).map(([key, value]) => ({
        ...value,
        image: templateImgs[key.replace('.json', '.png')],
      }))"
      :ui="{
        item: 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5',

      }"
    >
      <div class="flex flex-col items-center justify-center gap-2 lg:gap-3 cursor-pointer p-3 lg:p-2">
        <div class="text-center text-sm lg:text-base font-medium line-clamp-2 overflow-hidden text-ellipsis px-2 lg:px-0">
          {{ item.name }}
        </div>
        <img
          :src="item.image"
          :width="234"
          :height="234"
          :alt="item.alt"
          :title="item.title"
          class="rounded-lg w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-full xl:h-auto object-cover"
        >
        <UButton
          color="primary"
          variant="solid"
          size="sm"
          class="size-fit text-xs lg:text-sm px-4 lg:px-6 py-2 lg:py-2.5 font-semibold cursor-pointer"
          @click="() => scrollToEditor(item)"
        >
          {{ t('stampMaker.useTemplate') }}
        </UButton>
      </div>
    </UCarousel>
  </div>

  <section class="hidden lg:block bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
    <div class="max-w-7xl mx-auto space-y-3 leading-relaxed text-lg font-medium">
      <h2 class="text-2xl font-semibold mb-4">
        {{ t('stampMaker.designYourOwnRubberStamp') }}
      </h2>

      <p v-html="t('stampMaker.desc3')" />

      <p v-html="t('stampMaker.desc4')" />

      <h2 class="text-2xl font-semibold mt-8 mb-4">
        {{ t('stampMaker.simpleToolsPowerfulResults') }}
      </h2>

      <p>{{ t('stampMaker.desc5') }}</p>

      <ul class="list-disc pl-4 space-y-1">
        <li>{{ t('stampMaker.desc6') }}</li>
        <li>{{ t('stampMaker.desc7') }}</li>
        <li>{{ t('stampMaker.desc8') }}</li>
      </ul>

      <p> {{ t('stampMaker.desc9') }}:</p>
      <ul class="list-disc pl-4 space-y-1 list-none">
        <li><b>PNG</b> – {{ t('stampMaker.desc10') }}</li>
        <li><b>SVG</b> – {{ t('stampMaker.desc11') }}</li>
        <li><b>PDF</b> – {{ t('stampMaker.desc12') }}</li>
        <li><b>DOCX</b> – {{ t('stampMaker.desc13') }}</li>
      </ul>

      <p> {{ t('stampMaker.desc14') }}</p>

      <h2 class="text-2xl font-semibold mt-8">
        {{ t('stampMaker.whyPeopleAreSwitchingToStampdy') }}
      </h2>

      <p> {{ t('stampMaker.desc15') }}</p>
      <p> {{ t('stampMaker.desc16') }}</p>
      <p class="font-semibold my-2">
        ✅ {{ t('stampMaker.desc17') }}
      </p>
      <p> {{ t('stampMaker.desc18') }}</p>
      <p> {{ t('stampMaker.desc19') }}</p>
      <p>
        👉 {{ t('stampMaker.desc20') }}
      </p>

      <USeparator class="my-8" />

      <h2 class="text-2xl font-semibold mt-4 mb-4">
        🧩 {{ t('stampMaker.whatIsAS') }}
      </h2>
      <p>
        {{ t('stampMaker.desc21') }}
      </p>
      <p>
        {{ t('stampMaker.desc22') }}
      </p>
      <p>
        {{ t('stampMaker.desc23') }}
      </p>
      <h2 class="text-2xl font-semibold mt-8 mb-4">
        🛠️ {{ t('stampMaker.whatIsAG') }}
      </h2>
      <p>
        {{ t('stampMaker.desc24') }}
      </p>
      <p>
        {{ t('stampMaker.desc25') }}
      </p>
      <p>
        {{ t('stampMaker.desc26') }}
      </p>
      <p>
        {{ t('stampMaker.desc27') }}
      </p>
    </div>
  </section>

  <section class="lg:hidden bg-white text-gray-800 py-10 px-4 sm:px-6 md:px-8">
    <div class="max-w-2xl mx-auto space-y-4 leading-relaxed text-base font-normal">
      <h2 class="text-xl font-semibold mb-3">
        🖋️ {{ t('stampMaker.designRubberStampsOnline') }}
      </h2>

      <p v-html="t('stampMaker.desc28')" />

      <p v-html="t('stampMaker.desc29')" />

      <p v-html="t('stampMaker.desc30')" />

      <ul class="list-disc pl-5 space-y-1">
        <li> {{ t('stampMaker.desc31') }}</li>
        <li> {{ t('stampMaker.desc32') }}</li>
        <li> {{ t('stampMaker.desc33') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-6">
        💰 {{ t('stampMaker.simplePricing') }}
      </h2>

      <p v-html="t('stampMaker.desc34')" />

      <p class="font-bold text-lg">
        ✅ {{ t('stampMaker.desc35') }}
      </p>

      <p v-html="t('stampMaker.desc36')" />

      <div class="mt-4 flex justify-center">
        <UButton
          size="md"
          color="primary"
          variant="solid"
          class="py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-base shadow-md hover:shadow-lg rounded-xl hover:scale-105 transition-transform text-center px-8"
          @click="() => scrollToEditor(null)"
        >
          {{ t('stampMaker.createNow') }}
        </UButton>
      </div>
    </div>
  </section>

  <div class="hidden lg:flex justify-center my-6">
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

                        <span> {{ t('index.hero.cta.tryFree') }}</span>

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

  <!-- FAQ -->
  <div class="px-4 py-4 mx-auto">
    <div class="max-w-7xl mx-auto mb-6 lg:mb-10 lg:mb-14">
      <h2 class="text-xl sm:text-2xl font-semibold text-center lg:text-left">
        ❓ {{ t('stampMaker.frequentlyAskedQuestions') }}
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
</template>

<script setup lang="ts">
const { t, locale, tm } = useI18n()

const faqs = ref([
  {
    id: 1,
    question: t('stampMaker.faq.q1.question'),
    answer: t('stampMaker.faq.q1.answer'),
    isOpen: false,
  },
  {
    id: 2,
    question: t('stampMaker.faq.q2.question'),
    answer: t('stampMaker.faq.q2.answer'),
    isOpen: false,
  },
  {
    id: 3,
    question: t('stampMaker.faq.q3.question'),
    answer: t('stampMaker.faq.q3.answer'),
    isOpen: false,
  },
  {
    id: 4,
    question: t('stampMaker.faq.q4.question'),
    answer: t('stampMaker.faq.q4.answer'),
    isOpen: false,
  },
  {
    id: 5,
    question: t('stampMaker.faq.q5.question'),
    answer: t('stampMaker.faq.q5.answer'),
    isOpen: false,
  },
  {
    id: 6,
    question: t('stampMaker.faq.q6.question'),
    answer: t('stampMaker.faq.q6.answer'),
    isOpen: false,
  },
  {
    id: 7,
    question: t('stampMaker.faq.q7.question'),
    answer: t('stampMaker.faq.q7.answer'),
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
  title: t('stampMaker.seo.title'),
  description: t('stampMaker.seo.description'),
  ogTitle: t('stampMaker.seo.title'),
  ogDescription: t('stampMaker.seo.description'),
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: t('stampMaker.seo.title'),
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
  ogType: 'website',
  ogLocale: locale.value,
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: t('stampMaker.seo.title'),
  twitterDescription: t('stampMaker.seo.description'),
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: t('stampMaker.seo.title'),
    type: 'image/png',
  },
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    'name': 'Stampdy.com',
    'description': t('stampMaker.seo.description'),
    'url': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
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
          'name': 'Stamp Maker',
          'item': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
        },
      ],
    },
  },
  {
    '@type': 'WebApplication',
    'name': 'Stampdy.com',
    'applicationCategory': 'WebApplication',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '100',
    },
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '1.99',
      'priceCurrency': 'USD',
    },
  },
  {
    '@type': 'Service',
    'name': 'Stampdy.com',
    'serviceType': 'Stamp Services',
    'description': t('stampMaker.seo.description'),
    'provider': {
      '@type': 'Organization',
      'name': 'Stampdy.com',
      'url': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
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
    '@type': 'HowTo',
    'name': 'Stampdy.com',
    'description': t('stampMaker.seo.description'),
    'image': {
      '@type': 'ImageObject',
      'url': 'https://stampdy.com/og-stampdy.png',
      'height': 1107,
      'width': 2042,
      'alt': t('stampMaker.seo.title'),
      'type': 'image/png',
    },
    'totalTime': 'PT2M',
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'Stampdy Online Stamp Maker',
      },
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Step 1: Open the Online Stamp Maker',
        'text': `Visit ${locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`} and click on the design interface to start creating your stamp.`,
        'url': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
      },
      {
        '@type': 'HowToStep',
        'name': 'Step 2: Choose a Template',
        'text': 'Pick from round, rectangular, or custom-shaped templates that suit your needs. You can also start from scratch.',
        'url': locale.value === 'en' ? 'https://stampdy.com/stamp-template' : `https://stampdy.com/${locale.value}/stamp-template`,
      },
      {
        '@type': 'HowToStep',
        'name': 'Step 3: Customize Your Stamp',
        'text': 'Add your company name, logo, signature, or text. Adjust size, font, and alignment right in your browser.',
        'url': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
      },
      {
        '@type': 'HowToStep',
        'name': 'Step 4: Preview and Make Final Edits',
        'text': 'Use the live preview to ensure everything looks good. Make final tweaks to color, spacing, or layout.',
        'url': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
      },
      {
        '@type': 'HowToStep',
        'name': 'Step 5: Export Your Stamp',
        'text': 'Download your finished stamp design in PNG, SVG, or PDF format. It’s ready for printing or digital use.',
        'url': locale.value === 'en' ? 'https://stampdy.com/stamp-maker' : `https://stampdy.com/${locale.value}/stamp-maker`,
      },
    ],
  },
])

const editor = useTemplateRef('editor')

const templates = import.meta.glob('@/components/editor/templates/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, any>

const templateImgs = import.meta.glob('@/components/editor/templates/*.png', {
  eager: true,
  import: 'default',
  query: '?url&no-inline',
}) as Record<string, string>

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

const scrollToEditor = (item: any) => {
  if (item) {
    editor.value!.chooseTemplate(item)
  }
  // 直接通过 ID 选择器找到编辑器元素
  const editorElement = document.getElementById('stamp-editor')
  if (editorElement) {
    editorElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
</script>

<style scoped>
</style>
