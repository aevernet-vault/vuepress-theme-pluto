<template>
  <div class="error">
    <transition
      name="tada"
      enter-active-class="animate__animated animate__tada"
    >
      <div v-show="isShow" class="error-text">404</div>
    </transition>

    <transition
      name="fade-in"
      enter-active-class="animate__animated animate__fadeIn"
    >
      <p v-show="showText" class="link-text">
        <a href="#" @click="$router.go(-1)">Back</a>
        <a href="#" @click="$router.push('/')">Home</a>
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      showText: false
    }
  },
  mounted() {
    this.isShow = true
    setTimeout(() => {
      this.showText = true
    }, 300);
  }
}
</script>

<style lang="stylus" scoped>
.error
  position relative
  height 100vh
  color var(--text-color)
  background-color var(--background-color)
  &-text
    position absolute
    top 100px
    left 50%
    margin-left -25%
    width 50%
    text-align center
    font-size 100px
  .link-text
    position absolute
    top 200px
    left 50%
    margin-left -25%
    width 50%
    text-align center
    font-size 30px
    @media (max-width: $MQMobile) {
      font-size 20px
    }
    a
      margin 0 10px
</style>
