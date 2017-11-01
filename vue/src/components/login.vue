<template>
  <div id="login" >
    <div class="content">
      <div class="cancel" @click="loginHide"></div>
      <div class="tip">
        <div v-if="registerFail">用户账号已被占用！</div>
        <div v-if="registerSuccess" style="color: #419641">注册成功！</div>
        <div v-if="loginFail" >账号或密码错误！</div>
        <div v-if="registerError" >账号或密码不能为空！</div>
        <div v-if="loginSuccess" style="color: #419641">登陆成功！</div>
      </div>
      <div class="login-header" v-if="loginHeader">
        LOGIN
      </div>
      <div class="login-header" v-else="">
        Register
      </div>
      <form>
        <div class="login-input-box">
          <span class="icon icon-user"></span>
          <input type="text" placeholder="请输入账号" v-model="userId">
        </div>
        <div class="login-input-box">
          <span class="icon icon-password"></span>
          <input type="password" placeholder="请输入密码" v-model="userPwd">
        </div>
      </form>
      <div class="login-button-box">
        <button type="button" class="btn btn-default" @click="registerShow" v-if="loginHeader">注册</button>
        <button type="button" class="btn btn-default" @click="registerHide" v-else="">取消</button>
        <button type="button" class="btn btn-default" v-if="loginHeader" @click="login">登录</button>
        <button type="button" class="btn btn-default" v-else="" @click="register">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        data() {
            return {
              loginHeader:true,
              userId:'',
              userPwd:'',
              registerFail:false,
              registerSuccess:false,
              loginFail:false,
              registerError:false,
              loginSuccess:false
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
        register(){
          if(!this.userId||!this.userPwd){
            this.registerError = true;
            setTimeout(() => {
              this.registerError = false;
            },1000);
            return;
          }
          let params = {
            userId:this.userId,
            userPwd:this.userPwd
          }
          axios.get("/users",{
            params:params
          }).then((response) => {
            let res = response.data;
            if (res.status == '1'){
              this.registerSuccess = true;
              setTimeout(() => {
                this.registerSuccess = false;
                this.loginHeader = true;
                this.userPwd = '';
                this.userId = '';
              },1000)
            }else{
              this.registerFail = true;
              setTimeout(() => {
                this.registerFail = false;
              },1000)
            }
          })
        },
        login(){
          let params = {
            userId:this.userId,
            userPwd:this.userPwd
          }
          axios.get("/users/login",{
            params:params
          }).then((response) => {
            let res = response.data;
            if (res.status == '1'){
              this.loginSuccess = true;
              setTimeout(() => {
                this.loginSuccess = false;
                this.$emit('loginSuccess',this.userId,this.userPwd)
              },1000)
            }else{
              this.loginFail = true;
              setTimeout(() => {
                this.loginFail = false;
              },1000)
            }
          })
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
    top: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    position: relative;
    background-color: rgba(255, 255, 255, 0.95);
    width: 420px;
    height: 280px;
    border: 1px solid #000000;
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
    color: #bfbfbf;
    margin-bottom: 20px;
    border-bottom: 1px solid #dcdcdc;
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
    /*background-color: rebeccapurple;*/
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

  .login-input-box input:hover{
    border: 1px solid #ff7d0a;
  }

  .login-input-box input:after{
    border: 1px solid #ff7d0a;
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
</style>
