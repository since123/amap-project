<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>

<script>
export default {
  mounted() {
    let data = {
      text: "ok",
    };
    window.addEventListener("unload", (event) => {
      navigator.sendBeacon("http://localhost:3000/log", data);
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "true";
    });
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  margin-top 60px
</style>
