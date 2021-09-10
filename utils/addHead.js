// 向 head 中添加 style
export function addStyleToHead (href) {
  const iconLink = document.createElement('link')
  iconLink.rel = 'stylesheet'
  iconLink.href = href

  document.head.append(iconLink)
}

// 向 head 中添加 script
export function addScriptToHead (href) {
  const iconLink = document.createElement('script')
  iconLink.src = href

  document.head.append(iconLink)
}
