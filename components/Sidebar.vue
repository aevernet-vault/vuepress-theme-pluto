<template>
  <div class="sidebar">
    <div class="sidebar-cate"
      v-for="cate in sidebarItems"
      :key="cate.title"
    >
      <p class="sidebar-cate__title">{{ cate.title }}</p>
      <ul class="sidebar-cate__list">
        <li class="sidebar-cate__list__item"
          v-for="item in cate.children"
          :key="item.key"
        >
          <router-link
            :class="[
              'sidebar-link',
              { 'active': item.path === $route.fullPath.split('#')[0] }
            ]"
            :to="item.path"
          >{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  props: ['sidebarItems'],
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display block
  &-cate__title
    margin 8px 20px
    font-weight bold
  &-link
    padding 0 40px
    color var(--text-color)
    font-size .9rem
    font-weight normal
    &:hover
      color $accentColor
      background-color var(--border-color)
    &.active
      color $accentColor
      background-color var(--border-color)
</style>
