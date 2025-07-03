<template>
  <a :href="href" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup>
console.log('ProseA component loaded!')

defineProps({
  href: String,
})
</script>

<style scoped>
/* 外部链接的默认样式 */
.external-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.external-link:hover {
  color: #1d4ed8;
  border-bottom-color: #3b82f6;
}
</style>
