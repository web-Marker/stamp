<template>
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
</template>

<script setup>

</script>

<style scoped>
</style>
