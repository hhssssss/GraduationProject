<template>
    <div id="body">
      <div class="body-top"></div>
      <div class="body-main">
        <div class="body-main-title">个人资料</div>
        <div class="body-main-item">
          <div class="left">
            头像
          </div>
          <div class="right">
            2222
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            昵称
          </div>
          <div class="right">
            <input type="text" placeholder="填写你的昵称">
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            性别
          </div>
          <div class="right sex">
            <!--<input type="text" placeholder="填写你的性别">-->
            <label><input name="Sex" type="radio">&nbsp;&nbsp;&nbsp;保密&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <label><input name="Sex" type="radio">&nbsp;&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <label><input name="Sex" type="radio">&nbsp;&nbsp;&nbsp;女&nbsp;&nbsp;&nbsp;&nbsp;</label>
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            喜欢的电影类型
          </div>
          <div class="right">
            <input type="text" placeholder="填写你喜欢的电影类型">
          </div>
        </div>
        <div class="body-main-item" style="border-bottom: 1px solid #f1f1f1;">
          <div class="left">
            个人介绍
          </div>
          <div class="right">
            <input type="text" placeholder="填写你擅长的事情，喜欢的事情">
          </div>
        </div>
        <div class="body-main-bottom">
          <div class="button">保存修改</div>
          <div class="button">返回</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "body"
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
          cursor: pointer;
          vertical-align: middle;
        }
        label{
          font-size: 16px;
          font-weight: normal;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .body-main-bottom{
      margin-top: 50px;
      display: flex;
      justify-content: space-around;
      .button{
        height: 40px;
        width: 140px;
        background-color: #08aba6;
        color: white;
        text-align: center;
        line-height: 40px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        border: 1px solid #08aba6;
      }
      .button:hover{
        background-color: #fff;
        color: #08aba6;
      }
    }
  }
</style>
