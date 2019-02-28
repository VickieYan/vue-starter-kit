<style lang="scss" scoped>
.loading-box {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #fff;
}

.loading {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate3d(-40%, -50%, 0);
}
</style>

<template>
  <div id="app-box">
    <SeeImg />
    <div v-cloak id="app">
      <Transition name="fade" mode="out-in">
        <div v-if="isLoading" class="loading-box">
          <Loading
            class="loading"
            :size="'60px'"
            :loop="1"
            :on-anime-stop="onAnimeStop"
          />
        </div>
      </Transition>
      <RouterView />
    </div>
  </div>
</template>

<script>
import utils from '@/pages/group_intro/utils';
import Loading from '@/pages/group_intro/components/loading';
import SeeImg from '@/pages/group_intro/components/SeeImg';
export default {
  name: 'App',
  components: {
    Loading,
    SeeImg,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    utils.setAppNavigationBar('blank');
    this.staticPerformance();
  },
  methods: {
    onAnimeStop() {
      this.isLoading = false;
    },
    // 性能统计，不需要统计太久
    staticPerformance() {
      if (
        !window.performance ||
        !window.performance.timing ||
        !window.mfwPageEvent
      ) {
        return;
      }

      var timing = performance.timing;

      window.mfwPageEvent('ugc', 'fe_project_statistics', {
        project_name: 'activitygroupintro.mshequ',
        is_microservice: 1,
        request_start: timing.requestStart,
        response_start: timing.responseStart,
        response_end: timing.responseEnd,
        request_time: timing.responseStart - timing.requestStart,
        response_time: timing.responseEnd - timing.responseStart,
        broswer: (() => {
          var ua = navigator.userAgent,
            tem,
            M =
              ua.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
              ) || [];
          if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
          }
          if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
              return tem
                .slice(1)
                .join(' ')
                .replace('OPR', 'Opera');
          }
          M = M[2]
            ? [M[1], M[2]]
            : [navigator.appName, navigator.appVersion, '-?'];
          if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
          return M.join(' ');
        })(),
      });
    },
  },
};
</script>

<style>
.img {
  background: #f6f7f9;
}

h2 {
  font-size: 18px;
}

.iphonex-padding-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.iphonex-padding-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

[v-cloak] {
  display: none !important;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
}

#app {
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  overflow: auto;
}

#app-box {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  /* max-width: 550px; */
  font-size: 18px;
  left: 0;
  right: 0;
  color: #242629;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

input,
button,
select,
textarea {
  outline: none;
  user-select: text;
}

::placeholder {
  color: #999;
}

textarea {
  resize: none;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

p {
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
