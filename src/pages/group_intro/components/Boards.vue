<style lang="scss" scoped>
.boards {
  padding: 16px 16px 0;
}
li {
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 20px 0;
  > span {
    border-radius: 2px;
    background: #e5f0ff;
    color: #4d97ff;
    font-size: 11px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    margin-right: 6px;
  }
  > div {
    font-size: 14px;
    text-overflow: ellipsis;
    flex: 1;
    overflow: hidden;
  }
  > img {
    margin-left: 6px;
    width: 12px;
    height: 12px;
  }
}
</style>
<template>
  <div class="boards" v-if="boards.length > 0">
    <h2>官方公告</h2>
    <ul>
      <li v-for="(item, index) in boards" :key="index" @click="$openNewPage(item.url)">
        <span>公告</span>
        <div>{{ item.title }}</div>
        <img src="@/pages/group_intro/assets/arrow.png" alt>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boards: []
    };
  },
  mounted() {
    this.getBoards();
  },
  methods: {
    getBoards() {
      this.$api.getDetail().then(res => {
        this.boards = res.topArticles;
      });
    }
  }
};
</script>
