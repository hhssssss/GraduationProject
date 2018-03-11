<template>
  <div id="body">
    <div class="body-top"></div>
    <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class"
      appear-active-class="custom-appear-active-class"
    >
      <div class="body-main" v-if="!bodyTipFlag">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="body-tip" v-if="bodyTipFlag">空荡荡的什么也没有！</div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "body",
    data() {
      return {
        bodyTipFlag:0,
      }
    },
    mounted() {

    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  #body{
    background-color: #08aba6;
    margin-bottom: -60px;
    min-height: 100%;
    padding-bottom: 60px;
  }
  .body-top{
    height: 140px;
    background: url("../../../assets/bac.jpg") center no-repeat;
    background-size: 100% auto;
  }
  .body-main{
    user-select: none;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, .075);
    width: 1000px;
    margin: 60px auto;
    padding: 40px 40px;
    display: flex;
    .left{
      width: 20%;
      border-right: 1px solid #08aba6;
      height: 500px;
    }
    .right{
      width: 80%;
      height: 500px;
    }
  }
  .body-tip{
    color: #fff;
    font-size: 28px;
    text-align: center;
    width: 100%;
    margin-top: 140px;
  }
  .custom-appear-class{
    opacity: 0;
    transform: translateX(100px);
  }
  .custom-appear-to-class{
    opacity: 1;
  }
  .custom-appear-active-class{
    transition: all 1s;
  }
</style>
