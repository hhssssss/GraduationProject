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
        <div class="body-main-title">撰写影评</div>
        <div class="body-main-item">
          <div class="left">
            题目
          </div>
          <div class="right">
            <input type="text" placeholder="影评的题目" >
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            标签
          </div>
          <div class="right">
            <input type="text" placeholder="影评的相关标签" >
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            封面图片
          </div>
          <div class="right" style="padding: 0">
            <div class="profile-picture" :style="{ 'background-image' : `url(${userProfilePicture})`}"></div>
            <label class="button">
              <input type="file" name="profile-picture" id="profile-picture" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="profilePicture">上传头像
            </label>
          </div>
        </div>
      </div>
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
    width: 800px;
    margin: 60px auto;
    padding: 40px 40px;
    .body-main-title{
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .body-main-item{
      padding: 10px 0;
      border-top: 1px solid #f1f1f1;
      display: flex;
      align-items: center;
      .left{
        width: 30%;
        padding: 20px 5px;
      }
      .right{
        width: 70%;
        padding: 20px 0px;
        cursor: default;
        display: flex;
        align-items: center;
        .profile-picture{
          height: 60px;
          width: 60px;
          border-radius: 100%;
          background-size: contain;
          margin-right: 100px;
          display: inline-block;
        }
        input[type='file']{
          display: none;
        }
        label{
          cursor: pointer;
          display: inline-block;
          font-size: 16px;
          font-weight: normal;
        }
        input[type='text']{
          width: 80%;
          outline: none;
          border: none;
          font-size: 18px;
          overflow: visible;
          &::placeholder{
            color: #dcdcdc;
          }
        }
        input[type='radio']{
          display: none;
        }
        .label-sex{
          margin-right: 15px;
          line-height: 1;
        }
        .radioInput{
          background-color:#fff;
          border:1px solid rgba(0,0,0,0.15);
          border-radius:100%;
          display:inline-block;
          height:16px;
          margin-right:15px;
          margin-top:-1px;
          vertical-align:middle;
          width:16px;
          line-height:1;
          padding: 2px;
        }
        input[type='radio']:checked + .radioInput{
          background-color:#08aba6;
          background-clip: content-box;
        }
      }
    }
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
