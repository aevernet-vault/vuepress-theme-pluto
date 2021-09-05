<template>
  <div class="ct" ref="ct">
    <!-- welcome -->
    <transition name="fade">
      <router-link v-if="showStart"
        :to="start" tag="div"
        class="start"
      >开始阅读 →</router-link>
    </transition>


    <!-- cate bubble -->
    <router-link class="cate" ref="cate"
      :to="cate.link" tag="div"
      :style="cateStyle()"
      v-for="cate in cates" :key="cate.text">
      <span>{{ cate.text }}</span>
    </router-link>
  </div>
</template>

<script>
function setVh () {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })
}

export default {
  data () {
    return {
      showStart: false
    }
  },
  mounted () {
    setVh()
    this.showStartTimer = setTimeout(() => {
      this.showStart = true
    }, 1000)
  },
  beforeDestroy () {
    this.showStartTimer && clearTimeout(this.showStartTimer)
  },
  computed: {
    nav () {
      return this.$themeConfig.nav
    },
    cates () {
      return this.extractCates(this.nav)
    },
    start () {
      return this.cates[0].link
    }
  },
  methods: {
    extractCates (nav) {
      let res = []
      for (let i = 0; i < nav.length; i++) {
        if (nav[i].items && nav[i].items.length) {
          res = res.concat(this.extractCates(nav[i].items))
        } else {
          res.push(nav[i])
        }
      }
      return res
    },
    randomColor () {
      const h = Math.floor(Math.random() * 360)     // 色相：均可
      const s = Math.floor(Math.random() * 30 + 60) // 饱和度：60%~90%
      const l = Math.floor(Math.random() * 40 + 30) // 亮度：30%~70%
      return `hsl(${h}, ${s}%, ${l}%)`
    },
    cateStyle () {
      const color = this.randomColor()
      return {
        left: 0,
        top: 0,
        backgroundColor: color,
        boxShadow: `${color} 0px 2px 10px`
      }
    }
  }
}
</script>

<style lang="scss" scope>

$cate-width: 100px;
$cate-width--min: 60px;

.ct {
  overflow: hidden;
  position: fixed;
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #3c4863;
  .start {
    z-index: 10;
    position: absolute;
    width: 100px;
    margin: auto;
    top: 40%;
    left: 0;
    right: 0;
    padding: 20px 25px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background-color: #009ac4;
    border-radius: 10px;
    cursor: pointer;
    /* box-shadow: #aaa 0px 3px 5px; */
  }

  .cate {
    position: absolute;
    width: $cate-width;
    height: $cate-width;
    line-height: $cate-width;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    cursor: pointer;
    transform: translateZ(0);
    @media screen and (max-width: 600px) {
      width: $cate-width--min;
      height: $cate-width--min;
      line-height: $cate-width--min;
      font-size: 10px;
    }
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        /*
          设置随机动画名 
          设置随机运动时间，让各个 cate 的动画不同步
        */
        animation: move-#{random(30)} random(100) + 200 + s infinite alternate;
      }
    }
  }
}

/* 创建 30 个随机动画，可依实际情况增加或减少 */
@for $i from 1 through 30 {
  @keyframes move-#{$i} {
    /* 10 个帧 */
    @for $j from 0 through 10 {
      #{$j * 10}% {
        transform: translateX(calc(#{random(100)+vw} - #{$cate-width})) translateY(calc(#{random(100)+vh} - #{$cate-width}));
        @media screen and (max-width: 600px) {
          transform: translateX(calc(#{random(100)+vw} - #{$cate-width--min})) translateY(calc(#{random(100)+vh} - #{$cate-width--min}));
        }
      }
    }
  }
}
</style>

<style lang="scss">
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 1s;
}
</style>
