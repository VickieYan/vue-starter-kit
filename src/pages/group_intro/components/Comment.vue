<style lang="scss" scoped>
.line {
  height: 1px;
  margin-top: 16px;
  transform: scaleY(0.5);
  background: #e3e5e8;
}

.comment {
  padding: 16px;
}

.list {
  margin: 16px 0;
}

.user {
  display: flex;
  align-items: center;

  > .img {
    width: 36px;
    height: 36px;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  > .info {
    line-height: 1.5;
    margin-left: 8px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;

    .user-name {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;

      > span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .user-desc {
      font-weight: 300;
      font-size: 12px;
      color: #717376;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.content {
  line-height: 1.5;
  font-weight: 300;
  font-size: 16px;
  margin: 12px 0;
  word-break: break-all;
}

.img-box {
  overflow: hidden;
  border-radius: 6px;
  font-size: 0;
  display: inline-block;
}

.comment-img {
  overflow: hidden;
  display: inline-block;

  > img {
    width: 100%;
    height: 100%;
  }
}

.img-normal {
  width: 33%;
  max-width: 200px;
}

.img-one {
  width: 202px;
  height: 202px;
  overflow: hidden;
}

.img-margin {
  margin: 0 0.5%;
}

.img-extra {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.comment-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .comment-address {
    font-size: 14px;
    color: #717376;
  }
}
</style>
<template>
  <div class="comment">
    <div class="comment-title">
      <h2>活动报名</h2>
      <span v-if="userLocation" class="comment-address">
        所在城市:{{ userLocation }}
      </span>
    </div>
    <FilterTag
      :user-location-info="userLocationInfo"
      class="filterShow"
      v-if="cityList.length>1"
      :data-source="cityList"
      map-key="mddId"
      map-value="mddName"
      @click="getFilterComments"
    ></FilterTag>
    <div class="list" v-for="(item,index) in comments" :key="index">
      <div class="user" @click="$openNewPage(item.homeUrl)">
        <div class="img">
          <img :src="item.userLogo" alt>
        </div>
        <div class="info">
          <p class="user-name">
            <span>{{ item.userName }}</span>
            <userLv :lv="item.lv" />
          </p>
          <p class="user-desc">
            {{ item.timeInterval }}{{ item.desc?` · ${item.desc}`:'' }}
          </p>
        </div>
      </div>
      <div class="content">
        {{ item.commentText }}
      </div>
      <div :class="{usedScrollFlag:index==0}" class="img-box" v-if="item.img.length>0">
        <div
          class="img comment-img"
          v-for="(img,_index) in item.img"
          :key="_index"
          :class="{
            'img-one':item.img.length===1,
            'img-normal':item.img.length>1,
            'img-margin':_index===1,
            'img-extra':_index===1&&item.img.length===2
          }"
        >
          <img :src="img.sImg" alt @click="seeBigImg(img.bImg)">
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import userLv from '@/pages/group_intro/components/userLv';
import FilterTag from '@/pages/group_intro/components/FilterTag';

export default {
  components: {
    FilterTag,
    userLv
  },
  data() {
    return {
      comments: [],
      cityList: [],
      cacheComments: {},
      currentPage: 1,
      currentCity: 0,
      hasMore: true,
      canLoad: true,
      userLocation: '',
      userLocationInfo: {
        jump: '',
        mddId: 0,
        mddName: '全部'
      }
    };
  },
  mounted() {
    this.getCityList();
    this.setScrollMore();
  },
  methods: {
    seeBigImg(imgUrl) {
      this.$root.$emit('seeImg', imgUrl);
    },
    setScrollMore() {
      let dom = document.querySelector('#app');
      dom.addEventListener('scroll', this.scroll);
    },
    getCityList() {
      //获取地理信息
      this.$api.getDetail().then(res => {
        this.userLocationInfo = res.userLocation;
        this.userLocation = res.userLocation.mddName;
        if (!this.userLocationInfo.mddName) {
          this.userLocationInfo.mddName = '全部';
        }
        this.$transfomer.$emit('changeBottomBtn', res.userLocation);
        this.cityList = res.cityList || [];
      });
    },
    getFilterComments(city) {
      this.$transfomer.$emit('changeActiveCity', city.mddName); //触发城市背景色切换事件
      const self = this;
      //监听城市切换事件
      this.$transfomer.$on('getFilterComments', function (cityInfo) {
        this.$transfomer.$emit('changeActiveCity', cityInfo.mddName); //触发城市背景色切换事件
        self.currentCity = cityInfo.mddId || 0;
        self.currentPage = 1;
        //  列表缓存
        if (self.cacheComments[self.currentCity]) {
          self.comments = self.cacheComments[self.currentCity].data;
          self.currentPage = self.cacheComments[self.currentCity].page;
        } else {
          self.getComments(true);
        }
      });
      this.currentCity = city.mddId || 0;
      this.currentPage = 1;
      //  列表缓存
      if (this.cacheComments[this.currentCity]) {
        this.comments = this.cacheComments[this.currentCity].data;
        this.currentPage = this.cacheComments[this.currentCity].page;
      } else {
        this.getComments(true);
      }
    },
    getComments(isRefresh) {
      this.canLoad = false;
      this.$api.getComment(this.currentPage, this.currentCity).then(res => {
        if (res.length == 0) this.hasMore = false;
        else {
          this.canLoad = true;
          this.comments = isRefresh ? res : this.comments.concat(res);
          this.cacheComments[this.currentCity] = {
            data: this.comments,
            page: this.currentPage
          };
        }
      });
    },
    scroll() {
      if (!this.hasMore || !this.canLoad) {
        return;
      }
      let dom = document.querySelector('#app'),
        elemHeight = dom.offsetHeight,
        scrollHeight = dom.scrollHeight,
        scrollTop = dom.scrollTop;

      if (scrollTop + elemHeight >= scrollHeight - 100) {
        // this.canLoad = false
        this.currentPage++;
        this.getComments();
      }
    }
  }
};
</script>