<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <p>
      <router-link to="/">HelloWorld</router-link>
      <router-link to="/counter">Counter</router-link>
    </p>
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

[v-cloak] {
  display: none;
}

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
