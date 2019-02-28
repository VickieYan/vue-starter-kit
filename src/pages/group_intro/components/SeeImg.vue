<style lang="scss" scoped>
.see-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  text-align: center;
  > img {
    max-width: 550px;
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
<template>
  <transition name="fade" mode="out-in">
    <div v-if="currentImgUrl" @click="clear" class="see-img" @touchmove.prevent>
      <img :src="currentImgUrl" alt>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      currentImgUrl: ''
    };
  },
  mounted() {
    this.eventOn();
  },
  methods: {
    eventOn() {
      this.$root.$on('seeImg', url => {
        this.currentImgUrl = url;
      });
    },
    clear() {
      this.currentImgUrl = '';
    }
  }
};
</script>
