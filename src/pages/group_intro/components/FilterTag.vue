<template>
  <div class="content">
    <div
      class="space-between tag"
      v-for="(item, index) in dataSources"
      :class="{
        'active-color': activeCity === item['mddName'],
        'base-color': true,
      }"
      @click="tagClick(item)"
      :key="index"
    >
      <span>
        <span>{{ item[mapValue] }}</span><span v-if="index > 0" :style="{color: activeCity == item['mddName'] ? '#717376' : '#bdbfc2',}" class="city-nums">
          {{ item['joinNum'] }}
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import utils from '@/pages/group_intro/utils';
export default {
  props: {
    isUsed: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array
    },
    mapKey: {
      type: String,
      default: 'key'
    },
    mapValue: {
      type: String,
      default: 'value'
    },
    userLocationInfo: {
      type: Object,
      default: function () {
        return {
          jumpUrl: '',
          mddId: 0,
          mddName: ''
        };
      }
    }
  },
  data() {
    return {
      activeCity: '全部',
      activeIndex: 0,
      clickFlag: false,
      titleNode: null
    };
  },
  computed: {
    dataSources() {
      const dataSources = this.dataSource.filter(function (n) {
        return n.mddName;
      });
      return dataSources;
    }
  },
  mounted() {
    // 现在整个逻辑都从最底层的这个组件为起点
    this.changeActiveCity();
    this.handleUrl();
  },
  methods: {
    //监听城市切换事件
    changeActiveCity() {
      const self = this;
      this.$transfomer.$on('changeActiveCity', function (cityName) {
        self.activeCity = cityName;
      });
    },

    handleUrl() {
      let cityId = +utils.getQueryString('cityId') || 0;
      let city = {};
      this.dataSources.forEach(item => {
        // 这块查找之后可以做优化
        if (item.mddId === cityId) city = item;
      });
      //有cityId用cityId没有的话用接口返的userLocation
      if (cityId) {
        this.tagClick(city);
      } else {
        this.tagClick(this.userLocationInfo);
      }
    },
    changeBottomBtn(param) {
      this.$transfomer.$emit('changeBottomBtn', param);
    },
    tagClick(evt) {
      if (this.clickFlag) {
        !this.titleNode &&
          (this.titleNode = this.isUsed
            ? document.querySelector('.usedScrollFlag')
            : document.querySelector('.comment-title'));
        this.titleNode.scrollIntoView(true);
      }
      this.activeCity = evt['mddName'];
      this.$emit('click', evt);
      this.changeBottomBtn(evt);
      this.clickFlag = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  // margin-right: -11px;
  // justify-content: space-between;
}

.city-nums {
  padding-left: 2px;
  font-size: 12px;
  color: #bdbfc2;
}

.active-color {
  background: linear-gradient(
    135deg,
    rgba(255, 226, 76, 1) 0%,
    rgba(255, 219, 38, 1) 100%
  ) !important;
  font-weight: 600 !important;
}

.base-color {
  background: #f6f7f9;
}

.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0 11px 0 12px;
  margin-bottom: 8px;
  border-radius: 4px;

  > span {
    font-size: 14px;
    color: #242629;
  }
}

.space-between {
  margin-right: 8px;
}

@media (min-width: 395px) and (max-width: 435px) {
  .space-between {
    margin-right: 3%;
  }
}

@media (min-width: 370px) and (max-width: 375px) {
  .space-between {
    margin-right: 2%;
  }
}

@media (min-width: 345px) and (max-width: 370px) {
  .space-between {
    margin-right: 4%;
  }
}
</style>
