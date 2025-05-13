<script setup lang="ts">
const editor = useTemplateRef('editor')
</script>

<template>
  <div>
    <Navbar />
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/header-bg-element.svg')]  before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      <div class="mt-5  text-center mx-auto">
        <div class="mt-5 max-w-8xl text-center mx-auto">
          <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
            Free Online Stamp Maker <br>
            Create Custom Stamps Instantly
            <span class="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">StampDy</span>
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-5 max-w-3xl text-center mx-auto">
          <p class="text-lg text-gray-600 dark:text-neutral-400">
            Design professional-quality stamps in minutes with our free online stamp maker. No registration required. Create personalized rubber stamps, signature stamps, and custom business stamps for any occasion.
          </p>
        </div>
      </div>
    </div>

    <Editor ref="editor" />
  </div>
</template>

<style scoped>

</style>
