<style lang="scss" scoped>
.line {
  margin: 0 16px;
  height: 1px;
  transform: scaleY(0.5);
  background: #e3e5e8;
}

.btn-box {
  width: 100%;
  position: fixed;
  z-index: 1;
  bottom: 0px;
  transition: all 0.5s;
}
</style>

<template>
  <div>
    <webHeader :ratio="ratio" :has-banner="hasBanner" :header-show="headerShow" />
    <filterTop :show-filter="showFilter" />
    <banner />
    <boards />
    <div class="line"></div>
    <users />
    <activities />
    <div class="line"></div>
    <sign />
    <div class="line"></div>
    <comment />
    <div :style="{ height: showFooter ? 60 + 'px' : 0 }" class="btn-box">
      <btn :group-info="groupInfo" :jump-url="jumpUrl" />
    </div>
  </div>
</template>

<script>
import utils from '@/pages/group_intro/utils';
import webHeader from '../components/webHeader.vue';
import banner from '@/pages/group_intro/components/Banner';
import boards from '@/pages/group_intro/components/Boards';
import users from '@/pages/group_intro/components/Users';
import activities from '@/pages/group_intro/components/Activities';
import sign from '@/pages/group_intro/components/Sign';
import comment from '@/pages/group_intro/components/Comment';
import btn from '@/pages/group_intro/components/Btn';
import filterTop from '@/pages/group_intro/components/FilterTagTop';

const dom = document.querySelector('#app');
let scrollTop = '',
  cityListNode,
  cityListHeight;
export default {
  components: {
    banner,
    boards,
    users,
    activities,
    sign,
    comment,
    btn,
    filterTop,
    webHeader
  },
  data() {
    return {
      headerShow: false,
      ratio: 0,
      hasBanner: true,
      showFilter: false,
      showFooter: false,
      jumpUrl: '',
      groupInfo: ''
    };
  },
  mounted() {
    this.receiveEvent();
    this.setBtnDisplay();
    document.cookie = 'branpub=liulei';
  },
  methods: {
    receiveEvent() {
      this.$transfomer.$on('changeBottomBtn', param => {
        this.jumpUrl = param.jumpUrl;
        this.groupInfo = param.groupInfo;
      });
    },
    setBtnDisplay() {
      let dom = document.querySelector('#app');
      dom.addEventListener('scroll', this.scroll);
    },
    isheader() {
      //判断header的出现
      if (scrollTop >= 180) {
        this.headerShow = true;
        this.ratio = (scrollTop - 180) / 180;
      } else {
        this.headerShow = false;
      }
    },
    isCityList() {
      //判断顶部city的出现
      !cityListNode && (cityListNode = document.querySelector('.filterShow'));
      cityListNode &&
        (cityListHeight = cityListNode.offsetTop + cityListNode.offsetHeight);
      if (cityListHeight && scrollTop > cityListHeight) {
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }
    },
    scroll() {
      (scrollTop = dom.scrollTop), this.isheader.call(this);
      this.isCityList.call(this);
      //判断底部小组报名的出现
      if (scrollTop > cityListHeight + 100) {
        // 一次触发判断
        if (!this.showFooter) {
          utils.setAppNavigationBar('grey');
        }
        this.showFooter = true;
      } else {
        // 一次触发判断
        if (this.showFooter) {
          utils.setAppNavigationBar('blank');
        }
        this.showFooter = false;
      }
    }
  }
};
</script>
