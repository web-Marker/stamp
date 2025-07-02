<script setup lang="ts">
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

const stampTypes = [
  'India seals', 'Company seals', 'Design seals', 'Custom stamps',
  'Bank stamps', 'Medical stamps', 'Businness stamps', 'Wedding stamps',
  'Justice stamps', 'Notary stamps', 'Library seal', 'Rubber Stamp',
  'Government seal', 'Corporate stamps', 'Stamp received', 'School stamp',
  'Text stamp', 'Date stamp', 'Logo stamp', 'Red stamp', 'Square seal',
  'Chinese seal', 'Deposit only stamp', 'Address stamp',
]

// FAQ 数据数组
const faqs = ref([
  {
    id: 1,
    question: 'What does it mean to "make a stamp online"?',
    answer: 'Making a stamp online simply means designing your custom stamp layout using a digital tool—like the one on <a href="https://stampdy.com" class="hover:underline text-blue-500">stampdy.com</a>—without needing graphic software or visiting a store. With our stamp maker online free, you can customize shapes, add text, logos, and download your stamp instantly in SVG or PNG.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'What can I use an online stamp for?',
    answer: 'You can use an online stamp for all sorts of things—signing documents, marking books, creating packaging labels, or even for branding your business. Whether it\'s a personal project or something official, a digital stamp can save you time and give your materials a professional touch.',
    isOpen: false,
  },
  {
    id: 3,
    question: 'How do I create a rubber stamp online?',
    answer: 'Just head over to <a href="https://stampdy.com" class="hover:underline text-blue-500">stampdy.com</a> and use our intuitive stamp generator online. Choose your shape (round, square, etc.), type in your text, adjust fonts, add a logo if needed—and your stamp layout is ready to download. You can then send it to any print shop or manufacturer to produce your physical rubber stamp.',
    isOpen: false,
  },
  {
    id: 4,
    question: 'Is your stamp maker online free?',
    answer: 'Our stamp maker online is free to use when it comes to designing and editing your custom stamp. You can explore templates, add text, and customize everything without paying a cent. When you\'re ready to download a high-resolution, watermark-free version, a small fee applies — but there are no hidden charges, and you only pay when you\'re happy with the result.',
    isOpen: false,
  },
  {
    id: 5,
    question: 'Can I create a company seal using your online seal maker?',
    answer: 'Absolutely! Our seal maker lets you design official-looking company seals quickly. You can enter your business name, registration number, and even upload your company logo. With precise alignment tools, your seal is ready to print or emboss in just a few clicks.',
    isOpen: false,
  },
  {
    id: 6,
    question: 'How much does it cost to make a physical rubber stamp?',
    answer: 'Designing your layout on StampDy is free. For physical production, prices usually range between $10–$25 depending on the material (plastic, wood, metal) and size. Some vendors may offer bulk discounts or free shipping. You just take your downloaded design and send it to the manufacturer you prefer.',
    isOpen: false,
  },
  {
    id: 7,
    question: 'Where can I get my stamp printed after designing it online?',
    answer: 'Once you download your design from StampDy, you can take it to any local print shop or order from an online rubber stamp creator. Our files are fully compatible with all major printing systems globally. You\'re not locked into any single provider.',
    isOpen: false,
  },
  {
    id: 8,
    question: 'How can I make a round stamp design?',
    answer: 'Round stamps are the most popular for company seals and personal monograms. On StampDy, just choose the round template, enter your text around the edges, pick a center logo or icon, and adjust font size, spacing, and alignment. The online stamp maker gives you real-time previews as you customize.',
    isOpen: false,
  },
  {
    id: 9,
    question: 'Is it possible to add logos or custom images to my stamp?',
    answer: 'Yes! Our stamp generator online supports adding SVG images, which means you can upload your brand logo or any custom graphic. This is perfect for businesses, schools, and personal stamps with a unique touch.',
    isOpen: false,
  },
  {
    id: 10,
    question: 'Can I edit my stamp after downloading it?',
    answer: 'You can keep tweaking your design as long as you want before downloading. After downloading, if you realize you want to change something, just re-upload the file to StampDy or start a new one. Editing is fast and free.',
    isOpen: false,
  },
  {
    id: 11,
    question: 'Is this tool suitable for official government or corporate seals?',
    answer: 'Yes. Our seal maker tool has been used by small businesses, government offices, and even law firms. You can add required info like registration numbers, legal text, and follow official layout conventions. Your seal will be accurate and professional.',
    isOpen: false,
  },
  {
    id: 12,
    question: 'Can I make a triangle or square-shaped stamp?',
    answer: 'Definitely. While most people go for round stamps, our online stamp maker also offers square, rectangle, and triangle shapes. You can fully customize the frame, text, and even combine shapes creatively for a unique layout.',
    isOpen: false,
  },
  {
    id: 13,
    question: 'What file formats can I download my stamp in?',
    answer: 'You can download your stamp design in PNG, SVG, PDF, or even DOCX formats. Whether you want to print, use it digitally, or insert it into a Word document, we\'ve got you covered.',
    isOpen: false,
  },
  {
    id: 14,
    question: 'Will my stamp have a watermark?',
    answer: 'Nope. Your final downloaded file will be completely clean—no StampDy logos or watermarks. The design is 100% yours to use for business, personal, or legal purposes.',
    isOpen: false,
  },
  {
    id: 15,
    question: 'Can I use my phone to make a stamp online?',
    answer: 'Yes, StampDy is mobile-friendly. Whether you\'re on a phone, tablet, or desktop, the tool works smoothly. So even if you\'re on the go, you can create a stamp online in minutes.',
    isOpen: false,
  },
  {
    id: 16,
    question: 'Is creating a digital stamp cheaper than offline services?',
    answer: 'Absolutely. When you use an online rubber stamp creator like StampDy, you cut out the middleman, skip the travel, and avoid unnecessary design fees. It\'s not just faster—it\'s more affordable, especially if you need multiple designs or revisions.',
    isOpen: false,
  },
  {
    id: 17,
    question: 'Can I simulate a real rubber stamp look in Word?',
    answer: 'Yes, many of our users download their stamp in PNG or SVG and paste it directly into Word. You can add shadow or ink-style effects using WordArt for a realistic stamped appearance—great for digital signatures or document approval visuals.',
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
</script>

<template>
  <div>
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
        <div class="mt-2 max-w-5xl text-center mx-auto ">
          <h1 class="block font-bold text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
            Free Online Stamp Maker Create — <span class="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">StampDy</span>
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
          Design professional-quality stamps in minutes with our free online stamp maker. No registration required. Create personalized rubber stamps, signature stamps, and custom business stamps for any occasion.
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
          📝 Design Your Stamp Online — Fast, Easy, and Free with StampDy
        </h2>

        <p>Looking for a simple, powerful, and free way to <NuxtLink to="/" class="hover:underline text-blue-500">make stamps online</NuxtLink>?</p>

        <p>Welcome to StampDy — your all-in-one stamp maker built for modern users. Whether you're a small business owner, a freelancer, a teacher, a notary, or just someone planning a special event, StampDy helps you design and download high-quality custom stamps right from your browser.</p>

        <p>Forget outdated software and expensive designers. With StampDy's online <NuxtLink to="/stamp-maker" class="hover:underline text-blue-500">stamp maker</NuxtLink>, everything happens in one smooth, interactive editor — no installs, no technical skills required.</p>

        <h2 class="text-2xl font-semibold mt-8 mb-4">
          ✅ Why Create a Stamp Online Today?
        </h2>

        <p>The way we work has changed. We now send contracts digitally, shop from our phones, and design business cards in the cloud. So why are people still going to print shops to design stamps?</p>

        <p>StampDy brings the entire stamp design process online — making it faster, cheaper, and far more flexible. No waiting, no back-and-forth. You're in control.</p>

        <p>With our stamp generator online, you can:</p>
        <ul class="list-disc pl-4 space-y-1 list-none">
          <li>Create stamps anytime, 24/7 — from desktop or mobile</li>
          <li>Customize shape, text, logo, and size with full control</li>
          <li>See real-time previews as you edit</li>
          <li>Export in the format you need: SVG, PNG, PDF, or DOCX</li>
          <li>Download and use your custom stamp instantly</li>
        </ul>

        <p>Whether you need a rubber seal maker, a business stamp generator, or a personal monogram stamp, StampDy is the easiest way to bring your idea to life.</p>

        <h2 class="text-2xl font-semibold mt-8">
          🧰 What Can You Do with StampDy?
        </h2>

        <p>StampDy is a professional-grade yet beginner-friendly online stamp maker built for real-world needs. Whether you're creating a company seal, a signature stamp, or a wedding monogram, our stamp generator online gives you the freedom to bring your idea to life in just minutes.</p>

        <p>Here's what you can do with StampDy:</p>
        <ul class="list-disc pl-4 space-y-1 list-none">
          <li>✔️ Design stamps in various shapes — round, rectangular, oval, or triangle</li>
          <li>✔️ Add custom text: company name, address, date, or any personal message</li>
          <li>✔️ Upload logos or icons to create a branded rubber stamp</li>
          <li>✔️ Adjust font styles, size, spacing, rotation, and alignment</li>
          <li>✔️ Customize borders and frames with flexible styling options</li>
          <li>✔️ Choose from multiple ink colors (for visual reference)</li>
          <li>✔️ Export your final design in SVG, PNG, PDF, or DOCX formats</li>
          <li>✔️ Save projects and edit later — your work is auto-saved in your browser</li>
        </ul>

        <p>Whether you're looking for an online rubber stamp creator for professional or personal use, StampDy gives you the tools and flexibility you need — no design background required.</p>

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
                          Design your stamp online in minutes — no hassle.
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
                            Just choose a template, type in your details, and tweak it to your liking.
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
                            Our stamp maker lets you add logos, adjust fonts, and see changes live.
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
                            Download in SVG, PNG, PDF, or DOCX — perfect for any use.
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
                            Whether it's for business or personal use, our stamp generator online makes it fast and easy.
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

                            <span>Try for FREE</span>
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
          🛠️ How to Create Your Stamp Online with StampDy
        </h2>

        <p>Creating a custom stamp with StampDy is as easy as typing your name. Our intuitive stamp maker online free lets anyone build a stamp design in just a few simple steps.</p>

        <ol class="list-decimal pl-6 space-y-2 list-none font-normal">
          <li><span class="font-medium ">1. Choose Your Stamp Shape</span><br>Start by selecting the shape of your stamp — circle, rectangle, triangle, or oval. Each shape supports different layout needs and looks.</li>
          <li><span class="font-medium">2. Set the Size</span><br>Define your stamp dimensions (diameter or width & height) — the editor will reflect this in real-time.</li>
          <li><span class="font-medium ">3. Add Text</span><br>Enter your custom text. You can add text along the inner or outer frame, or place it in the center. All text elements can be resized, rotated, and aligned.</li>
          <li><span class="font-medium">4. Upload a Logo or Image</span><br>Want to include a logo, icon, or signature? Simply upload an SVG image and position it where you want. You can also choose from our gallery of default symbols.</li>
          <li><span class="font-medium">5. Customize Styling</span><br>Play with fonts, colors, borders, line breaks, spacing, and more. With StampDy, you get pixel-level precision.</li>
          <li><span class="font-medium">6. Preview and Save</span><br>Check the real-time preview and make edits until you're satisfied. You can save the design and come back to it anytime.</li>
          <li><span class="font-medium">7. Export Your Stamp</span><br>Download your stamp in multiple file formats — perfect for digital use or for production at a print shop.</li>
        </ol>

        <h2 class="text-2xl font-semibold mt-8">
          🎨 Templates & Personalization
        </h2>

        <p>Not sure where to start? StampDy offers a growing collection of ready-to-edit <NuxtLink to="/stamp-template" class="hover:underline text-blue-500">stamp templates</NuxtLink> — perfect for saving time and getting inspired.</p>

        <p>From official business seals to decorative wedding stamps, our templates are fully customizable. Whether you're creating a medical stamp, notary stamp, education stamp, or just a unique personal design, you'll find layouts that fit.</p>

        <p>You can:</p>
        <ul class="list-disc pl-6 space-y-1 list-none">
          <li>Select a base template and simply edit the text and logo</li>
          <li>Customize font style, spacing, and alignment</li>
          <li>Add your own graphics or choose from icon categories like law, food, medicine, and more</li>
          <li>Preview everything live before downloading</li>
        </ul>

        <p>Our online rubber stamp creator makes it easy to go from template to final design — with no need to start from scratch.</p>

        <h2 class="text-2xl font-semibold mt-8">
          💾 Download and Use Anywhere
        </h2>

        <p>Once your stamp is ready, you can download it instantly in any of these formats:</p>
        <ul class="list-disc pl-6 space-y-1 list-none">
          <li> <span class="font-medium">SVG</span> – great for professional production and vector editing</li>
          <li> <span class="font-medium">PNG</span> – ideal for websites, emails, and lightweight use</li>
          <li> <span class="font-medium">PDF</span> – perfect for attaching to official documents</li>
          <li> <span class="font-medium">DOCX</span> – easy for inserting into Word files or reports</li>
        </ul>

        <p>Whether you're using your design digitally or sending it to a stamp manufacturer, StampDy ensures that you have the right format at your fingertips.</p>

        <p>Need a stamp generator online that works across devices? Our platform is 100% browser-based, mobile-friendly, and doesn't require installation.</p>
      </div>
    </section>

    <section class="lg:hidden bg-white text-gray-800 py-10 px-4 sm:px-6 md:px-8">
      <div class="max-w-3xl mx-auto space-y-4 leading-relaxed text-base font-normal">
        <h2 class="text-xl font-semibold mb-3">
          📝 Make Custom Stamps Online — Fast & Easy with StampDy
        </h2>

        <p>Need a simple, fast way to <NuxtLink to="/" class="text-blue-500 underline">make stamps online</NuxtLink>? You’re in the right place.</p>

        <p>StampDy is your friendly <strong>stamp maker</strong> — whether you're a freelancer, small biz owner, teacher, or planning an event. No software. No design skills. Just tap, type, and go.</p>

        <h2 class="text-xl font-semibold mt-6">
          🎨 Choose from Templates or Create Your Own
        </h2>

        <p>Not sure where to start? We offer editable <NuxtLink to="/stamp-template" class="text-blue-500 underline">stamp templates</NuxtLink> to help you hit the ground running.</p>
        <p>Customize fonts, upload your logo, adjust spacing — it’s all live and mobile-friendly.</p>

        <h2 class="text-xl font-semibold mt-6">
          ⚙️ What You Can Do with StampDy
        </h2>

        <ul class="list-disc pl-5 space-y-1">
          <li>Create stamps anytime, anywhere — mobile-ready</li>
          <li>Edit shapes: round, square, triangle, oval</li>
          <li>Add logos, custom text, adjust fonts and borders</li>
          <li>See real-time previews as you work</li>
          <li>Export to SVG, PNG, PDF, DOCX</li>
          <li>Save and re-edit anytime in your browser</li>
        </ul>

        <p>Whether for business or personal use, our <strong>stamp generator online</strong> makes it simple and smooth.</p>

        <h2 class="text-xl font-semibold mt-6">
          📲 Designed for Mobile, Built for You
        </h2>

        <p>No app needed. Just open StampDy in your browser and start creating. Our <strong>online rubber stamp creator</strong> works seamlessly on all devices.</p>

        <h2 class="text-xl font-semibold mt-6">
          💡 How It Works
        </h2>

        <ol class="list-decimal pl-6 space-y-1">
          <li>Pick a shape: circle, rectangle, oval, or triangle</li>
          <li>Set size & dimensions</li>
          <li>Type your text — inner, outer, or center layout</li>
          <li>Upload a logo or pick a built-in symbol</li>
          <li>Style it: fonts, borders, alignment, colors</li>
          <li>Preview and save anytime</li>
          <li>Download your stamp — ready to use!</li>
        </ol>

        <h2 class="text-xl font-semibold mt-6">
          📥 Instant Download
        </h2>

        <ul class="list-disc pl-5 space-y-1">
          <li><strong>SVG</strong> — scalable & engraver-ready</li>
          <li><strong>PNG</strong> — high-res with transparent background</li>
          <li><strong>PDF</strong> — perfect for official documents</li>
          <li><strong>DOCX</strong> — insert easily into Word</li>
        </ul>

        <p>From digital use to stamp manufacturing, StampDy gives you all the formats you need in one place.</p>

        <h2 class="text-xl font-semibold mt-6">
          🚀 Try StampDy Today
        </h2>

        <p>Thousands use our <strong>stamp maker</strong> every day to design beautiful, professional stamps in minutes.</p>
        <p>👉 Tap below and start creating — no login required.</p>

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
                      Design your stamp online in minutes — no hassle.
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
                        Just choose a template, type in your details, and tweak it to your liking.
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
                        Our stamp maker lets you add logos, adjust fonts, and see changes live.
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
                        Download in SVG, PNG, PDF, or DOCX — perfect for any use.
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
                        Whether it's for business or personal use, our stamp generator online makes it fast and easy.
                      </span>
                    </li>
                  </ul>
                  <div class="flex justify-center">
                    <NuxtLink to="/stamp-maker" target="_blank">
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

                          <span>Try for FREE</span>

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
