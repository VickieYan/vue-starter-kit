<style lang="scss" scoped>
.activities {
  padding: 16px 16px 20px;
}
.box {
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 20px;
  -webkit-overflow-scrolling: touch;
}
.outbox {
  height: 290px;
  overflow: hidden;
}
.activity {
  display: inline-block;
  overflow: hidden;
  margin-right: 8px;
  width: 154px;
  vertical-align: top;
  .img {
    width: 100%;
    height: 213px;
    border-radius: 6px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .intro {
    margin-top: 12px;
    color: #b37012;
    font-weight: bold;
    font-size: 12px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    height: 48px;
  }
}
</style>
<template>
  <div class="activities" v-if="list && list.length > 0">
    <h2>往期活动</h2>
    <div class="outbox">
      <div class="box">
        <div
          class="activity"
          v-for="(item, index) in list"
          :key="index"
          @click="$openNewPage(item.url)"
        >
          <div class="img">
            <img :src="item.img" alt>
          </div>
          <p class="intro">
            {{ item.subTitle }}
          </p>
          <p class="title">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getActivities();
  },
  methods: {
    getActivities() {
      this.$api.getDetail().then((res) => {
        this.list = res.lastActivity;
      });
    },
  },
};
</script>
