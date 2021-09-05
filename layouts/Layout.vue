<template>
  <div>
    <ParentLayout>
      <!-- <template #page-top>
        <PageFooter v-if="$route.path === '/'" />
        <PageFooter />
      </template> -->
    </ParentLayout>
    <ModePicker
      :mode = mode
      @change-mode = onChangeMode />
  </div>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
// import PageFooter from '@theme/components/PageFooter.vue'
import ModePicker from '@theme/components/ModePicker.vue'
import applyMode from '@theme/utils/darkMode'

export default {
  components: {
    ParentLayout,
    // PageFooter,
    ModePicker
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
