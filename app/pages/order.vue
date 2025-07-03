<template>
  <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
    <!-- 主要内容 -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- 加载状态 -->
      <div v-if="loading" class="text-center">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4" />
        <p class="text-gray-600">
          Preparing your download...
        </p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="errorMessage" class="max-w-md mx-auto">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div class="text-red-500 text-4xl mb-4">
            ❌
          </div>
          <h2 class="text-xl font-semibold text-red-800 mb-2">
            Download Failed
          </h2>
          <p class="text-red-600 mb-4">
            {{ errorMessage }}
          </p>
          <div class="flex flex-col gap-3">
            <button
              class="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              @click="handleDownload"
            >
              <span class="mr-2">🔄</span>
              Try Again
            </button>
            <NuxtLink
              to="/"
              class="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span class="mr-2">🏠</span>
              Return to Homepage
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 成功状态 -->
      <div v-else class="max-w-2xl mx-auto">
        <!-- 成功横幅 -->
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
          <div class="flex items-center">
            <div class="text-green-400 text-3xl mr-4">
              ✅
            </div>
            <div>
              <h2 class="text-lg font-semibold text-green-800">
                Payment Successful!
              </h2>
              <p class="text-green-600">
                Your stamp files are ready for download
              </p>
            </div>
          </div>
        </div>

        <!-- 主要内容卡片 -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- 头部 -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 text-white text-center">
            <h1 class="text-2xl font-bold mb-2">
              🎉 Your Digital Stamp is Ready!
            </h1>
            <p class="text-indigo-100">
              Thank you for choosing Stampdy
            </p>
          </div>

          <!-- 下载按钮区域 -->
          <div class="p-8">
            <div class="text-center mb-6">
              <button
                :disabled="downloading"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed mb-4"
                @click="handleDownload"
              >
                <span v-if="downloading" class="mr-3">
                  <div class="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                </span>
                <span v-else class="mr-3">📁</span>
                {{ downloading ? 'Downloading...' : 'Download Your Stamp Files' }}
              </button>

              <!-- 自动下载提示 -->
              <div v-if="autoDownloaded" class="text-sm text-green-600 mb-4">
                ✅ Files automatically downloaded! Check your downloads folder.
              </div>

              <p class="text-gray-600 text-sm">
                Click the button above if the download doesn't start automatically
              </p>
            </div>

            <!-- 包含内容说明 -->
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h4 class="font-semibold text-amber-800 mb-3 flex items-center">
                <span class="mr-2">📦</span>
                What's included in your download:
              </h4>
              <ul class="text-amber-700 text-sm space-y-1">
                <li class="flex items-center">
                  <span class="mr-2">🖼️</span> High-resolution PNG files (300 DPI)
                </li>
                <li class="flex items-center">
                  <span class="mr-2">📐</span> Scalable SVG vector files
                </li>
                <li class="flex items-center">
                  <span class="mr-2">📄</span> Print-ready PDF format
                </li>
                <li class="flex items-center">
                  <span class="mr-2">📋</span> Editable DOCX file
                </li>
              </ul>
            </div>

            <!-- 按钮组 -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <span class="mr-2">🏠</span>
                Return to Homepage
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 支持信息 -->
        <div class="mt-8 text-center">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Need Help?
            </h3>
            <p class="text-gray-600 mb-4">
              If you have any questions or need assistance with your stamp files, we're here to help!
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a href="mailto:service@stampdy.com" class="flex items-center text-indigo-600 hover:text-indigo-700">
                <span class="mr-2">📧</span>
                service@stampdy.com
              </a>
              <div class="flex items-center text-gray-500">
                <span class="mr-2">⏰</span>
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useHead({
  title: 'Download Your Stamp - Stampdy',
  meta: [
    { name: 'description', content: 'Download your professionally created digital stamp files.' },
  ],
})

// 响应式数据
const route = useRoute()
const sessionId = ref(route.query.sessionId || '')
const loading = ref(true)
const downloading = ref(false)
const autoDownloaded = ref(false)
const errorMessage = ref('')

// 下载文件
const handleDownload = async () => {
  try {
    loading.value = true
    downloading.value = true
    errorMessage.value = ''

    if (!sessionId.value) {
      throw new Error('No session ID provided')
    }

    const response = await $fetch(`/api/orders/download?sessionId=${sessionId.value}`)

    if (response.success && response.fileData) {
      // 将 base64 转换为 blob
      const binaryString = atob(response.fileData.split(',')[1] || response.fileData)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const blob = new Blob([bytes], { type: response.mimeType || 'application/zip' })

      // 创建下载链接
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = response.fileName || 'stamp-pack.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // 设置自动下载标记
      if (loading.value) {
        autoDownloaded.value = true
      }
    } else {
      throw new Error('No files available for download')
    }
  } catch (error) {
    console.error('Error downloading files:', error)
    const err = error as Error
    errorMessage.value = err.message || 'Failed to download files'
  } finally {
    loading.value = false
    downloading.value = false
  }
}

// 页面加载时自动下载
onMounted(() => {
  // 延迟1秒后自动下载
  setTimeout(() => {
    handleDownload()
  }, 1000)
})

// 监听路由变化
watch(() => route.query.sessionId, (newSessionId) => {
  if (newSessionId && newSessionId !== sessionId.value) {
    sessionId.value = newSessionId as string
    autoDownloaded.value = false
    errorMessage.value = ''
    loading.value = true
    setTimeout(() => {
      handleDownload()
    }, 1000)
  }
})
</script>
