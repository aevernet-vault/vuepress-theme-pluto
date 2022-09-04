<template>
  <div class="navbar-active">
    <div
      class="navbar-active__sidebar"
      @click="$emit('toggle-sidebar', !isSidebarOpen)"
    >
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-shouqizhankai-${isSidebarOpen ? 'shouqi' : 'zhankai'}`"></use>
      </svg>
    </div>

    <div class="navbar-active__title">
      <BaseBreadcrumb
        :list="fullPath"
      />
    </div>

    <div
      v-if="showToc"
      class="navbar-active__toc"
      @click="$emit('toggle-toc', !isTocOpen)"
    >
      <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-shouqizhankai-${isTocOpen ? 'zhankai' : 'shouqi'}`"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import BaseBreadcrumb from '../components/Breadcrumb.vue'

function getNavPath(items, stack, path, prefix, postfix) {
  for (const item of items) {
    if (item.type === 'links') {
      stack.push({
        type: 'links',
        text: item.text
      })
      const ss = getNavPath(item.items, stack, path, prefix, postfix)
      if (ss && ss.length) return ss
    } else {
      if (
        item.link === path ||
        item.link === prefix ||
        item.link === prefix + postfix
      ) {
        stack.push({
          type: 'link',
          text: item.text,
          link: item.link
        })
        return stack   // 找到了
      } else {
        continue  // 不符合，进入下一轮循环
      }
    }
  }
  stack.pop()
}

function getSidebarPath(sidebar, stack, path, prefix, postfix) {
  if (!sidebar[prefix]) return []
  const cates = sidebar[prefix]
  for (const cate of cates) {
    for (const item of cate.children) {
      if (item[0] === postfix) {
        stack.push({
          type: 'links',
          text: cate.title
        })
        stack.push({
          type: 'link',
          text: item[1],
          link: path
        })
        break
      }
    }
  }
}

export default {
  name: 'NavbarActive',

  components: {
    BaseBreadcrumb,
  },

  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false
    },
    isTocOpen: {
      type: Boolean,
      default: false
    },
    sidebarItems: {
      type: Array,
      default: () => []
    },
    showToc: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    fullPath() {
      const { path } = this.$route
      const { nav, sidebar } = this.$themeConfig
      const stack = []
      /* '/programming-language/r/syntax.html' will resolve:
       * prefix => /programming-language/r/
       * postfix => syntax
       */
      const prefix = /\/.+\//.test(path)
        ? path.match(/\/.+\//)[0]
        : '/'
      const postfix = path.split('/').slice(-1)[0].split('.')[0]
      // 确定 nav 中的路径
      getNavPath(nav, stack, path, prefix, postfix)
      // 确定 sidebar 中的路径
      getSidebarPath(sidebar, stack, path, prefix, postfix)
      return stack
    }
  }
}
</script>

<style lang="stylus">
.navbar-active
  display flex
  line-height $navbarActiveHeight - 6px
  font-size 14px
  &__sidebar, &__toc
    width $navbarActiveHeight
    text-align center
    font-size 1.5rem
    &:hover
      cursor pointer
  &__title
    flex 1
    overflow-x auto
    overflow-y hidden
    white-space nowrap
    &::-webkit-scrollbar
      width: 0 !important;
      height: 0 !important;
</style>
