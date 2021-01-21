<template>
  <div id="app">
    <Header v-if="!log"></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/shared/Header";
export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  computed: {
    log() {
      if (this.$router.app._route.fullPath !== "/login") {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
