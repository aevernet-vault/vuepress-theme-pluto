<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <!-- 评论 -->
    <ValineComment v-show="!hideComment" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ValineComment from '@theme/components/ValineComment.vue'

export default {
  components: {
    PageEdit,
    PageNav,
    ValineComment
  },
  props: ['sidebarItems'],
  computed: {
    // 扩展 hideComment
    hideComment () {
      return this.$themeConfig.hideComment || this.$page.frontmatter.hideComment
    },
  }
}
</script>
