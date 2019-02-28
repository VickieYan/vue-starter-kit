<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-top: 16px;
  > h2 {
    flex: 1;
  }
  > span {
    font-size: 14px;
    color: #717376;
    margin-right: 6px;
  }
  > img {
    width: 14px;
    height: 14px;
  }
}
.outbox {
  overflow: hidden;
  height: 117px;
}
.box {
  overflow: auto;
  white-space: nowrap;
  margin: 16px;
  padding-bottom: 20px;
  -webkit-overflow-scrolling: touch;
}
.users {
  width: 70px;
  overflow: hidden;
  display: inline-block;
  margin-right: 22px;
  p {
    margin-top: 10px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mdd-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  line-height: 60px;
  text-align: center;
  > span {
    font-size: 18px;
    color: #fff;
  }
}
.more {
  position: relative;
  z-index: 1;
  text-align: center;
  font-size: 14px;
  color: #717376;
  margin-bottom: 20px;
  img {
    width: 12px;
    height: 12px;
    transition: transform 0.4s;
    transform: rotate(90deg);
  }
}
.more-margin-unfold {
  margin-top: 40px;
}
.more-shadow {
  background: linear-gradient(rgba(255, 255, 255, 0.1) 0%, #fff 45%);
  position: absolute;
  top: -70px;
  left: 0;
  width: 100%;
  height: 60px;
}
.more-img-unfold {
  transform: rotate(-90deg) !important;
}
.line {
  margin: 0 16px;
  height: 1px;
  transform: scaleY(0.5);
  background: #e3e5e8;
}
</style>
<template>
  <div v-if="users.length > 0">
    <div class="head">
      <h2>认证局长·共{{ usersNum }}人</h2>
      <span @click="$openNewPage(introUrl)">
        他们是谁
      </span>
      <img @click="$openNewPage(introUrl)" src="@/pages/group_intro/assets/question.png" alt>
    </div>

    <div class="outbox" v-for="(list, index) in displayUsers" :key="index">
      <div class="box">
        <!-- mdd -->
        <div class="users">
          <div class="img">
            <img :src="list.mddLogo" alt>
            <div class="mdd-shadow" v-if="list.mddLogo">
              <span>{{ listNum(list.userCount) }}</span>
            </div>
          </div>
          <p>{{ list.mddName }}</p>
        </div>
        <!-- user -->
        <div
          class="users"
          v-for="(user, _index) in list.userList"
          :key="_index"
          @click="$openNewPage(user.homeUrl)"
        >
          <div class="img">
            <img :src="user.userLogo" alt>
          </div>
          <p>{{ user.userName }}</p>
        </div>
      </div>
    </div>

    <div
      class="more"
      v-if="isOverflow"
      @click="isFold = !isFold"
      :class="{ 'more-margin-unfold': !isFold }"
    >
      <transition name="fade" mode="out-in">
        <div class="more-shadow" v-show="isFold"></div>
      </transition>
      <span>{{ isFold ? '展开全部城市局长' : '收起全部城市局长' }}</span>
      <img src="@/pages/group_intro/assets/fold.png" alt :class="{ 'more-img-unfold': !isFold }">
    </div>

    <div class="line"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      introUrl: '',
      usersNum: 0,
      users: [],
      isOverflow: false,
      isFold: true
    };
  },
  computed: {
    displayUsers() {
      let result = this.users;
      if (this.isFold) result = result.slice(0, 3);

      return result;
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    listNum(num) {
      let result = '';
      num >= 100 ? (result = '99+') : (result = `${num}人`);
      return result;
    },
    getUsers() {
      this.$api.getDetail().then(res => {
        this.introUrl = res.recomUrl;
        this.usersNum = res.recomUserTotal;
        this.users = res.recomUser;
        if (this.users.length > 3) this.isOverflow = true;
      });
    }
  }
};
</script>
