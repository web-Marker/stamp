<template>
  <div
    class="h-screen w-full flex flex-col items-center justify-center relative"
  >
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2" />
    <div v-if="!showViewer" class="text-center">
      <label
        for="pdf-upload"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-lg cursor-pointer inline-block transition duration-300 shadow-md transform hover:scale-110 text-xl"
      >
        Start PDF Editor

        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          class="hidden"
          @change="handleFileSelect"
        >
      </label>
    </div>

    <iframe
      v-if="showViewer"
      ref="pdfViewer"
      src="/web/viewer.html"
      width="100%"
      style="height: 100%; position: absolute; top: 0; left: 0"
    />
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

const pdfViewer = ref(null)
const showViewer = ref(false)

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return

  showViewer.value = true

  // 等待iframe加载完成
  nextTick(() => {
    const iframe = pdfViewer.value
    iframe.onload = () => {
      // 读取文件内容

      const reader = new FileReader()
      reader.onload = function (e) {
        // 将文件数据发送到iframe - 使用新的API格式
        iframe.contentWindow.postMessage(
          {
            type: 'OPEN_PDF_DATA',
            data: {
              data: new Uint8Array(e.target.result),
              filename: file.name, // 添加文件名，这在某些版本中可能需要
            },
          },
          '*',
        )
      }
      reader.readAsArrayBuffer(file)
    }
  })
}

useSeoMeta({
  title: 'View PDF with Stamps & Signatures Online – Free Tool | Stampdy',
  description: 'View PDF with stamps and signatures online. No downloads or registration needed — fast and secure',
  ogTitle: 'View PDF with Stamps & Signatures Online – Free Tool | Stampdy',
  ogDescription: 'View PDF with stamps and signatures online. No downloads or registration needed — fast and secure',
  ogImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: 'View PDF with Stamps & Signatures Online – Free Tool | Stampdy',
    type: 'image/png',
  },
  ogImageSecureUrl: 'https://stampdy.com/og-stampdy.png',
  ogUrl: 'https://stampdy.com/pdf-view',
  ogType: 'website',
  ogLocale: 'en_US',
  ogImageType: 'image/png',
  ogSiteName: 'Stampdy.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'View PDF with Stamps & Signatures Online – Free Tool | Stampdy',
  twitterDescription: 'View PDF with stamps and signatures online. No downloads or registration needed — fast and secure',
  twitterImage: {
    url: 'https://stampdy.com/og-stampdy.png',
    height: 1107,
    width: 2042,
    alt: 'View PDF with Stamps & Signatures Online – Free Tool | Stampdy',
    type: 'image/png',
  },
})
</script>

<style scoped>
</style>
