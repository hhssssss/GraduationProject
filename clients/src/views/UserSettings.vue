<template>
    <div id="userSettings">
      <elHeader></elHeader>
      <elBody></elBody>
      <elFooter></elFooter>
    </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Body from './selfComponents/userSettings/Body';
    export default {
      name:'userSettings',
      data() {
          return {}
      },
      components:{
        elHeader:Header,
        elFooter:Footer,
        elBody:Body
      },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #userSettings{
    height: 100%;
  }
</style>
