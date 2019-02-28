<template>
  <div>
    <mt-datetime-picker
      v-model="pickerValue"
      :start-date="new Date()"
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      @visible-change="handleVisibleChange">
    </mt-datetime-picker>
    <div v-show="isContentLoaded" class="container" :style="dialogStyle">
      <img class="qrcode" src="../assets/images/qrcode.png" />
      <div
        ref="wrapper"
        class="wrapper"
        :class="{
          'prevent-scroll':
            isDestroyDialogVisible ||
            isExplanationDialogVisible ||
            isShareTipsVisible ||
            isGraftVisible,
        }"
      >
        <div class="header">
          <div class="title">
            <div class="rect rect1">
              <strong>{{ focus }} 人预约了<span>蜂首</span>游记</strong>
            </div>
            <div class="rect rect2">
              <strong>{{ top }} 人预约了<span>宝藏</span>游记</strong>
            </div>
            <div class="rect rect3">
              <strong>{{ start }} 人预约了<span>星级</span>游记</strong>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="card">
            <div class="core">
              <div class="title">
                <img
                  class="avatar"
                  :src="flag ? shareUser.logo : loginUser && loginUser.logo"
                />
                <img class="text" :src="title" />
                <div class="pot pot1" />
                <div class="pot pot2" />
                <div class="pot pot3" />
              </div>
              <div v-if="step === 1" class="form1">
                <div
                  v-show="searchResult && searchResult !== null"
                  class="search"
                >
                  <div
                    v-for="(item, index) in searchResult"
                    :key="index"
                    class="search-item"
                    @click="handleSelectMdd(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="form-item form-item1">
                  <div class="label">
                    我要去
                  </div>
                  <div class="wrapper-input">
                    <input
                      ref="input"
                      v-model="currentMdd.name"
                      class="input"
                      type="text"
                      placeholder="准备去的国家或城市"
                      @blur="handleMddBlur"
                    />
                  </div>
                </div>
                <div class="form-item form-item2" @click="handleShowDatePicker(1)">
                  <div class="left">
                    <div class="label">
                      出发日期
                    </div>
                    <div v-if="params.dyear" class="text">
                      {{ params.dyear + '/' + params.dmonth + '/' + params.dday }}
                    </div>
                  </div>
                  <img class="icon" src="../assets/images/more.png" />
                </div>
                <div class="form-item form-item3" @click="handleShowDatePicker(2)">
                  <div class="left">
                    <div class="label">
                      返回日期
                    </div>
                    <div v-if="params.ryear" class="text">
                      {{ params.ryear + '/' + params.rmonth + '/' + params.rday }}
                    </div>
                  </div>
                  <img class="icon" src="../assets/images/more.png" />
                </div>
                <div class="form-item form-item4">
                  <div class="label">
                    出发前想说的话
                  </div>
                  <textarea
                    v-model="params.content"
                    class="textarea"
                    rows="4"
                    resize="none"
                    @blur="fixIosBug"
                    :placeholder="textareaPlaceholder"
                  />
                </div>
                <div
                  class="button"
                  :class="{ active: isButtonActive }"
                  @click="handleNextStep(2)"
                >
                  下一步
                </div>
              </div>
              <div v-if="step === 2" class="form2">
                <div class="form-item" @click="params.type = 1">
                  <div class="option">
                    <div class="checkbox">
                      <img
                        v-if="params.type === 1"
                        class="active"
                        src="../assets/images/select.png"
                      />
                      <div v-else class="rect" />
                    </div>
                    <img class="label" src="../assets/images/type1.png" />
                  </div>
                  <div
                    v-if="params.type === 1 && isAwardVisible"
                    class="description"
                  >
                    预约并达成目标，可获得「3000元旅行基金」奖励！
                  </div>
                </div>
                <div class="form-item" @click="params.type = 2">
                  <div class="option">
                    <div class="checkbox">
                      <img
                        v-if="params.type === 2"
                        class="active"
                        src="../assets/images/select.png"
                      />
                      <div v-else class="rect" />
                    </div>
                    <img class="label" src="../assets/images/type2.png" />
                  </div>
                  <div
                    v-if="params.type === 2 && isAwardVisible"
                    class="description"
                  >
                    预约并达成目标，可获得「1000元旅行基金」奖励！
                  </div>
                </div>
                <div class="form-item" @click="params.type = 3">
                  <div class="option">
                    <div class="checkbox">
                      <img
                        v-if="params.type === 3"
                        class="active"
                        src="../assets/images/select.png"
                      />
                      <div v-else class="rect" />
                    </div>
                    <img class="label" src="../assets/images/type3.png" />
                  </div>
                  <div
                    v-if="params.type === 3 && isAwardVisible"
                    class="description"
                  >
                    预约并达成目标，可获得「个人游记定制书」奖励！
                  </div>
                </div>
                <div class="form-item" @click="params.type = 0">
                  <div class="option">
                    <div class="checkbox">
                      <img
                        v-if="params.type === 0"
                        class="active"
                        src="../assets/images/select.png"
                      />
                      <div v-else class="rect" />
                    </div>
                    <img class="label" src="../assets/images/type0.png" />
                  </div>
                  <div
                    v-if="params.type === 0 && isAwardVisible"
                    class="description"
                  >
                    预约并发表游记，可获得个人游记定制明信片10张！
                  </div>
                </div>
                <div class="buttons">
                  <div class="left" @click="step = 1">
                    返回
                  </div>
                  <div class="right" @click="handleSubmit">
                    提交
                  </div>
                </div>
              </div>
              <div v-if="step === 3" class="form3">
                <div class="date">
                  <img class="icon" src="../assets/images/date-blue.png" />
                  <div class="text">
                    <strong>{{ date }}</strong>
                  </div>
                </div>
                <div class="position">
                  <img class="icon" src="../assets/images/position-blue.png" />
                  <div class="text">
                    <strong>{{ currentMdd.name }}</strong>
                  </div>
                </div>
                <div class="content">
                  {{ params.content }}
                </div>
                <div v-if="flag" class="button" @click="handleShareMore">
                  <strong>我也要预约</strong>
                </div>
                <div v-else class="buttons">
                  <div class="left" @click="isDestroyDialogVisible = true">
                    <strong>毁约</strong>
                  </div>
                  <div class="right" @click="handleShare">
                    <strong>分享</strong>
                  </div>
                </div>
                <div v-if="params.type !== 0" class="medal">
                  <img class="icon" :src="typeMedalMap[params.type]" />
                  <div class="text">
                    {{ typeNameMap[params.type] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="shadow" />
            <div class="animation">
              <img class="person" src="../assets/images/animation.png" />
              <div class="popup">
                <div class="rect" />
                <img class="triangle" src="../assets/images/triangle.png" />
                <!-- <img
                  class="text"
                  src="../assets/images/popup.png"
                /> -->
                <img
                  v-if="activity && isAwardVisible"
                  class="popup1"
                  src="../assets/images/popup11.png"
                />
                <img
                  v-if="isAwardVisible"
                  class="popup2"
                  :class="{ activityClose: !activity }"
                  src="../assets/images/popup21.png"
                />
                <img v-else class="popup3" src="../assets/images/popup.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="background" />
          <div v-if="activity && isAwardVisible" class="card1">
            <div class="title">
              <img class="text" src="../assets/images/text2.png" />
              <img
                class="tips"
                src="../assets/images/tips.png"
                @click="handleOpenDetail"
              />
            </div>
            <div class="content">
              <div class="content-title">
                <strong>基础奖励</strong>
              </div>
              <div class="desc">
                完成预约并发表游记可获得个人游记定制明信片10张
              </div>
              <div class="content-title">
                <strong>额外奖励</strong>
              </div>
              <div class="desc">
                达成预约目标还可额外获得最高3000元旅行基金
              </div>
              <div class="more" @click="isExplanationDialogVisible = true">
                <strong>点击查看详情>></strong>
              </div>
            </div>
          </div>
          <div class="card2">
            <div class="core">
              <div class="title">
                <img class="text" src="../assets/images/text3.png" />
                <div class="pot pot1" />
                <div class="pot pot2" />
                <div class="pot pot3" />
              </div>
              <div class="comment">
                <CommentItem
                  v-for="(item, index) in list"
                  :key="index"
                  class="item"
                  :detail="item"
                />
              </div>
            </div>
            <div class="shadow" />
          </div>
          <div class="bottom" />
        </div>
      </div>
      <div v-if="isDestroyDialogVisible" ref="destory" class="destroy">
        <div class="dialog">
          <div class="top">
            <strong>真的不约啦？</strong>
          </div>
          <div class="bottom">
            <div class="left" @click="isDestroyDialogVisible = false">
              <strong>再想想</strong>
            </div>
            <div class="right active" @click="handleDestroy">
              <strong>确定</strong>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isExplanationDialogVisible"
        ref="explanation"
        class="explanation"
      >
        <div class="dialog">
          <div class="top">
            <div class="title">
              <strong>奖励规则</strong>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">
                  <strong>时间</strong>
                </div>
                <div class="section-text">
                  9月13日-30日游记预约期 <br />
                  10月1日-15日预约兑现期
                </div>
              </div>
              <div class="section">
                <div class="section-title">
                  <strong>基础奖励</strong>
                </div>
                <div class="section-text">
                  9月30日前预约游记，并在10月15日前成功发表，审核通过后，可以获得「个人游记定制明信片10张」，每人限一次
                </div>
              </div>
              <div class="section">
                <div class="section-title">
                  <strong>额外奖励</strong>
                </div>
                <div class="section-text">
                  此外，达成星级、宝藏、蜂首目标，即可获得：<br />
                  星级游记——「个人游记定制书」<br />
                  宝藏游记——「旅行基金1000元」<br />
                  蜂首游记——「旅行基金3000元」
                </div>
              </div>
            </div>
          </div>
          <div class="bottom" @click="isExplanationDialogVisible = false">
            <strong>知道了</strong>
          </div>
        </div>
      </div>
      <div v-if="isGraftVisible" class="graft">
        <div class="dialog">
          <div class="top">
            <img class="example" src="../assets/images/graft.png" />
            <div class="desc">
              已生成「预约游记」，别忘了去<strong>草稿游记</strong>中完成它哦～
            </div>
          </div>
          <div class="bottom" @click="isGraftVisible = false">
            <strong>知道了</strong>
          </div>
        </div>
      </div>
      <div
        v-if="isShareTipsVisible"
        class="wx-share"
        @click="isShareTipsVisible = false"
      >
        <div class="blackboard">
          <div class="title">
            <div class="pot pot1" />
            <div class="pot pot2" />
            <div class="pot pot3" />
          </div>
          <img class="content" src="../assets/images/share.png" />
          <img class="arrow" src="../assets/images/arrow.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CommentItem } from '@/pages/reserve_note/components';
import wxapi from '@/pages/reserve_note/utils/wxapi';
import {
  getReserveList,
  addReserveNote,
  cancelReserveNote,
  getMyNote,
  searchMdd,
  getActivityInfo,
  getUserNote,
} from '../service';
export default {
  components: {
    CommentItem,
  },
  data() {
    return {
      params: {
        content: '',
        mddid: null,
        dyear: null,
        dmonth: null,
        dday: null,
        ryear: null,
        rmonth: null,
        rday: null,
        type: 0,
      },
      typeMedalMap: {
        1: require('../assets/images/medal1.png'),
        2: require('../assets/images/medal2.png'),
        3: require('../assets/images/medal3.png'),
      },
      typeNameMap: {
        0: '普通',
        1: '蜂首',
        2: '宝藏',
        3: '星级',
      },
      datePickerId: 1, // 1: 出发时间, 2: 到达时间
      pickerValue: new Date(),
      step: 1,
      radio: 0,
      list: [],
      toTime: null,
      switch: false, // 控制下拉刷新
      currentPage: 1,
      currentTitle: 0,
      hasNextPgae: true,
      dialogStyle: null,
      scrollTop: 0,
      currentMdd: { name: '', id: null },
      selectedMddName: null,
      searchResult: null,
      focus: 0, // 蜂首
      top: 0, // 宝藏
      start: 0, // 星级
      activity: true,
      user: null,
      flag: false, // 是否显示我也要分享
      loginUser: null,
      shareUser: null,
      hasPramas: false,
      submitLock: true,
      activityStatus: true,
      isAwardVisible: true, // 是否关闭奖项显示
      isDestroyDialogVisible: false,
      isExplanationDialogVisible: false,
      isShareTipsVisible: false,
      isContentLoaded: false,
      isGraftVisible: false,
      isSelected: false,
      textareaPlaceholder:
        '例如：萌生此次旅行念头的原因；旅行中想要完成的心愿清单等。',
    };
  },
  computed: {
    isButtonActive() {
      const { mddid, dyear, ryear } = this.params;
      if (!mddid || !dyear || !ryear) {
        return false;
      } else {
        return true;
      }
    },
    title() {
      switch (this.step) {
        case 1:
          return require('../assets/images/text1.png');
        case 2:
          return require('../assets/images/text5.png');
        case 3:
          return this.flag
            ? require('../assets/images/text4.png')
            : require('../assets/images/text6.png');
        default:
          return '';
      }
    },
    minDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = (date.getDate() + 1).toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    maxDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = (date.getDate() + 2).toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    date() {
      const { dmonth, dday, rmonth, rday } = this.params;
      if (dday == 0 || rday == 0) {
        return `${dmonth}月出发`;
      }
      return `${dmonth}/${dday}-${rmonth}/${rday}`;
    },
  },
  watch: {
    currentMdd: {
      handler: async function (val) {
        if (val.name.length <= 0) {
          this.searchResult = null;
          return;
        }
        if (this.isSelected && this.selectedMddName !== val.name) {
          await this.handleMddChange(val.name);
          this.isSelected = false;
        }
        if (!this.isSelected) await this.handleMddChange(val.name);
      },
      deep: true,
    },
  },
  async mounted() {
    const timestamp = +new Date();
    const deadline = +new Date('2018-10-01');
    if (timestamp >= deadline) {
      this.isAwardVisible = false;
    }
    this._initActivityInfo();
    this._addEventListener();
    this._addPageEvent();
    await this._updateReserveList();
    window.scrollTo(0, 0);
    await this._initParams();
    const hasPramas = await this._parseRouter();
    this.hasPramas = hasPramas;
    if (hasPramas) {
      if (this.shareUser.uid !== this.loginUser.uid) {
        this.flag = true;
      }
      this.user = this.shareUser;
    } else {
      this.user = this.loginUser;
    }
    this.isContentLoaded = true;
    this._addShareInfo();
    window.MFWAPP &&
      window.MFWAPP.webview.enableBounces({
        enable: 0,
      });
  },
  methods: {
    handleVisibleChange(val) {
      this.isDatePickerVisible = val;
    },
    handleConfirm(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if(this.datePickerId === 1) {
        this.params.dyear = year;
        this.params.dmonth = month;
        this.params.dday = day;
      } else if(this.datePickerId === 2) {
        this.params.ryear = year;
        this.params.rmonth = month;
        this.params.rday = day;
      }
    },
    handleShowDatePicker(id) {
      this.datePickerId = id;
      this.$refs.picker.open();
    },
    fixIosBug() {
      this.$nextTick(() => {
        document.body.scrollTo(0, 0);
      });
    },
    async handleShareMore() {
      const hasNote = await this._initParams();
      this.user = this.loginUser;
      if (hasNote) {
        this.flag = false;
        this._addShareInfo();
      } else {
        this.handleResetData();
      }
    },
    handleOpenDetail() {
      window.open('http://www.mafengwo.cn/i/10508198.html ');
    },
    handleResetData() {
      this._resetParams();
      this.step = 1;
      this.flag = false;
    },
    handleFromTimeChange(val) {
      const date = new Date(val);
      this.params.dyear = date.getFullYear();
      this.params.dmonth = date.getMonth() + 1;
      this.params.dday = date.getDate();
    },
    handleToTimeChange(val) {
      const date = new Date(val);
      this.params.ryear = date.getFullYear();
      this.params.rmonth = date.getMonth() + 1;
      this.params.rday = date.getDate();
    },
    async handleMddChange(key) {
      if (key.length <= 0) {
        this.searchResult = null;
        return;
      }
      this.currentMdd.id = null;
      const res = await searchMdd({ key });
      this.searchResult = res;
    },
    handleMddBlur() {
      this.fixIosBug();
      setTimeout(() => {
        if (!this.currentMdd.id) {
          this.currentMdd = { name: '', id: null };
        }
        this.searchResult = null;
      }, 200);
    },
    handleSelectMdd(item) {
      this.isSelected = true;
      this.currentMdd.name = item.name;
      this.selectedMddName = item.name;
      this.currentMdd.id = item.mddid;
      this.params.mddid = item.mddid;
      const input = this.$refs['input'];
      input.blur();
    },
    async handleSubmit() {
      if (this.submitLock) {
        this.submitLock = false;
        const res = await addReserveNote(this.params);
        this.submitLock = true;
        if (res) {
          this.handleNextStep(3);
          this.isGraftVisible = true;
          this.list = [];
          this.currentPage = 1;
          this._updateReserveList();
          // this._updateReserveList()
        }
      }
    },
    handleNextStep(step) {
      if (step === 2 && !this.isButtonActive) return;
      this.step = step;
    },
    handleScroll() {
      if (this.switch || !this.hasNextPgae) return;
      const wrapper = this.$refs['wrapper'];
      const clientHeight = wrapper.clientHeight;
      const scrollTop = wrapper.scrollTop;
      const scrollHeight = wrapper.scrollHeight;
      if (scrollTop + clientHeight + 600 > scrollHeight) {
        this._updateReserveList();
        this.switch = true;
      }
    },
    async handleDestroy() {
      this.isDestroyDialogVisible = false;
      const res = await cancelReserveNote();
      if (res) {
        this.step = 1;
        this._resetParams();
        this.list = [];
        this.currentPage = 1;
        this._updateReserveList();
      }
    },
    handleShare() {
      this._addShareInfo();
      window.MFWAPP && window.MFWAPP.share.showSharePanel();
      if (this._isWebview() && !window.MFWAPP) {
        this.isShareTipsVisible = true;
      }
    },
    _isWebview() {
      const ua = navigator.userAgent;
      const isChrome =
        ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
      const webview =
        !isChrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);

      return webview;
    },
    _resetParams() {
      Object.assign(this.$data.params, this.$options.data().params);
      this.currentMdd = { name: '', id: null };
    },
    async _parseRouter() {
      const url = window.location.href;
      const params = this._parseQueryString(url);
      if (params && params.uid) {
        const res = await getUserNote({ id: params.uid });
        if (res.mdd) {
          this.step = 3;
          const {
            user,
            mdd,
            departure_year,
            departure_month,
            departure_day,
            return_year,
            return_month,
            return_day,
            type,
            content,
          } = res;
          this.currentMdd = mdd;
          this.params = {
            type,
            content,
            mddid: mdd.mddid,
            dyear: departure_year,
            dmonth: departure_month,
            dday: departure_day,
            ryear: return_year,
            rmonth: return_month,
            rday: return_day,
          };
          this.shareUser = user;
          return true;
        }
      }
      return false;
    },
    async _initParams() {
      const res = await getMyNote();
      if (res && res.mdd) {
        this.step = 3;
        const {
          mdd,
          departure_year,
          departure_month,
          departure_day,
          return_year,
          return_month,
          return_day,
          type,
          content,
        } = res;
        this.currentMdd = mdd;
        this.params = {
          type,
          content,
          mddid: mdd.mddid,
          dyear: departure_year,
          dmonth: departure_month,
          dday: departure_day,
          ryear: return_year,
          rmonth: return_month,
          rday: return_day,
        };
        return true;
      }
      return false;
    },
    _addPageEvent() {
      window.mfwPageEvent &&
        window.mfwPageEvent('ginfo', 'activity:reserveNote', {
          action: '活动首页-打开',
        });
    },
    _addEventListener() {
      const wrapper = this.$refs['wrapper'];
      wrapper.addEventListener('scroll', this.handleScroll);
    },
    async _initActivityInfo() {
      const res = await getActivityInfo();
      const { activity, user } = res;
      this.activity = activity;
      this.loginUser = user;
    },
    _addShareInfo() {
      const { user, currentMdd } = this;
      const { dyear } = this.params;
      const head = document.querySelector('head');
      const meta1 = document.createElement('meta');
      const meta2 = document.createElement('meta');
      const meta3 = document.createElement('meta');
      let title =
        user && dyear
          ? `${user.name}预约了一篇去${currentMdd.name}的游记`
          : '十一出去玩的人速来！预约完成游记，赢千元旅行基金';
      const contentText =
        '这次不拖延，预约游记，留一份回忆，给自己一个说到做到的机会';
      const link = `https://w.mafengwo.cn/activity_reserve_note/index?uid=${
        user.uid
      }`;
      meta1.setAttribute('property', 'og:title');
      meta1.setAttribute('content', title);
      meta2.setAttribute('property', 'og:url');
      meta2.setAttribute('content', link);
      meta3.setAttribute('property', 'og:description');
      meta3.setAttribute('content', contentText);
      head.appendChild(meta1);
      head.appendChild(meta2);
      head.appendChild(meta3);
      const _this = this;
      wxapi.share({
        title,
        link,
        imgUrl:
          'https://b4-q.mafengwo.net/s12/M00/21/41/wKgED1uXeeaAYANaAAAvlwBQ4L8583.png',
        success: function () {
          _this.isShareTipsVisible = false;
        },
      });
    },
    async _updateReserveList() {
      if (this.hasNextPgae) {
        const res = await getReserveList({ page: this.currentPage });
        const { item, page, total } = res;
        const { focus, top, start } = total;
        const { boundary, next } = page;
        const newList = [...this.list, ...item];
        this.list = newList;
        this.currentPage = boundary;
        this.hasNextPgae = next;
        this.switch = false;
        this.focus = focus;
        this.top = top;
        this.start = start;
      }
    },
    _parseQueryString(url) {
      const obj = {};
      let keyvalue = [];
      let key = '',
        value = '';
      const paraString = url
        .substring(url.indexOf('?') + 1, url.length)
        .split('&');
      for (var i in paraString) {
        keyvalue = paraString[i].split('=');
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
      }
      return obj;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/px2rem';
@import '../assets/scss/variable';

@media (min-width: 1366px) {
  .container {
    .wrapper {
      max-width: 500px;
    }
    .qrcode {
      z-index: 999;
      display: block;
      transform: translate(7.5rem, 5rem);
      width: px2rem(365);
      height: px2rem(332);
    }
  }
}
@media (max-width: 1366px) {
  .container {
    .wrapper {
      max-width: 1366px;
    }
    .qrcode {
      display: none;
    }
  }
}

.container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #f6f7f9;
}
.wrapper {
  background: $white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.prevent-scroll {
  overflow: hidden;
}
/*----- header -----*/
.header {
  box-sizing: border-box;
  padding-top: px2rem(40);
  width: 100%;
  height: px2rem(862);
  background: url('../assets/images/background.png') 0 0/60px 60px repeat;
  .title {
    position: relative;
    margin-left: calc(50% - 0.06rem);
    transform: translateX(-50%);
    width: px2rem(650);
    height: px2rem(90);
  }
  .rect {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: px2rem(90);
    padding-left: px2rem(34);
    background: $white;
    border-radius: px2rem(2);
    border: px2rem(6) solid $blue;
    font-size: $font-size-large;
    font-weight: 600;
    color: $dark;
    line-height: px2rem(78);
    span {
      color: $blue;
    }
  }
  .rect1 {
    z-index: 3;
    transform: translate(0%, 0%);
    animation: play-1 15s infinite;
  }
  .rect2 {
    z-index: 2;
    transform: translate(5px, 5px);
    animation: play-2 15s infinite;
  }
  .rect3 {
    z-index: 1;
    transform: translate(10px, 10px);
    animation: play-3 15s infinite;
  }
}

/*----- main -----*/
.main {
  padding-top: px2rem(80);
  margin-top: px2rem(-206);
  width: 100%;
  background: $pink;
  padding-bottom: px2rem(80);
  .card {
    position: relative;
    width: px2rem(666);
    height: px2rem(885);
    margin-left: calc(50% - 0.05rem);
    transform: translateX(-50%);
    .core {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background: $white;
      border-radius: px2rem(2);
      border: px2rem(6) solid $blue;
      position: relative;
      .title {
        display: flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: px2rem(122);
        padding-left: px2rem(40);
        border-bottom: px2rem(6) solid $blue;
        .avatar {
          float: left;
          width: px2rem(72);
          height: px2rem(72);
          border-radius: 50%;
          margin-right: px2rem(20);
          overflow: hidden;
        }
        .text {
          float: left;
          // position: absolute;
          // top: px2rem(34);
          // left: px2rem(40);
          width: px2rem(217);
          height: px2rem(48);
        }
        .pot {
          box-sizing: border-box;
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: px2rem(6) solid $blue;
          top: px2rem(46);
        }
        .pot1 {
          right: px2rem(26);
        }
        .pot2 {
          right: px2rem(70);
        }
        .pot3 {
          right: px2rem(114);
        }
      }
      .form1 {
        box-sizing: border-box;
        padding: px2rem(40);
        width: 100%;
        height: 100%;
        .search {
          z-index: 20;
          position: absolute;
          left: px2rem(168);
          top: px2rem(224);
          width: px2rem(446);
          max-height: px2rem(192);
          overflow-y: auto;
          background: $white;
          font-size: $font-size-normol;
          .search-item {
            box-sizing: border-box;
            text-align: left;
            padding-left: px2rem(20);
            height: px2rem(64);
            line-height: px2rem(64);
            border: 1px solid $gray-light;
          }
        }
        .form-item {
          .label {
            height: px2rem(44);
            line-height: px2rem(44);
            color: $dark;
            font-weight: bold;
            font-size: $font-size-normol;
          }
        }
        .form-item1 {
          display: flex;
          justify-content: flex-start;
          padding-bottom: px2rem(30);
          .label {
            padding-top: px2rem(8);
            padding-right: px2rem(32);
            min-width: px2rem(96);
            white-space: nowrap;
          }
          .wrapper-input {
            position: relative;
            width: 100%;
            height: px2rem(64);
            .input {
              float: left;
              box-sizing: border-box;
              outline: none;
              border: none;
              padding: px2rem(20);
              height: 100%;
              width: px2rem(458);
              background: $gray-light;
              font-size: $font-size-normol;
            }
            ::placeholder {
              color: $gray;
              height: px2rem(32);
              line-height: 1.1;
              font-weight: 300;
            }
          }
        }
        .form-item2,
        .form-item3,
        .button {
          margin-bottom: px2rem(40);
        }
        .form-item2,
        .form-item3 {
          display: flex;
          justify-content: space-between;
          .left {
            display: flex;
            justify-content: flex-start;
            .label {
              padding-right: px2rem(20);
            }
            .text {
              height: px2rem(44);
              font-size: $font-size-normol;
              font-weight: 300;
              color: $dark;
              line-height: px2rem(44);
            }
            .date-picker {
              position: absolute;
              right: px2rem(35);
              width: 65%;
              opacity: 0;
            }
          }
          .icon {
            padding-top: px2rem(18);
            width: px2rem(20);
            height: px2rem(12);
          }
        }
        .form-item4 {
          .label {
            padding-bottom: px2rem(20);
          }
          .textarea {
            border: none;
            outline: none;
            box-sizing: border-box;
            padding: px2rem(20);
            width: 100%;
            height: px2rem(232);
            line-height: px2rem(48);
            background: $gray-light;
            font-size: $font-size-normol;
          }
          ::placeholder {
            color: $gray;
            font-weight: 300;
          }
        }
        .button {
          width: 100%;
          height: px2rem(80);
          line-height: px2rem(80);
          // background: $blue;
          background: $gray;
          color: $white;
          text-align: center;
          font-size: $font-size-normol;
          font-weight: 600;
        }
        .active {
          background: $blue;
        }
      }
      .form2 {
        box-sizing: border-box;
        padding: px2rem(50) px2rem(40) px2rem(40) px2rem(40);
        width: 100%;
        height: 100%;
        .form-item {
          padding-bottom: px2rem(40);
          .option {
            display: flex;
            justify-content: flex-start;
            margin-bottom: px2rem(18);
            .checkbox {
              margin-right: px2rem(16);
              width: px2rem(36);
              height: px2rem(36);
              .rect {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border: px2rem(6) solid $dark;
              }
              .active {
                float: left;
                width: 100%;
                height: 100%;
              }
            }
            .label {
              font-size: 14px; //DELETE
              height: px2rem(36); //DELETE
              line-height: px2rem(36); //DELETE
            }
          }
          .description {
            box-sizing: border-box;
            width: px2rem(536);
            height: px2rem(104);
            padding: px2rem(20);
            background: $gray-light;
            font-size: px2rem(24);
            font-weight: 300;
            color: $dark;
            line-height: px2rem(32);
          }
        }
        .buttons {
          position: absolute;
          box-sizing: border-box;
          padding: px2rem(40);
          width: 100%;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          text-align: center;
          .left {
            box-sizing: border-box;
            width: px2rem(184);
            height: px2rem(80);
            border: px2rem(6) solid $dark;
            font-size: $font-size-normol;
            font-weight: 600;
            color: $dark;
            line-height: px2rem(68);
          }
          .right {
            width: px2rem(362);
            height: px2rem(80);
            background: $blue;
            line-height: px2rem(80);
            font-size: $font-size-normol;
            color: $white;
          }
        }
      }
      .form3 {
        box-sizing: border-box;
        padding: px2rem(40);
        width: 100%;
        height: 100%;
        .date {
          display: flex;
          justify-content: flex-start;
          padding-bottom: px2rem(40);
          .icon {
            width: px2rem(33);
            height: px2rem(33);
            padding-right: px2rem(17);
            // padding-top: px2rem(4);
          }
          .text {
            height: px2rem(40);
            font-size: px2rem(40);
            font-weight: 600;
            color: $black;
            line-height: px2rem(40);
          }
        }
        .position {
          display: flex;
          justify-content: flex-start;
          padding-bottom: px2rem(34);
          .icon {
            width: px2rem(33);
            height: px2rem(33);
            padding-right: px2rem(17);
          }
          .text {
            height: px2rem(40);
            font-size: px2rem(40);
            font-weight: 600;
            color: $black;
            line-height: px2rem(40);
          }
        }
        .content {
          width: 100%;
          max-height: px2rem(420);
          font-size: $font-size-large;
          font-weight: 300;
          color: $black;
          line-height: px2rem(64);
          text-decoration: underline;
          text-decoration: underline $blue;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          overflow: hidden;
        }
        .button {
          position: absolute;
          left: px2rem(40);
          bottom: px2rem(40);
          width: px2rem(585);
          height: px2rem(80);
          line-height: px2rem(80);
          background: $blue;
          color: $white;
          text-align: center;
          font-size: $font-size-normol;
          font-weight: 600;
        }
        .buttons {
          position: absolute;
          box-sizing: border-box;
          padding: px2rem(40);
          width: 100%;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          text-align: center;
          .left {
            box-sizing: border-box;
            width: px2rem(184);
            height: px2rem(80);
            border: px2rem(6) solid $dark;
            font-size: $font-size-normol;
            font-weight: 600;
            color: $dark;
            line-height: px2rem(68);
          }
          .right {
            box-sizing: border-box;
            width: px2rem(362);
            height: px2rem(80);
            border: px2rem(6) solid $dark;
            font-size: $font-size-normol;
            font-weight: 600;
            color: $dark;
            line-height: px2rem(68);
          }
        }
        .medal {
          position: absolute;
          top: px2rem(165);
          right: px2rem(40);
          width: px2rem(52);
          text-align: center;
          .icon {
            padding-bottom: px2rem(8);
            width: px2rem(52);
            height: px2rem(72);
            float: left;
          }
          .text {
            font-size: px2rem(24);
            font-weight: 600;
            color: $black;
            line-height: px2rem(32);
          }
        }
      }
    }
    .animation {
      .person {
        z-index: 4;
        position: absolute;
        width: px2rem(660);
        height: px2rem(318);
        top: px2rem(-306);
        left: px2rem(6);
      }
      .popup {
        z-index: 3;
        position: absolute;
        width: px2rem(478);
        height: px2rem(311);
        // background: $yellow;
        top: px2rem(-546);
        left: px2rem(96);
        .rect {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: px2rem(287);
          background: $yellow;
        }
        .triangle {
          position: absolute;
          bottom: 0;
          left: px2rem(135);
        }
        .text {
          position: absolute;
          width: px2rem(451);
          height: px2rem(219);
          top: px2rem(32);
          left: px2rem(42);
        }
        .popup1 {
          position: absolute;
          top: px2rem(218);
          margin-left: calc(50% - 0.02rem);
          transform: translate(-50%);
          width: px2rem(264);
          height: px2rem(32);
        }
        .popup2 {
          position: absolute;
          top: px2rem(30);
          margin-left: calc(50% - 0.02rem);
          transform: translate(-50%);
          width: px2rem(360);
          height: px2rem(160);
        }
        .popup3 {
          position: absolute;
          top: px2rem(10);
          margin-left: calc(50% - 0.02rem);
          transform: translate(-50%);
          width: px2rem(400);
        }
        .activityClose {
          top: px2rem(59);
        }
      }
    }
    .shadow {
      z-index: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      right: -10px;
      bottom: -10px;
      background: $pink-deep;
    }
  }
}

/*----- detail -----*/
.detail {
  position: relative;
  background: $yellow;
  padding-top: px2rem(60);
  padding-bottom: px2rem(60);
  width: 100%;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: px2rem(992);
    background: $white;
  }
  .card1 {
    box-sizing: border-box;
    margin-bottom: px2rem(60);
    width: px2rem(666);
    height: px2rem(612);
    border: px2rem(6) solid $blue;
    margin-left: calc(50% - 0.05rem);
    transform: translateX(-50%);
    background: $white;
    .title {
      position: relative;
      width: 100%;
      height: px2rem(116);
      border-bottom: px2rem(6) solid $blue;
      .text {
        position: absolute;
        left: px2rem(34);
        top: px2rem(34);
        width: px2rem(217);
        height: px2rem(48);
      }
      .tips {
        position: absolute;
        right: px2rem(26);
        top: px2rem(34);
        width: px2rem(48);
        height: px2rem(48);
      }
    }
    .content {
      box-sizing: border-box;
      padding: px2rem(40);
      width: 100%;
      height: 100%;
      .content-title {
        padding-bottom: px2rem(16);
        height: px2rem(44);
        font-size: $font-size-normol;
        font-weight: 600;
        color: $black;
        line-height: px2rem(44);
      }
      .desc {
        padding-bottom: px2rem(24);
        font-size: $font-size-normol;
        font-weight: 300;
        color: $black;
        line-height: px2rem(48);
      }
      .more {
        font-size: $font-size-normol;
        font-weight: 600;
        color: $blue;
        line-height: px2rem(44);
      }
    }
  }
  .card2 {
    position: relative;
    margin-left: calc(50% - 0.05rem);
    transform: translateX(-50%);
    width: px2rem(666);
    .core {
      z-index: 2;
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: px2rem(6) solid $blue;
      background: $white;
      .title {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: px2rem(122);
        border-bottom: px2rem(6) solid $blue;
        .text {
          position: absolute;
          top: px2rem(34);
          left: px2rem(40);
          width: px2rem(267);
          height: px2rem(48);
        }
        .pot {
          box-sizing: border-box;
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: px2rem(6) solid $blue;
          top: px2rem(46);
        }
        .pot1 {
          right: px2rem(26);
        }
        .pot2 {
          right: px2rem(70);
        }
        .pot3 {
          right: px2rem(114);
        }
      }
      .comment {
        padding-top: px2rem(54);
        padding-left: px2rem(26);
        padding-right: px2rem(28);
        .item {
          margin-bottom: px2rem(48);
        }
      }
    }
    .shadow {
      z-index: 1;
      position: absolute;
      right: px2rem(-20);
      top: px2rem(20);
      width: 100%;
      height: 100%;
      background: orange;
    }
  }
}

/*----- destroy -----*/
.destroy {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.6);
  .dialog {
    margin-top: -20%;
    width: px2rem(600);
    height: px2rem(336);
    background: $white;
    border-radius: px2rem(12);
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      height: px2rem(236);
      font-size: $font-size-large;
      font-weight: 600;
      color: $black;
      line-height: px2rem(48);
      border-bottom: px2rem(2) solid rgba(229, 229, 229, 1);
    }
    .bottom {
      display: flex;
      justify-content: flex-start;
      .left,
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(297);
        font-size: $font-size-large;
        font-weight: 600;
        color: rgba(113, 115, 118, 1);
        line-height: px2rem(50);
        height: px2rem(96);
      }
      .left {
        border-right: px2rem(2) solid rgba(229, 229, 229, 1);
      }
      .active {
        color: rgba(77, 151, 255, 1);
      }
    }
  }
}

