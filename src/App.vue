<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

// 和仲哲大佬学一波sass
@mixin initBasicPaddingMarginStyle($interval: 5, $start: 5, $cnt: 4) {
  $posMap: (
    'l': 'left',
    'r': 'right',
    't': 'top',
    'b': 'bottom'
  );

  @for $i from 0 to $cnt - 1 {
    $current: $start + $interval * $i;

    .p#{$current} {
      padding: $current + px
    }

    .m#{$current} {
      padding: $current + px
    }

    @each $k, $v in $posMap {
      .p#{$k}#{$current} {
        padding-#{$v}: $current + px
      }

      .m#{$k}#{$current} {
        padding-#{$v}: $current + px
      }
    }
  }
}

@mixin initBasicFontSize($interval: 2, $start: 12, $cnt: 8) {
  @for $i from 0 to $cnt - 1 {
    $current: $start + $interval * $i;
    .fs#{$current} {
      font-size: $current + px
    }
  }
}



</style>
