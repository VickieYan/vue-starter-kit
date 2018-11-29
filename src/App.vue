<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
@import './assets/scss/index.scss';
</style>
