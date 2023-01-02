<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TwoC2P msg="Welcome to 2C2P"/>
</template>

<script>
import TwoC2P from './components/TwoC2P.vue'

export default {
  name: 'App',
  components: {
    TwoC2P
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
