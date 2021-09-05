<template>
  <div class="mode-picker">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__rubberBand"
      leave-active-class="animate__zoomOutRight"
    >
      <div
        v-show = "showMode"
        class="mode-list animate__animated">
        <span v-for="item in modeList" :key="item"
          :class="['mode-item', { 'active': item === mode }]"
          @click="onChangeMode(item)"
        > {{ item }}
        </span>
      </div>
    </transition>
    <div class="mode-picker__btn"
      v-click-outside="onHide"
      @click="onToggle"
    >
      <span>{{ mode === "auto" ? "自动" : mode === "light" ? "浅色" : "深色" }}</span>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: "mode-picker",
  props: {
    mode: {
      type: String,
    }
  },
  data() {
    return {
      showMode: false,
      modeList: ["light", "auto", "dark"]
    }
  },
  mounted() {
    this.popupItem = this.$el
  },
  methods: {
    onToggle() {
      this.showMode = !this.showMode
    },
    onHide() {
      this.showMode = false
    },
    onChangeMode(mode) {
      // const mode = this.mode === "auto" ? "light" : this.mode === "light" ? "dark" : "auto"
      this.$emit("change-mode", mode);
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="stylus" scoped>
.mode-picker
  z-index 999

.mode-picker__btn
  position fixed
  right 2.5rem
  bottom 4rem
  width 2rem
  height 2rem
  color var(--text-color)
  font-size 12px
  text-align center
  line-height 2rem
  background-color $accentColor
  border-radius 50%
  &:hover
    cursor pointer

.mode-list
  position fixed
  overflow hidden
  display flex
  flex-direction column
  right 2.5rem
  bottom 6.3rem
  width 2rem
  font-size 10px
  text-align center
  border-radius 10px
  background-color var(--background-color-block)
  .mode-item
    box-sizing border-box
    height 30px
    line-height 30px
    &:hover
      cursor pointer
    &.active
      background-color $accentColor

@media (max-width: $MQMobile)
  .mode-picker__btn, .mode-list
    right 1rem
</style>
