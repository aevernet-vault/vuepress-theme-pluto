<template>
  <div id="vcomment"></div>
</template>

<script>
export default {
  name: 'valine-comment',
  mounted () {
    import('valine').then(res => {
      this.Valine = res.default
      this.initValine()
    })
  },
  methods: {
    initValine() {
      if (!this.$themeConfig.valine) this.$themeConfig.valine = {}
      this.$themeConfig.valine.el = "#vcomment"
      new this.Valine(this.$themeConfig.valine)
    }
  },
  watch: {
    '$route' (to, from) {
      // 重新刷新 valine
      if(to.path !==  from.path){
        setTimeout(() => {
          this.initValine()
        }, 300)
      }
    }
  }
}
</script>

<style lang="stylus">
#vcomment {
  display: block;
  max-width: 840px;
  margin: auto;

  @media (max-width: 867px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 960px) and (max-width: 1124px) {
    padding: 0 1.5rem;
  }

  .vpanel {
    box-shadow: var(--box-shadow);

    .vwrap {
      border: none;
    }
  }

  .vcards .vquote {
    border-left: 1px dashed #aaa;
  }
}
</style>
