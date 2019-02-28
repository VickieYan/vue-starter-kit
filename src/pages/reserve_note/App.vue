<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this._setRem();
  },
  methods: {
    _setRem() {
      const baseSize = 100;
      const scale = document.documentElement.clientWidth / 750;
      let fontsize = baseSize * Math.min(scale, 2);
      if (fontsize > 60) fontsize = 60;
      document.documentElement.style.fontSize = fontsize + 'px';
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
html {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

input,
button,
select,
textarea {
  outline: none;
  user-select: text;
}

::placeholder {
  color: #999;
}

textarea {
  resize: none;
}
p {
  margin: 0;
}
li {
  list-style: none;
}

a {
  text-decoration: none;
}

.line {
  width: 23rem;
  height: 1rem;
  background: pink;
}
</style>
