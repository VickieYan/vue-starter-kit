<style lang="scss" scoped>
.user-lv {
  margin-left: 6px;
  display: inline-block;
  border-radius: 4px;
  font-weight: 300;
  font-size: 10px;
  padding: 0px 4px;
}
</style>
<template>
  <div class="user-lv" :style="styleObj">
    LV.{{ lv }}
  </div>
</template>
<script>
export default {
  props: {
    lv: {
      type: Number,
      default: 0
    }
  },
  computed: {
    styleObj() {
      var bgColor = '#F6F7F9',
        color = '#242629';
      if (this.lv > 7) {
        bgColor = '#FFEB88';
      } else if (this.lv > 15) {
        bgColor = '#FFDB26';
      } else if (this.lv > 39) {
        bgColor = '#242629';
        color = '#FFDB26';
      }

      return {
        color: color,
        background: bgColor
      };
    }
  }
};
</script>
