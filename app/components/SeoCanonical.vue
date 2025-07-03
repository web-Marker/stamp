<script setup>
const { locale } = useI18n()
const route = useRoute()
const i18n = useI18n()

// 定义仅英文版本的页面路径
const englishOnlyPaths = [
  '/blog',
  '/stamp-template',
  '/pdf-view',
  '/user-agreement',
  '/privacy',
]

// 检查当前路径是否为仅英文页面
const isEnglishOnly = computed(() => {
  const currentPath = route.path

  // 移除语言前缀获取纯路径
  const pathWithoutLocale = currentPath.replace(new RegExp(`^/${locale.value}`), '')
  const cleanPath = pathWithoutLocale || currentPath

  // 检查是否匹配仅英文路径
  return englishOnlyPaths.some((path) => {
    if (path === '/blog' || path === '/stamp-template') {
      // 对于 /blog 和 /stamp-template，匹配自身及其子路径
      return cleanPath === path || cleanPath.startsWith(`${path}/`)
    }
    // 其他路径精确匹配
    return cleanPath === path
  })
})

// 获取当前路径（不包括语言前缀）
const path = computed(() => {
  // 首页特殊处理
  if (route.path === '/' || route.path === `/${locale.value}`) {
    return ''
  }

  // 移除语言前缀的路径
  const pathWithoutLocale = route.path.replace(
    new RegExp(`^/${locale.value}`),
    '',
  )
  return pathWithoutLocale || ''
})

// 构建完整的规范 URL
const canonicalUrl = computed(() => {
  const baseUrl = 'https://stampdy.com'

  // 如果是仅英文页面，始终使用英文路径
  if (isEnglishOnly.value) {
    return `${baseUrl}${path.value}`
  }

  // 多语言页面根据当前语言构建路径
  const localePath = locale.value === 'en' ? path.value : `/${locale.value}${path.value}`
  return `${baseUrl}${localePath}`
})

// 为每种语言创建 alternate 链接
const alternateLinks = computed(() => {
  // 如果是仅英文页面，不生成 hreflang 标签
  if (isEnglishOnly.value) {
    return []
  }

  const baseUrl = 'https://stampdy.com'
  const links = []

  // 遍历配置中的所有语言
  const locales = i18n.locales.value

  for (const loc of locales) {
    const localePath = loc.code === 'en' ? path.value : `/${loc.code}${path.value}`

    links.push({
      rel: 'alternate',
      hreflang: loc.code,
      href: `${baseUrl}${localePath}`,
    })
  }

  // 添加 x-default 标签（指向默认语言）
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}${path.value}`, // 指向英文版本（默认语言）
  })

  return links
})

// 使用 watchEffect 监听路由变化并更新 canonical 和 alternate 标签
watchEffect(() => {
  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl.value,
        key: 'canonical',
      },
      ...alternateLinks.value,
    ],
  })
})
</script>

<template>
  <div />
</template>
