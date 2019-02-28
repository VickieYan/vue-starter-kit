<template>
  <div
    v-if="isApp"
    class="wrapper wrapper-header"
    :class="{
      'app-header': isApp,
      iphonex: isApp && isIphoneX,
    }"
    :style="{
      background: `rgba(255,255,255,1)`,
      opacity: ratio,
      visibility: headerShow ? 'visible' : 'hidden',
    }"
  >
    <div class="left">
      <img class="icon back" src="../assets/v5-back.png" @click="handleBack">
    </div>
    <div class="header-word">
      未知饭局
    </div>
    <div class="right">
      <img class="icon share" src="../assets/v5-share.png" @click="handleShare">
    </div>
  </div>
</template>
<script>
import util from '@/pages/group_intro/utils';
export default {
  props: ['ratio', 'headerShow'],
  computed: {
    isApp() {
      return util.isInApp;
    },
    isIphoneX() {
      return window.isIphoneX;
    },
    hasMoreBtn() {
      return window.MFWAPP && MFWAPP.sdk.has('webview.showMoreMenu');
    }
  },
  mounted() {
    // 隐藏原生头部
    if (window.MFWAPP) {
      MFWAPP.webview.setNavigationBarDisplay({
        display: 'hide'
      });
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    handleBack() {
      if (window.MFWAPP) {
        clearTimeout(this.timer);
        this.$router.go(-1);
        this.timer = setTimeout(() => {
          MFWAPP.webview.close();
        }, 500);
      } else {
        this.$router.go(-1);
      }
    },
    handleShare() {
      if (window.MFWAPP) {
        MFWAPP.share.showSharePanel();
      }
    },
    handleShowMore() {
      if (window.MFWAPP) {
        MFWAPP.webview.showMoreMenu();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper.app-header {
  padding-top: 50px;
}

.wrapper.iphonex {
  height: 159px;
  padding: 100px 32px 22px 32px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  padding: 19px 18px 18px;
  background: rgba(255, 255, 255, 0);
  font-weight: 300;
  text-align: center;

  .icon {
    width: 28px;
    height: 28px;
  }

  .right {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
