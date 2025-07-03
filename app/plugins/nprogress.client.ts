import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineNuxtPlugin((nuxtApp) => {
  // 配置 NProgress
  NProgress.configure({
    showSpinner: true, // 显示旋转器
    speed: 300, // 动画速度
    minimum: 0.1, // 最小进度
    easing: 'ease', // 动画缓动
    trickleSpeed: 200, // 自动递增间隔
    parent: 'body', // 父级元素
  })

  // 监听路由变化
  nuxtApp.hook('page:start', () => {
    NProgress.start()
  })

  nuxtApp.hook('page:finish', () => {
    NProgress.done()
  })

  nuxtApp.hook('page:loading:end', () => {
    NProgress.done()
  })

  // 首次加载处理
  if (import.meta.client) {
    // 页面加载时启动进度条
    NProgress.start()

    // 监听 DOM 内容加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => NProgress.done(), 100)
      })
    } else {
      // 如果已经加载完成，延迟一点结束进度条
      setTimeout(() => NProgress.done(), 200)
    }

    // 监听所有资源加载完成
    window.addEventListener('load', () => {
      NProgress.done()
    })
  }

  return {
    provide: {
      nprogress: NProgress,
    },
  }
})
