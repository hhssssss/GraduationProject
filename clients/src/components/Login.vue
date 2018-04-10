<template>
  <div id="login" >
    <div class="content">
      <div class="cancel" @click="loginHide"></div>
      <div class="tip">
        <div v-if="tipFailFlag">{{tipContent}}</div>
        <div v-if="tipSuccessFlag" style="color: #419641">{{tipContent}}</div>
      </div>
      <transition name="slide-fade" mode="out-in">
        <div class="login-header" v-if="loginHeader" :key="1">
          LOGIN
        </div>
        <div class="login-header" v-else="" :key="2">
          Register
        </div>
      </transition>
      <form>
        <div class="login-input-box">
          <span class="icon icon-user"></span>
          <input type="text" placeholder="请输入账号" v-model="userId" autocomplete="username">
        </div>
        <div class="login-input-box">
          <span class="icon icon-password"></span>
          <input type="password" placeholder="请输入密码" v-model="userPwd" autocomplete="current-password">
        </div>
      </form>
      <div class="login-button-box">
        <button type="button" class="btn btn-default" @click="registerShow" v-if="loginHeader">注册</button>
        <button type="button" class="btn btn-default" @click="registerHide" v-if="!loginHeader">取消</button>
        <button type="button" class="btn btn-default" v-if="loginHeader" @click="login">登录</button>
        <button type="button" class="btn btn-default" v-if="!loginHeader" @click="register">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import lodash from 'lodash';
    export default {
        name:'login',
        data() {
            return {
              loginHeader:true,
              userId:'',
              userPwd:'',
              tipSuccessFlag:false,
              tipFailFlag:false,
              tipContent:'',
            }
        },
      methods:{
        registerShow(){
          this.userPwd = '';
          this.userId = '';
          this.loginHeader=false
        },
        registerHide(){
          this.loginHeader=true
        },
        loginHide(){
          this.$emit('loginHide')
        },
        register:lodash.debounce(function () {
          if(!this.validate(this.userId)||!this.validate(this.userPwd)){
            this.tipContent = "账号密码只能为6到10位的数字或字母！";
            this.tipSuccessFlag = false;
            this.tipFailFlag = true;
            setTimeout(() => {
              this.tipFailFlag = false;
            },1500);
            return;
          }
          axios.post("/users/register",{
            userId:this.userId,
            userPwd:this.userPwd
          }).then((response) => {
            let res = response.data;
            if (res.status == '1'){
              this.tipContent = "注册成功！";
              this.tipFailFlag = false;
              this.tipSuccessFlag = true;
              setTimeout(() => {
                this.tipSuccessFlag = false;
                this.loginHeader = true;
                this.userPwd = '';
                this.userId = '';
              },1000)
            }else{
              this.tipContent = "用户账号已被占用！";
              this.tipSuccessFlag = false;
              this.tipFailFlag = true;
              setTimeout(() => {
                this.tipFailFlag = false;
              },1500)
            }
          })
        },1000,{'leading': true, 'trailing': false}),
        login:lodash.debounce(function () {
          axios.post("/users/login",{
            userId:this.userId,
            userPwd:this.userPwd
          }).then((response) => {
            let res = response.data;
            if (res.status == '1'){
              this.tipContent = "登陆成功！";
              this.tipFailFlag = false;
              this.tipSuccessFlag = true;
              setTimeout(() => {
                this.tipSuccessFlag = false;
                this.$emit(
                  'loginSuccess',
                  this.userId ,
                  this.userPwd ,
                  res.result.userName ,
                  res.result.userProfilePicture ,
                  res.result._id ,
                  res.result.collections,
                  res.result.filmReviewCollections,
                  res.result.signIn,
                  res.result.coins,
                )
              },1000)
            }else{
              this.tipContent = "账号或密码错误！";
              this.tipSuccessFlag = false;
              this.tipFailFlag = true;
              setTimeout(() => {
                this.tipFailFlag = false;
              },1500)
            }
          })
        },1000,{'leading': true, 'trailing': false}),
        validate(value){
          const pattern = /^[a-zA-Z0-9]{6,10}$/;
          if (value === '' || value === null) return false;
          if(!pattern.test(value)){
            return false;
          }else {
            return true
          }
        }
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{
    position: fixed;
    height: 100%;
    width: 100%;
    top: -100px;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
  }
  .content{
    position: relative;
    background-color: rgba(255, 255, 255, 0.95);
    width: 420px;
    height: 280px;
    border: 1px solid #08aba6;
    border-radius: 6px;
    padding: 10px;
  }

  .login-header{
    width: 100%;
    height: 48px;
    left: 48px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #08aba6;
    margin-bottom: 20px;
    border-bottom: 1px solid #08aba6;
  }
  .cancel{
    position: absolute;
    right: 15px;
    top: 15px;
    width: 24px;
    height: 24px;
    background:url("../assets/cancel.png") center no-repeat;
    background-size: 24px auto;
    cursor: pointer;
  }
  .tip{
    position: absolute;
    top: 55px;
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #c12e2a;
  }
  .login-input-box{
    margin-top: 20px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
  }

  .login-input-box input{
    width: 360px;
    height: 40px;
    margin-left: 20px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding-left: 52px;
  }
  .login-input-box input::-webkit-input-placeholder{
    color: #dcdcdc;
  }
  .login-input-box input:hover{
    border: 1px solid #08aba6;
  }

  .login-input-box input:after{
    border: 1px solid #08aba6;
  }

  .login-input-box .icon{
    width: 40px;
    height: 24px;
    margin: 8px 0 8px 20px;
    background-color: #ff7d0a;
    display: inline-block;
    position: absolute;
    border-right: 1px solid #dcdcdc;
  }

  .login-input-box .icon.icon-user{
    background: url("../assets/man.png") center no-repeat;
    background-size: 24px auto;
  }

  .login-input-box .icon.icon-password{
    background: url("../assets/pwd.png") center no-repeat;
    background-size: 24px auto;
  }
  .login-button-box{
    margin-top: 20px;
    width: 384px;
    margin-left: 8px;
    display: flex;
    justify-content: space-around;
  }
  .login-button-box button{
    width: 80px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease-in-out;
  }
  .slide-fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    opacity: 0;
  }
</style>
