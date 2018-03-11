<template>
  <div id="filmReview">
    <elHeader></elHeader>
    <elBody></elBody>
    <elFooter></elFooter>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Body from './selfComponents/filmReview/Body';
  export default {
    name:'filmReview',
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
  #filmReview{
    height: 100%;
  }
</style>
