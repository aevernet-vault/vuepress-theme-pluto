<template>
  <div
    :class="[
      'setting',
      { 'active': isSettingOpen }
    ]"
  >
    <div class="setting-header">
      <span>设置</span>
      <span
        class="setting-header__icon"
        @click="onCloseSetting"
      >
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi1"></use>
        </svg>
      </span>
    </div>

    <div class="setting-option">
      <span class="setting-options__header">主题色</span>
      <input type="radio" v-model="colorMode" value="light" id="color-light">
      <label for="color-light">light</label>
      <input type="radio" v-model="colorMode" value="auto" id="color-auto">
      <label for="color-auto">auto</label>
      <input type="radio" v-model="colorMode" value="dark" id="color-dark">
      <label for="color-dark">dark</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',

  props: {
    isSettingOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      colorMode: 'auto'
    }
  },

  methods: {
    onCloseSetting() {
      this.$emit('toggle-setting', false)
    }
  },

  watch: {
    colorMode(newMode) {
      this.$emit('change-mode', newMode)
    }
  }
}
</script>

<style lang="stylus">
.setting
  z-index 999
  position fixed
  top 0
  right 0
  width 300px
  height 100vh
  background-color var(--background-color-block)
  transition transform .3s
  transform translateX(300px)
  &.active
    transform translateX(0)
  &-header
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    height $navbarHeight
    padding 10px 22.5px
    font-size 1rem
    &__icon
      &:hover
        cursor pointer
  &-option
    margin 10px 22.5px
</style>
