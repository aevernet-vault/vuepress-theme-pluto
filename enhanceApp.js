import { addStyleToHead, addScriptToHead } from './utils/addHead'

export default ({
  Vue,
  router,
  options,
  siteData,
  isServer
}) => {
  // 扩充 head
  if (!isServer) {
    addStyleToHead("https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css")
    addStyleToHead("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css")
    addScriptToHead("https://at.alicdn.com/t/font_2836868_cjzakecqvyl.js?spm=a313x.7781069.1998910419.47&file=font_2836868_cjzakecqvyl.js")
  }
}
