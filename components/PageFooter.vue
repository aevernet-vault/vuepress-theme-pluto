<template>
  <div class="pfooter">
    <p class="line">
      <span class="copyright">Copyright © 2019-present 黎志文</span>
    </p>
    <p class="line">
      <a class="beian" href="http://www.miit.gov.cn/" target="_blank">
        <img src="https://www.miit.gov.cn/cms_files/filemanager/picture/20201/13489b1e11544f8d991cf22973541b57.png" alt="备案">
        粤ICP备20060883号-1
      </a>
    </p>
    <p class="line">
      <span class="power">
        Power by 
        <a href="https://vuepress.vuejs.org/zh/" target="_blank">Vuepress</a>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'page-footer'
}
</script>

<style lang="stylus" scoped>
.pfooter {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 100%;
  margin-top: 50px;
  text-align: center;
  color: $accentColor;
  box-shadow: var(--box-shadow);

  p.line {
    margin: 0;
    height: 30px;
    line-height: 30px;
  }
}
</style>
