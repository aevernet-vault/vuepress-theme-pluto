<template>
  <div>
    <ParentLayout>
      <!-- 添加 Valine 插件 -->
      <template #page-bottom>
        <ValineComment v-show="!hideComment" />
      </template>
    </ParentLayout>
    <ModePicker
      :mode = mode
      @change-mode = onChangeMode />
  </div>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import ModePicker from '@theme/components/ModePicker.vue'
import ValineComment from '@theme/components/ValineComment.vue'
import applyMode from '@theme/utils/darkMode'

export default {
  components: {
    ParentLayout,
    ModePicker,
    ValineComment
  },
  data() {
    return {
      mode: "auto"
    }
  },
  mounted() {
    // Get mode, if not set, default to "auto".
    if (this.$themeConfig && this.$themeConfig.modeOptions && this.$themeConfig.modeOptions.mode) {
      this.mode = this.$themeConfig.modeOptions.mode
    }
    applyMode(this.mode, this.$themeConfig.modeOptions)
  },
  computed: {
    // 扩展 hideComment
    hideComment () {
      return this.$themeConfig.hideComment || this.$page.frontmatter.hideComment
    },
  },
  methods: {
    onChangeMode(mode) {
      // console.log(`Change mode, old mode: ${this.mode}, new mode: ${mode}.`)
      this.mode = mode
      applyMode(mode, this.$themeConfig.modeOptions)
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
