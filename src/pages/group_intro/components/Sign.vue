<style lang="scss" scoped>
.sign {
  padding: 16px;
  font-size: 0;
}
.icons {
  position: relative;
  width: 25%;
  text-align: center;
  display: inline-block;
  > .icon {
    width: 50px;
    height: 50px;
  }
  > p {
    font-size: 14px;
  }
  > .arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 20px;
    right: -5px;
  }
}
</style>
<template>
  <div class="sign">
    <h2>报名流程</h2>
    <div class="icons" v-for="(item, index) in section" :key="index">
      <img class="icon" :src="item.img" alt>
      <p>{{ item.word }}</p>
      <img class="arrow" v-if="item.hasArrow" src="@/pages/group_intro/assets/fold.png" alt>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      section: [
        {
          img: require('@/pages/group_intro/assets/step1.png'),
          word: '提交报名',
          hasArrow: true
        },
        {
          img: require('@/pages/group_intro/assets/step2.png'),
          word: '局长筛选',
          hasArrow: true
        },
        {
          img: require('@/pages/group_intro/assets/step3.png'),
          word: '确认报名',
          hasArrow: true
        },
        {
          img: require('@/pages/group_intro/assets/step4.png'),
          word: '参加饭局',
          hasArrow: false
        }
      ]
    };
  }
};
</script>