/*------ explanation -----*/
.explanation {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.6);
  .dialog {
    margin-top: -20%;
    position: relative;
    width: px2rem(600);
    height: px2rem(928);
    background: $white;
    border-radius: px2rem(20);
    .top {
      box-sizing: border-box;
      padding: px2rem(40);
      width: 100%;
      height: px2rem(828);
      .title {
        padding-bottom: px2rem(40);
        text-align: center;
        height: px2rem(48);
        font-size: $font-size-large;
        font-weight: 600;
        color: $black;
        line-height: px2rem(48);
      }
      .content {
        .section {
          font-size: $font-size-small;
          padding-bottom: px2rem(40);
          color: $black;
          line-height: px2rem(44);
          .section-title {
            font-weight: 600;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2rem(96);
      text-align: center;
      font-size: $font-size-large;
      font-weight: 600;
      color: rgba(77, 151, 255, 1);
      line-height: px2rem(96);
      border-top: px2rem(2) solid rgba(229, 229, 229, 1);
    }
  }
}

/*----- graft -----*/
.graft {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.6);
  .dialog {
    margin-top: -20%;
    position: relative;
    width: px2rem(600);
    height: px2rem(778);
    background: $white;
    border-radius: px2rem(20);
    .top {
      box-sizing: border-box;
      padding: px2rem(40);
      width: 100%;
      height: px2rem(828);
      .example {
        width: 100%;
        height: px2rem(486);
        padding-bottom: px2rem(24);
        float: left;
      }
      .desc {
        font-size: $font-size-small;
        font-weight: 300;
        color: $black;
        line-height: px2rem(44);
        span {
          font-weight: 600;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2rem(96);
      text-align: center;
      font-size: $font-size-large;
      font-weight: 600;
      color: rgba(77, 151, 255, 1);
      line-height: px2rem(96);
      border-top: px2rem(2) solid rgba(229, 229, 229, 1);
    }
  }
}

/*----- share -----*/
.wx-share {
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.6);
  .blackboard {
    position: relative;
    box-sizing: border-box;
    margin-top: -20%;
    width: px2rem(528);
    height: px2rem(352);
    border-radius: px2rem(2);
    border: px2rem(6) solid $blue;
    background: $white;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(76);
      background: $yellow;
      border-bottom: px2rem(6) solid $blue;
      .pot {
        box-sizing: border-box;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: px2rem(6) solid $blue;
        top: px2rem(28);
      }
      .pot1 {
        right: px2rem(48);
      }
      .pot2 {
        right: px2rem(88);
      }
      .pot3 {
        right: px2rem(128);
      }
    }
    .content {
      position: absolute;
      width: px2rem(285);
      height: px2rem(102);
      margin-left: 50%;
      transform: translateX(-50%);
      top: px2rem(151);
    }
    .arrow {
      position: absolute;
      width: px2rem(116);
      height: px2rem(220);
      right: px2rem(-55);
      top: px2rem(-254);
    }
  }
}

@keyframes play-1 {
  0% {
    z-index: 3;
    opacity: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(0%, 0%);
  }
  2% {
    opacity: 0;
    transform-origin: 50% 0%;
    transform: scale(0.2) translate(0%, -200%);
  }
  5% {
    opacity: 1;
    z-index: -10;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }
  33.33% {
    z-index: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }
  35.33%,
  66.67% {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: scale(1) translate(5px, 5px);
  }
  68.67%,
  100% {
    z-index: 3;
    transform-origin: 50% 0%;
    transform: scale(1) translate(0%, 0%);
  }
}

@keyframes play-2 {
  0% {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: scale(1) translate(5px, 5px);
  }

  2%,
  33.33% {
    z-index: 3;
    opacity: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(0%, 0%);
  }

  35.33% {
    opacity: 0;
    transform-origin: 50% 0%;
    transform: scale(0.2) translate(0%, -200%);
  }

  37.33% {
    opacity: 1;
    z-index: -10;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }

  66.67% {
    z-index: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }

  68.67%,
  100% {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: scale(1) translate(5px, 5px);
  }
}

@keyframes play-3 {
  0% {
    z-index: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }

  2%,
  33.33% {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: scale(1) translate(5px, 5px);
  }

  35.33%,
  66.67% {
    z-index: 3;
    opacity: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(0%, 0%);
  }

  68.67% {
    opacity: 0;
    transform-origin: 50% 0%;
    transform: scale(0.2) translate(0%, -200%);
  }

  71.67% {
    opacity: 1;
    z-index: -10;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }

  100% {
    z-index: 1;
    transform-origin: 50% 0%;
    transform: scale(1) translate(10px, 10px);
  }
}
</style>
