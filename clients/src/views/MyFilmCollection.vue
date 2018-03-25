<template>
  <div id="myFilmCollection">
    <elHeader></elHeader>
    <elBody></elBody>
    <elFooter></elFooter>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Body from './selfComponents/myFilmCollection/Body';
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
  #myFilmCollection{
    height: 100%;
  }
</style>
