<template>
  <figure class="my-4 lg:my-6 ">
    <img
      v-bind="$attrs"
      class="w-full h-auto rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 max-w-2xl mx-auto"
      loading="lazy"
    >
    <figcaption
      v-if="$attrs.alt"
      class="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 text-center italic px-2 sm:px-4"
    >
      {{ $attrs.alt }}
    </figcaption>
  </figure>
</template>

<script setup>
console.log('ProseImg component loaded!')
</script>

<style scoped>

</style>
