import { addStyleToHead, addScriptToHead } from './utils/addHead'

export default ({
  Vue,
  router,
  options,
  siteData,
  isServer
}) => {
  // 路由切换事件处理
  router.beforeEach((to, from, next) => {
    // 触发百度的 pv 统计
    if (typeof _hmt != 'undefined') {
      if (to.path !== from.path) {
        _hmt.push(['_trackPageview', to.fullPath])
      }
    }
    next()
  })

  // 扩充 head
  if (!isServer) {
    addStyleToHead("https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css")
    addStyleToHead("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css")
  }
}
