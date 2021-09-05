module.exports = (themeConfig, ctx) => {
  return {
    extend: '@vuepress/theme-default',
    
    // 预安装插件
    plugins: [
      // A progress in top while skipping to other page
      '@vuepress/nprogress',
      // Show back-to-top icon
      '@vuepress/back-to-top',
      // Make scroll smoothly
      'vuepress-plugin-smooth-scroll',
      'element-tabs',
      'element-ui',
      'reading-progress',
      /**
       * 流程图
       * https://vuepress-plugin-mermaidjs.efrane.com/
       * https://mermaid-js.github.io/mermaid/#/?id=about-mermaid
       */
      'mermaidjs',
      // 一键复制代码：https://github.com/panxingcheng/vuepress-plugin-code-copy
      ['@xiaopanda/vuepress-plugin-code-copy'],
      // 字数统计：https://github.com/darrenjennings/vuepress-plugin-reading-time
      // ['vuepress-plugin-reading-time'],
      // Zoom the pic, see https://vuepress.github.io/zh/plugins/zooming/
      ['vuepress-plugin-zooming', {
        selector: '.content__default img',
        delay: 100,
        // More options see https://desmonding.me/zooming/docs/#/configuration?id=options
        options: {
          bgColor: 'rgba(0, 0, 0, .6)',
          zIndex: 999,
          transitionDuration: 0.2
        }
      }]
    ],

    // 配置 head 以及其他设置
  }
}