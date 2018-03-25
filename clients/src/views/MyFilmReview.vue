<template>
  <div id="myFilmReview">
    <elHeader></elHeader>
    <elBody></elBody>
    <elFooter></elFooter>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Body from './selfComponents/myFilmReview/Body';
  export default {
    name:'myFilmReview',
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
  #myFilmReview{
    height: 100%;
  }
</style>
