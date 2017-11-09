<template>
    <div id="return_top">
      <div class="main" @click="backToTop" v-show="show">
        <img src="../assets/return_top.png" alt="返回顶部" draggable="false">
      </div>
    </div>
</template>

<script>
  import { scrollIt } from '../assets/js/scrollIt';
    export default {
      name:'return_top',
      data() {
          return {
            show : false,
            pageY : 200,
          }
      },
      created () {
        window.addEventListener('scroll', this.currentPageYOffset);
      },
      beforeDestroy () {
        window.removeEventListener('scroll', this.currentPageYOffset)
      },
      methods:{
        currentPageYOffset () {
          window.scrollY > this.pageY ? this.show = true : this.show = false;
        },
        backToTop () {
          scrollIt(0, 400, 'linear', this.currentPageYOffset);
        },
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .main{
    height: 35px;
    width: 35px;
    background-color: rgba(255,255,255,0.8);
    position: fixed;
    z-index: 1;
    right: 12px;
    bottom: 12px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .075);
    &:hover{
       box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.2);
     }
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 30px;
    }
  }
</style>
