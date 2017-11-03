<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
  }
  html,body{
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
</style>
