<style lang="scss" scoped>
.fliter-content {
  background-color: #ffffff;

  .filter-top {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    position: fixed;
    z-index: 99;

    .filter-list {
      width: 370px;
      padding-left: 8px;
      overflow: scroll;
      transition: all 0.3s;
      -ms-overflow-style: none; //ie
      font-weight: 300;

      .city-list {
        .listItem {
          margin: 6px 0 0 8px;
          border-radius: 2px;
          background: rgba(246, 247, 249, 1);
          float: left;
          padding: 5px 8px;
          list-style: none;
          font-size: 14px;
          color: #242629;
        }
      }
    }

    //chrome
    .filter-list::-webkit-scrollbar {
      display: none;
    }

    .click-arrow {
      width: 42px;
      text-align: center;
      font-weight: 100;
      color: #bdbfc2;
      display: inline-block;
      transform: rotate(90deg) scaleY(1.5);
    }
  }
}

.fliter-tap {
  font-weight: 300;
  position: fixed;
  z-index: 999;
  background-color: #ffffff;
  padding: 0 16px;
  transition: height 0.6s;
}

.filter-tap-title {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0 10px 0;

  .close-tab {
    width: 20px;
    height: 20px;
    padding: 5px 0;
    display: inline-block;
    background-image: url('../assets/close@3x.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
  }
}

.shadow {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
}

.activeColor {
  background: linear-gradient(
    135deg,
    rgba(255, 226, 76, 1) 0%,
    rgba(255, 219, 38, 1) 100%
  ) !important;
  font-weight: 600 !important;
}
</style>

<template>
  <div class="fliter-content">
    <div class="filter-top" :style="{ top: fixHeight + 'px' }">
      <div class="filter-list" :style="{ height: showFilter ? 42 + 'px' : 0 }">
        <ul class="city-list" :style="{ width: 52 * (cityNums + 1) + 'px' }">
          <li
            v-for="(item, index) in cityList"
            :class="{
              listItem: true,
              activeColor: item.mddName == activeCity ? true : false,
            }"
            @click="tapsCityEvent(item)"
            :key="index"
          >
            {{ item['mddName'] }}
          </li>
        </ul>
      </div>
      <span
        @click="controlTap"
        class="click-arrow"
        :style="{ display: showFilter ? 'block' : 'none' }"
      >
        >
      </span>
    </div>
    <div class="fliter-tap" :style="{ display: showTap ? 'block' : 'none', top: fixHeight + 'px' }">
      <div class="filter-tap-title">
        <span>城市筛选</span>
        <span @click="controlTap" class="close-tab"></span>
      </div>
      <FilterTag
        :is-used="isUsed"
        class="filter-tag"
        v-if="cityList.length > 1"
        :data-source="cityList"
        map-key="mddId"
        map-value="mddName"
        @click="cityEvent"
      ></FilterTag>
    </div>
    <div @click="controlTap" :style="{ display: showTap ? 'block' : 'none' }" class="shadow"></div>
  </div>
</template>

<script>
let titleNode;
import FilterTag from './FilterTag';
export default {
  components: {
    FilterTag
  },
  props: ['showFilter'],
  data() {
    return {
      fixHeight: '',
      activeCity: '全部',
      activeColor: 0,
      showTap: false,
      cityList: [],
      cityNums: '',
      comments: [],
      cacheComments: {},
      currentPage: 1,
      currentCity: 0,
      hasMore: true,
      canLoad: true,
      isUsed: true
    };
  },
  mounted() {
    const wrapHeader = document.querySelector('.wrapper-header');
    this.fixHeight = wrapHeader ? wrapHeader.offsetHeight : 0;
    this.getCityList();
    this.changeActiveCity();
  },
  methods: {
    getCityList() {
      this.$api.getDetail().then(res => {
        this.cityList = res.cityList || [];
        this.cityNums = res.cityList.length;
      });
    },
    //改变点击城市背景色
    changeActiveCity() {
      const self = this;
      //监听城市背景色切换时间
      this.$transfomer.$on('changeActiveCity', function (cityName) {
        self.activeCity = cityName;
      });
    },
    //城市tab部分的开关
    controlTap() {
      this.showTap = !this.showTap;
    },
    //城市tab部分的点击事件
    tapsCityEvent(cityInfo, index) {
      !titleNode && (titleNode = document.querySelector('.usedScrollFlag'));
      titleNode.scrollIntoView(true);
      this.$transfomer.$emit('changeActiveCity', cityInfo['mddName']); //触发城市背景色切换事件
      this.activeColor = index;
      //触发城市切换事件
      this.$transfomer.$emit('changeBottomBtn', cityInfo);
      this.$transfomer.$emit('getFilterComments', cityInfo);
    },
    //顶部城市选择的点击事件
    cityEvent(cityInfo) {
      //触发城市切换事件
      this.$transfomer.$emit('getFilterComments', cityInfo);
    }
  }
};
</script>
