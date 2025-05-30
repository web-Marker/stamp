<script setup lang="ts">
const editor = useTemplateRef('editor')

const exportTemplate = () => {
  editor.value!.exportTemplate()
}

const downloadWithWatermark = () => {
  editor.value!.exportFreePNG()
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
</script>

<template>
  <div>
    <Navbar />
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="py-5 px-4 sm:px-6 lg:px-8 text-center mx-auto">
        <div class="mt-2 max-w-7xl text-center mx-auto">
          <h1 class="block font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl dark:text-neutral-200 leading-tight">
            <span class="block sm:inline">Free Online Stamp Maker</span> <br class="hidden sm:block">
            <span class="block sm:inline">Create Custom Stamps Instantly</span>
            <span class="block mt-2 bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">StampDy</span>
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-2 max-w-2xl lg:max-w-3xl text-center mx-auto px-4">
          <!-- 移动端简短描述 -->
          <p class="block sm:hidden text-base text-gray-600 dark:text-neutral-400 leading-relaxed">
            Free online stamp maker, create professional-quality stamps in minutes. No registration required.
          </p>

          <!-- 移动端按钮 - 添加到移动端描述后面 -->
          <div class="block sm:hidden mt-4">
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
          </div>

          <!-- 桌面端完整描述 -->
          <p class="hidden sm:block text-base sm:text-lg text-gray-600 dark:text-neutral-400 leading-relaxed">
            Design professional-quality stamps in minutes with our free online stamp maker. No registration required. Create personalized rubber stamps, signature stamps, and custom business stamps for any occasion.
          </p>
        </div>
      </div>
    </div>

    <Editor ref="editor" />

    <div class="flex justify-center m-2">
      <UButton size="lg" @click="exportTemplate">
        <span class="px-4">Export</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>
