<template>
  <SeoCanonical :key="route.fullPath" />
  <div class="flex flex-col min-h-screen ">
    <NavBar />
    <slot />
    <Footer />

    <!-- 回到顶部按钮 -->
    <div
      v-show="showScrollToTop"
      class="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out transform hover:scale-110"
      :class="showScrollToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'"
    >
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 控制按钮显示/隐藏
const showScrollToTop = ref(false)

// 滚动到顶部的函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 监听滚动事件
const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 300
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>

</style>
