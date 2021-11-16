export default {
  data() {
    return {
      clientWidth: 0,
      MQNarrow: 1359,
      MQMobile: 1199,
      MQMobileNarrow: 999
    }
  },

  computed: {
    // 平板模式：隐藏 sidebar
    showTools() {
      return this.clientWidth <= this.MQMobile
    },
    showToc() {
      return this.clientWidth < this.MQMobileNarrow
    }
  },

  mounted() {
    this.clientWidth = document.documentElement.clientWidth
    window.addEventListener('resize', this.onResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.clientWidth = document.documentElement.clientWidth
      // console.log(this.clientWidth)
    }
  }
}
