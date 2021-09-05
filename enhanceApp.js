export default ({ router }) => {
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
}
