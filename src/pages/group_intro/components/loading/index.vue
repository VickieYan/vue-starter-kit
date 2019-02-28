<style scoped>
.ant-loading-logo {
  width: 112px;
  height: 112px;
}

.ant-loading-logo-toast {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  padding: 16px;
}
</style>
<template>
  <div
    class="ant-loading-logo"
    :class="{'ant-loading-logo-toast':needToast}"
    :style="styleObject"
    ref="antLoadingLogo"
  ></div>
</template>
<script>
import animeData from './anime.json';
import lottie from 'lottie-web/build/player/lottie_light.min.js';

export default {
  name: 'AntLoadingLogo',
  props: {
    size: {
      type: String
    },
    needToast: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 1.5
    },
    delay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Number,
      default: 0
    },
    scale: {
      type: Object
    },
    onAnimeStop: {
      type: Function
    }
  },
  data() {
    return {
      lottie: null
    };
  },
  computed: {
    styleObject() {
      return this.size
        ? {
          width: this.size,
          height: this.size
        }
        : {};
    },
    autoplay() {
      return this.delay === 0;
    }
  },
  mounted() {
    this.lottie = lottie.loadAnimation({
      name: 'ant-loading-logo',
      container: this.$refs.antLoadingLogo,
      renderer: 'svg',
      loop: this.loop - 1,
      autoplay: this.autoplay,
      animationData: animeData,
      rendererSetting: {
        progressiveLoad: true
      }
    });
    this.init();
  },
  beforeDestroy() {
    lottie.destroy();
  },
  methods: {
    init() {
      // 设置 scale 动画
      this.setScale();

      // 设置播放速度
      this.lottie.setSpeed(this.speed);

      // 设置自动播放
      if (!this.autoplay) {
        setTimeout(() => {
          this.lottie.play();
        }, this.delay);
      }

      // 设置动画结束回调函数
      if (this.onAnimeStop) {
        this.lottie.onComplete = () => {
          this.onAnimeStop();
        };
      }
    },
    setScale() {
      if (!this.scale) {
        return;
      }

      var dom = this.$refs.antLoadingLogo;
      dom.style.transform = `scale(${this.scale.size || 0.6})`;
      dom.style.transition = `transform ${this.scale.duration || 0.3}s`;
      setTimeout(() => {
        dom.style.transform = '';
      }, 0);
    }
  }
};
</script>