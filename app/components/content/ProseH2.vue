<template>
  <h2
    v-bind="$attrs"
    class="text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 mt-4 sm:mt-6 leading-tight tracking-tight  transition-colors duration-200"
  >
    <slot />
  </h2>
</template>

<script setup>
console.log('ProseH2 component loaded!')
</script>

<style scoped>

</style>
