<template>
  <div :class="[
      'toc',
      { 'toc-open': isTocOpen }
    ]"
  >
    <ul class="toc-list">
      <li class="toc-item"
        v-for="(item, index) in headers"
        :key="index"
        :class="[`depth-${item.level}`]"
      >
        <!-- 一定要加上 sidebar-link 这个 class，这样 plugin-active-header-links 才会识别 -->
        <a
          :class="[
            'toc-link',
            'sidebar-link',
            { 'active': isActive($route, $page.path + '#' + item.slug) }
          ]"
          :href="`#${item.slug}`"
        >{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { isActive } from '../utils'

export default {
  name: 'Toc',

  props: {
    isTocOpen: {
      type: Boolean,
      defalut: false
    }
  },

  computed: {
    path() {
      return this.$route.path
    },
    headers() {
      return this.$page.headers
    }
  },

  methods: {
    isActive
  }
}
</script>

<style lang="stylus">
.toc
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display block
  &-list
    margin-top 10px
    list-style none
  &-item
    &:hover, &.active
      color $accentColor
      background-color var(--border-color)
    &:hover
      cursor pointer
    &.depth-3
      a
        padding-left 30px
    &.depth-4
      a
        padding-left 50px
.toc-link
  padding 0 10px
  color var(--text-color)
  font-weight normal
  font-size .9rem
  &:hover
    color $accentColor
    background-color var(--border-color)
  &.active
    color $accentColor
    background-color var(--border-color)
</style>
