<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 375px;
  position: relative;
  color: #fff;
  background-color: #f7f7f7;

  .header-part {
    width: 90%;
    padding-top: 25px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 9;

    .common-btn {
      width: 28px;
      height: 28px;
    }
  }

  .banner-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 3s;
  }

  .banner-title {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 40px;
    left: 16px;
    z-index: 99;

    .title-words {
      padding-right: 4px;
      font-size: 18px;
      font-weight: bold;
      color: #f9f9f9;
    }

    .arrow {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-radius: 50%;
      background-image: url('../assets/moretop@3x.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50% 50%;
    }
  }

  .banner-des {
    position: absolute;
    z-index: 99;
    bottom: 16px;
    left: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #f9f9f9;

    .des-nums {
      font-weight: bold;
      padding-right: 6px;
      color: #f9f9f9;
    }
  }

  .swiper-img {
    width: 114px;
    height: 32px;
    position: absolute;
    bottom: 26px;
    right: 16px;
    overflow: hidden;

    .avatar-lists {
      width: 1000px;
      height: 24px;
      position: absolute;
      transition: all 0.6s linear;

      .avatarItem {
        width: 24px;
        height: 24px;
        position: relative;
        float: left;
        border-radius: 50%;
        border: 1px solid #dde3f0;
        transition: all 0.6s;
      }
    }

    .avatar-lists .avatarItem:nth-of-type(n + 6) {
      transform: scale(0);
    }
  }
}

.text-shadow {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0;
  z-index: 9;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}

// .avatarOutAni {
//   //transform: scale(0) !important;
//   //animation: avatarOutAni 1s;
// }

// .avatarInAni {
//   //transform: scale(1) !important;
//   //animation: avatarInAni 1s forwards;
// }
// avatarInAni:index==inFlag,avatarOutAni:index==outFlag
//   @keyframes avatarOutAni {
//     0% {
//       transform: scale(1);
//     }

//     100% {
//       transform: scale(0);
//     }
//   }

//   @keyframes avatarInAni {
//     0% {
//       transform: scale(0);
//     }

//     100% {
//       transform: scale(1);
//     }
//   }
</style>
<template>
  <div class="bg">
    <div class="text-shadow"></div>
    <div v-if="isApp" class="header-part">
      <img @click="handleBack" class="back-link common-btn" src="../assets/v5-back-white.png" alt>
      <img
        @click="handleShare"
        class="share-link common-btn"
        src="../assets/v5-share-white.png"
        alt
      >
    </div>
    <img
      class="banner-img"
      v-for="(item, n) in imgUrls"
      :key="n"
      :src="item"
      :style="{ opacity: n == fadeMark ? 1 : 0 }"
      alt
    >
    <div @click="linkTo" class="banner-title">
      <span class="title-words">
        未知饭局
      </span>
      <span class="arrow"></span>
    </div>
    <p class="banner-des">
      <span class="des-nums">
        {{ pv }}
      </span>位Social青年正在关注活动
    </p>
    <div class="swiper-img">
      <ul
        class="avatar-lists"
        :style="{
          left: -22 * moveNums + 'px',
          transition: circleEnd ? 'none' : 'all 1s',
        }"
      >
        <img
          v-for="(i, index) in avatarImgs"
          :key="index"
          :style="{
            left: -4 * index + 'px',
            transform:
              outFlag <= index && index <= inFlag ? 'scale(1)' : 'scale(0)',
          }"
          :class="{ avatarItem: true }"
          :src="i"
          alt
        >
      </ul>
    </div>
  </div>
</template>
<script>
import util from '@/pages/group_intro/utils';

export default {
  components: {},
  data() {
    return {
      bgStyle: {
        'background-image': ''
      },
      blurFlag: 0,
      avatarImgs: [],
      pv: '',
      imgUrls: [],
      circleEnd: false,
      inFlag: 4, //定值
      outFlag: 0, //定值
      moveNums: 0,
      fadeMark: 0,
      avatarImgsNums: 0, //变量,头像图片数
      name: '',
      intro: '',
      jumpUrl: '',
      titleImg: '',
      timer: '',
      fadeNums: 0
    };
  },
  computed: {
    isApp() {
      return util.isInApp;
    },
    isIphoneX() {
      return window.isIphoneX;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    linkTo() {
      if (this.jumpUrl) {
        this.$openNewPage(this.jumpUrl);
      }
    },
    //banner图渐变效果
    bannerImgFade: self => {
      setInterval(() => {
        self.fadeMark == self.fadeNums - 1
          ? (self.fadeMark = 0)
          : self.fadeMark++;
      }, 3000);
    },
    //avatar移动动画
    avatarImgsMove: self => {
      self.timer = setInterval(() => {
        self.outFlag == self.avatarImgsNums - 5
          ? (self.outFlag = 0)
          : self.outFlag++;
        setTimeout(function () {
          self.blurFlag == self.avatarImgsNums - 5
            ? (self.blurFlag = 0)
            : self.blurFlag++;
        }, 500);
        setTimeout(() => {
          self.inFlag == self.avatarImgsNums - 1
            ? (self.inFlag = 4)
            : self.inFlag++;
          // self.moveNums >= 2 ? self.moveNums = 0 : self.moveNums++;
          if (self.moveNums >= self.avatarImgsNums - 5) {
            self.circleEnd = true;
            self.moveNums = 0;
          } else {
            self.circleEnd && (self.circleEnd = false);
            self.moveNums++;
          }
        }, 150);
      }, 1200);
    },
    //返回按钮
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
    //分享按钮
    handleShare() {
      if (window.MFWAPP) {
        MFWAPP.share.showSharePanel();
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    getDetail() {
      const self = this;
      return this.$api.getDetail().then(res => {
        for (let i = 0; i < res.recomUser.length; i++) {
          res.recomUser[i].userList.map(function (n) {
            self.avatarImgs.push(n.userLogo);
          });
        }
        this.avatarImgs.sort(function () {
          return Math.random() - 0.5;
        });
        this.avatarImgsNums = this.avatarImgs.length;
        this.imgUrls = res.headImg;
        this.fadeNums = this.imgUrls.length;
        this.pv = res.pv;
        this.jumpUrl = res.recomUrl;
        this.avatarImgsNums > 5 && this.avatarImgsMove(this);
        this.fadeNums > 1 && this.bannerImgFade(this);
      });
    }
  }
};
</script>
