<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      :isSettingOpen="isSettingOpen"
      @toggle-setting="toggleSetting"
    />

    <NavbarSub
      v-if="showTools"
    />

    <NavbarActive
      v-if="showTools && $route.path !== '/'"
      :showToc="showToc"
      :sidebarItems="sidebarItems"
      :isSidebarOpen="isSidebarOpen"
      :isTocOpen="isTocOpen"
      @toggle-sidebar="toggleSidebar"
      @toggle-toc="toggleToc"
    />

    <!-- mask -->
    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />
    <div
      v-show="isTocOpen"
      class="toc-mask"
      @click="toggleToc(false)"
    ></div>
    <div
      v-show="isSettingOpen"
      class="setting-mask"
      @click="toggleSetting(false)"
    ></div>

    <main class="theme-main">
      <Sidebar
        v-show="$route.path !== '/'"
        :sidebarItems="sidebarItems"
        @toggle-sidebar="toggleSidebar"
      >
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>

      <Home v-if="$page.frontmatter.home" />
      <Page
        v-else
        :sidebar-items="sidebarItems"
      >
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <ValineComment v-show="!hideComment" />
          <slot name="page-bottom" />
        </template>
      </Page>

      <Toc
        v-show="!$frontmatter.hideToc"
        :sidebarItems="sidebarItems"
        :isTocOpen="isTocOpen"
      />

    </main>

    <Setting
      :isSettingOpen="isSettingOpen"
      @toggle-setting="toggleSetting"
      @change-mode="onChangeMode"
    />
  </div>
</template>

<script>
import Home from '@parent-theme/components/Home.vue'
import Page from '@parent-theme/components/Page.vue'

import Navbar from '@theme/components/NavBar.vue'
import NavbarSub from '@theme/components/NavbarSub.vue'
import NavbarActive from '@theme/components/NavbarActive.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import ModePicker from '@theme/components/ModePicker.vue'
import ValineComment from '@theme/components/ValineComment.vue'
import Toc from '@theme/components/Toc.vue'
import Setting from '@theme/components/Setting.vue'

import platformMixin from '../mixins/platform'

import { resolveSidebarItems } from '../utils'
import applyMode from '../utils/darkMode'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    NavbarSub,
    NavbarActive,
    ModePicker,
    ValineComment,
    Toc,
    Setting
  },

  mixins: [ platformMixin ],

  data () {
    return {
      isSidebarOpen: false,
      isTocOpen: false,
      isSettingOpen: false,
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    },

    hideComment () {
      return this.$themeConfig.hideComment || this.$page.frontmatter.hideComment
    },
  },

  mounted () {
    // Get mode, if not set, default to "auto".
    let mode = 'auto'
    if (this.$themeConfig && this.$themeConfig.modeOptions && this.$themeConfig.modeOptions.mode) {
      mode = this.$themeConfig.modeOptions.mode
    }
    applyMode(mode, this.$themeConfig.modeOptions)

    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    toggleToc(to) {
      this.isTocOpen = to
    },

    toggleSetting(to) {
      this.isSettingOpen = to
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    onChangeMode(mode) {
      // console.log(`Change mode, old mode: ${this.mode}, new mode: ${mode}.`)
      // this.mode = mode
      applyMode(mode, this.$themeConfig.modeOptions)
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
