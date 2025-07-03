<template>
  <NuxtLayout name="landing">
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()

// 获取当前语言的配置
const currentLocale = computed(() => {
  return (
    locales.value.find(l => l.code === locale.value) || {
      dir: 'ltr',
      iso: 'en-US',
    }
  )
})

// 动态设置HTML属性
useHead({
  htmlAttrs: computed(() => ({
    lang: currentLocale.value.iso?.split('-')[0] || locale.value,
    dir: currentLocale.value.dir,
  })) as any,
})
</script>
