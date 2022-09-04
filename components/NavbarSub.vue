<template>
  <header class="navbar-sub">
    <div class="navbar-sub__nav">
      <ul class="navbar-sub__nav-list">
        <li class="navbar-sub__nav-item"
          :class="[
            { 'active': activeNav === index },
          ]"
          v-for="(nav, index) in navLinks"
          :key="nav.text"
          @click="onClickNav(index)"
        >{{ nav.text }}</li>
      </ul>
    </div>

    <ul
      :class="[
        'navbar-sub__nav-sub',
        { 'active': showNavList },
      ]"
    >
      <template v-for="item in items">
        <template v-if="item.items">
          <li :key="item.text"
            class="navbar-sub__nav-sub__cate"
          >{{ item.text }}</li>
          <li v-for="it in item.items"
            :key="it.link"
            class="navbar-sub__nav-sub__item"
            @click="onClickItem(it.link)"
          >{{ it.text }}</li>
        </template>
        <li v-else
          :key="item.link"
          class="navbar-sub__nav-sub__item"
          @click="onClickItem(item.link)"
        >{{ item.text }}</li>
      </template>
    </ul>

    <div
      v-show="showNavList"
      class="navbar-sub__mask"
      @click="onClickNav(-1)"
    ></div>
  </header>
</template>

<script>
export default {
  name: 'NavbarSub',

  data () {
    return {
      activeNav: -1,
    }
  },

  computed: {
    showNavList() {
      return this.activeNav > -1
    },
    navLinks() {
      return this.$themeConfig.nav
    },
    items() {
      return this.showNavList ? this.navLinks[this.activeNav].items : []
    },
  },

  methods: {
    onClickNav(index) {
      if (index === -1) {
        this.activeNav = -1
        return
      }
      // 点击了 link
      if (this.navLinks[index].link) {
        this.$router.push(this.navLinks[index].link)
        return
      }
      // 展开另一个
      if (this.showNavList && this.activeNav !== index) {
        this.activeNav = index
        return
      }
      // 判断展开还是收起
      if (this.activeNav === index) { // 收起
        this.activeNav = -1
      } else { // 展开
        this.activeNav = index
      }
    },
    onClickItem(to) {
      // TODO：需要判断路由是一个 link 还是一个 links
      this.activeNav = -1
      this.$router.push(to)
    }
  }
}
</script>

<style lang="stylus">
$navListHeight = 35vh

.navbar-sub
  ul
    margin 0
    padding 0
    list-style none
  &__nav-list
    white-space nowrap
    height $navbarSubHeight
    line-height $navbarSubHeight
    overflow-x auto
    overflow-y hidden
    &::-webkit-scrollbar
      width: 0 !important;
      height: 0 !important;
  &__nav-item
    display inline-block
    padding 0 10px
    font-size 14px
    transition all .2s
    &:hover, &.active
      cursor pointer
      color $accentColor
      background-color var(--background-color)
  &__nav-sub
    z-index 99
    position absolute
    overflow auto
    top 50px
    width 100%
    height 0
    max-height 35vh
    font-size 14px
    background-color var(--background-color-block)
    box-shadow 1px 1px 3px 1px var(--background-color)
    &.active
      height auto
    &__cate
      margin-top 5px
      padding 5px 10px
      color #999
      font-weight bold
      &:not(:first-child)
        border-top 1px solid var(--text-color)
    &__item
      padding 2px 10px
      font-size 13px
      &:hover
        cursor pointer
        color $accentColor
        background-color var(--background-color)
.navbar-sub__mask
  z-index 1
  position fixed
  top 104px
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, .6)
</style>
