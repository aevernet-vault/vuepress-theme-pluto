<template>
  <div class="base-breadcrumb">
    <template
      v-for="(item, index) in list"
    >
      <router-link
        v-if="item.link"
        :key="index"
        class="base-breadcrumb__link"
        :to="item.link"
      >{{ item.text }}</router-link>
      <span
        v-else
        :key="index"
        class="base-breadcrumb__link inactive"
      >{{ item.text }}</span>

      <span
        v-if="index < list.length - 1"
        :key="'s' + index"
        class="base-breadcrumb__seperator"
      >/</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-breadcrumb
  display flex
  flex-wrap nowrap
  align-items center
  &__link
    padding 2px
    font-weight bold
    &.inactive
      color #aaa
  &__seperator
    color #aaa
    margin 0 5px
</style>
