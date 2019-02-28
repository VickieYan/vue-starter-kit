<template>
  <div v-if="detail" class="comment-item">
    <div class="left">
      <img class="avatar" :src="detail.user.logo" />
    </div>
    <div class="right">
      <div class="title">
        {{ detail.user.name }} 预约了一篇{{ medalName }}
      </div>
      <div class="detail">
        <div class="rect" />
        <img class="triangle" src="../assets/images/triangle-gray.png" />
        <div class="info">
          <div class="date">
            <img class="icon" src="../assets/images/date.png" />
            <div class="text">
              <strong>{{ date }}</strong>
            </div>
          </div>
          <div class="position">
            <img class="icon" src="../assets/images/position.png" />
            <div class="text">
              <strong>{{ detail.mdd.name }}</strong>
            </div>
          </div>
          <img v-if="medalUrl" class="medal" :src="medalUrl" />
        </div>
        <div class="content">
          {{ detail.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommentItem',
  props: ['detail'],
  data() {
    return {
      typeMedalMap: {
        1: require('../assets/images/medal1.png'),
        2: require('../assets/images/medal2.png'),
        3: require('../assets/images/medal3.png'),
      },
      typeNameMap: {
        0: '游记',
        1: '蜂首游记',
        2: '宝藏游记',
        3: '星级游记',
      },
    };
  },
  computed: {
    medalUrl() {
      return this.typeMedalMap[this.detail.type];
    },
    medalName() {
      return this.typeNameMap[this.detail.type];
    },
    date() {
      const {
        departure_month,
        departure_day,
        return_month,
        return_day,
      } = this.detail;
      if (departure_day == 0 || return_day == 0) {
        return `${departure_month}月出发`;
      }
      return `${departure_month}/${departure_day}-${return_month}/${return_day}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/px2rem';
@import '../assets/scss/variable';

.comment-item {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  .left {
    padding-right: px2rem(16);
    .avatar {
      float: left;
      width: px2rem(72);
      height: px2rem(72);
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .right {
    width: 100%;
    .title {
      margin-bottom: px2rem(16);
      height: px2rem(44);
      font-size: $font-size-normol;
      font-weight: 300;
      line-height: px2rem(44);
      color: $black;
      overflow: hidden;
      width: px2rem(512);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detail {
      z-index: -10;
      position: relative;
      box-sizing: border-box;
      padding: px2rem(20) px2rem(28) px2rem(20) px2rem(19);
      margin-left: px2rem(16);
      width: px2rem(498);
      background: $gray-light;
      .triangle {
        position: absolute;
        left: px2rem(-16);
        top: 0;
        width: px2rem(16);
        height: px2rem(16);
      }
      .info {
        position: relative;
        display: flex;
        justify-content: flex-start;
        .date {
          display: flex;
          justify-content: flex-start;
          height: px2rem(36);
          padding-bottom: px2rem(16);
          .icon {
            padding-top: px2rem(5);
            padding-right: px2rem(9);
            width: px2rem(22);
            height: px2rem(22);
          }
          .text {
            padding-right: px2rem(42);
            max-width: px2rem(150);
            height: px2rem(36);
            font-size: $font-size-small;
            font-weight: 600;
            color: $black;
            line-height: px2rem(36);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .position {
          display: flex;
          justify-content: flex-start;
          .icon {
            margin-top: px2rem(5);
            margin-right: px2rem(10);
            width: px2rem(22);
            height: px2rem(22);
          }
          .text {
            max-width: px2rem(168);
            height: px2rem(36);
            font-size: $font-size-small;
            font-weight: 600;
            color: $black;
            line-height: px2rem(36);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .medal {
          position: absolute;
          top: px2rem(-20);
          right: px2rem(-5);
          width: px2rem(28);
          height: px2rem(39);
        }
      }
      .content {
        // width:454px;
        font-size: px2rem(28);
        font-weight: 300;
        color: $black;
        line-height: px2rem(40);
      }
    }
  }
}
</style>
