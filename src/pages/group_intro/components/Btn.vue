<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 1);

  .avatar {
    width: 44px;
    height: 44px;
    margin-right: 8px;
    border-radius: 4px;
  }

  .des {
    display: flex;
    flex: 1;
    flex-direction: column;

    .address {
      font-weight: bold;
      color: #242629;
      font-size: 14px;
    }

    .person-nums {
      color: #717376;
      font-size: 12px;
    }
  }

  .sign-btn {
    width: 96px;
    padding: 6px 0;
    font-size: 16px;
    text-align: center;
    background: linear-gradient(
      135deg,
      rgba(255, 226, 76, 1) 0%,
      rgba(255, 219, 38, 1) 100%
    );
    border-radius: 18px;
  }
}
</style>
<template>
  <div class="footer">
    <img class="avatar" :src="groupInfo['logo']" alt>
    <div v-if="groupInfo['logo']" class="des">
      <span class="address">
        {{ groupInfo.name }}
      </span>
      <span class="person-nums">
        {{ groupInfo.userNum }}位小伙伴等你来撩
      </span>
    </div>
    <div @click="jump" class="sign-btn">
      进组报名
    </div>
  </div>
</template>
<script>
export default {
  props: {
    jumpUrl: {
      type: String,
      default: ''
    },
    groupInfo: { }
  },
  mounted() {},
  methods: {
    jump() {
      if (this.jumpUrl) {
        this.$openNewPage(this.jumpUrl);
      }
    }
  }
};
</script>
