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
        <div class="left">
          <div class="search">
          <input type="text" placeholder="Search for..." v-model="searchKey" @keyup.enter="search">
          <div class="search-button" @click="search" >Go!</div>
          </div>
          <div class="main">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
          <div class="change">
            <div  class='button'>换一批</div>
          </div>
        </div>
        <div class="right">
          <div class="main">
            <div class="content">
              空荡荡的什么也没有！空荡荡的什么也没有！空荡荡的什么也没有！空荡荡的什么也没有！空荡荡的什么也没有！
            </div>
          </div>
        </div>
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
  @font-face {
    font-family: zhFont;
    src: url("../../../assets/font/beian.ttf");
  }
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
    min-height: 500px;
    margin: 60px auto;
    padding: 20px 20px;
    display: flex;
    .left{
      width: 30%;
      border-right: 1px solid #08aba6;
      min-height: 500px;
      height: 100%;
      padding-right: 20px;
      position: relative;
      .search{
        width: 100%;
        height: 40px;
        border: 1px solid #08aba6;
       input{
        height: 100%;
        width: 80%;
        float: left;
        outline: none;
        border: none;
        border-right: 1px solid #08aba6;
        color: #08aba6;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        transition: all 0.3s ease-in-out;
         padding-left: 5px;
      }
        input::-webkit-input-placeholder{
        color: #dcdcdc;
      }
        input:hover{
        border-color: #08aba6;
        position: relative;
        box-shadow: 0 0 10px 0px #08aba6 ;
      }
        input:focus{
        position: relative;
        box-shadow: 0 0 10px 0px #08aba6 ;
      }
      .search-button{
        height: 100%;
        line-height: 40px;
        text-align: center;
        width: 20%;
        background-color: #08aba6;
        color: #fff;
        float: left;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      .search-button:hover{
        background-color: #fff;
        color: #08aba6;
      }
      }
      .change{
        height: 40px;
        width: 100%;
        padding-right: 20px;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        div.button{
          height: 40px;
          width: 140px;
          background-color: #08aba6;
          color: white;
          text-align: center;
          line-height: 40px;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &:hover{
            background-color: #fff;
            color: #08aba6;
            border: 1px solid #08aba6;
          }
        }
      }
      .main{
        width: 100%;
        padding: 20px 20px;
        margin-bottom: 55px;
        .item{
          width: 100%;
          height: 250px;
          background-color: #08aba6;
          margin-top: 15px;
          cursor: pointer;
          border-radius: 6px;
          box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .075);
          &:hover{
            box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
    .right{
      width: 70%;
      min-height: 500px;
      height: 100%;
      padding-left: 40px;
      .main{
        position: relative;
        margin-top: 50px;
        .content{
          font-family: zhFont;
          font-weight: bold;
          min-height: 500px;
          width: 100%;
          outline: none;
          resize: none;
          padding: 20px 20px;
          font-size: 24px;
          line-height: 30px;
          background-color: #f4f39e;
          border-bottom-left-radius: 20px 300px;
          border-bottom-right-radius: 400px 20px;
          border-top-right-radius: 5px 100px;
          box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
          text-shadow: 0 1px 0 #F6EF97;
        }
        &:after{
          width: 180px;
          height: 30px;
          content: " ";
          margin-left: -90px;
          border: 1px solid rgba(200, 200, 200, .8);
          background: rgba(254, 254, 254, .6);
          -moz-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
          -webkit-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
          box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
          -moz-transform: rotate(-5deg);
          -webkit-transform: rotate(-5deg);
          -o-transform: rotate(-5deg);
          transform: rotate(-5deg);
          position: absolute;
          left: 50%;
          top: -15px;
        }
      }
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
