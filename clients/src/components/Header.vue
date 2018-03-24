<template>
    <div id="header" :class='{animation1:backgroundFlag,animation2:!backgroundFlag&&initFlag}'>
      <div class="container">
        <img src="../assets/logo.png" alt="" class="logo" draggable="false">
        <div class="control">
          <div class="navigation">
            <router-link to="/"><div class="first">电影</div></router-link>
            <router-link to="/filmReview"><div class="second">影评</div></router-link>
          </div>
          <div  class='button' @click="loginShow" v-if="loginFlag">登录</div>
          <div class="user" v-else @click="userFunctionShow" :style="{ 'background-image' : `url(/users/getImg?imgId=${userProfilePicture})`}"></div>
          <transition name="slide-fade">
            <div class="user-function" v-show="userFunctionFlag">
              <div class="user-function-item" @click="signIn">签到</div>
              <router-link to="/user/settings"><div class="user-function-item" @click="userFunctionShow">个人信息设置</div></router-link>
              <router-link to="/film/addReview"><div class="user-function-item" @click="userFunctionShow">我要写影评</div></router-link>
              <div class="user-function-item" @click="loginOut">登出</div>
            </div>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name:'header',
        data() {
            return {
              scroll:'',
              backgroundFlag:false,
              initFlag:false,
              searchKey:'',
              userFunctionFlag:false
            }
        },
        computed:{
          userId(){
            return this.$store.state.userId;
          },
          loginFlag(){
            return !this.$store.state.userId;
          },
          userProfilePicture(){
            return this.$store.state.userProfilePicture
          },
          signInFlag(){
            let d = new Date().toLocaleDateString(),
                flag;
            if(this.$store.state.signIn.indexOf(d)>-1){
              flag = 1;
            }else{
              flag = 0;
            }
            return flag;
          }
        },
        created() {
          window.addEventListener('scroll', this.menu);
        },
        beforeDestroy () {
          window.removeEventListener('scroll', this.menu)
        },
        methods:{
          menu() {
            this.scroll = window.scrollY;
            if(this.scroll>=50){
              this.backgroundFlag = true;
              this.initFlag = true;
            }else {
              this.backgroundFlag = false;
            }
            let sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
            document.getElementById('header').style.left=sl+'px';
          },
          loginShow(){
            this.$emit('loginShow')
          },
          loginOut(){
            this.$store.commit('loginOut');
            this.userFunctionShow();
            this.$router.push('/')
          },
          signIn(){
            if(this.signInFlag){
              console.log("已经签到过了");
            }else {
              axios.get("/users/signIn",{params:{date:new Date().toLocaleDateString(),user_id:this.$store.state._id}}).then((response) => {
                let res = response.data
                if(res.status = '1'){
                  // 签到成功
                  this.$store.commit('pushSignIn',new Date().toLocaleDateString());
                }else{
                  console.log("签到失败");
                }
              })
            }
          },
          userFunctionShow(){
            this.userFunctionFlag = !this.userFunctionFlag;
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #header{
    position: fixed;
    width: 100%;
    min-width: 1024px;
    height: 140px;
    top: 0;
    left: 0;
    z-index: 9;
    user-select: none;
  }
  .animation1{
    animation:myfirst 0.7s ease-in-out;
    animation-fill-mode : forwards
  }
  @keyframes myfirst{
    from{
      background-color: rgba(0,0,0,0);
      height: 140px
    }
    to{
      background-color: rgba(0,0,0,0.8);
      height: 100px
    }
  }
  .animation2{
    animation:mySecond 0.7s ease-in-out;
    animation-fill-mode : forwards
  }
  @keyframes mySecond{
    from{
      background-color: rgba(0,0,0,0.8);
      height: 100px
    }
    to{
      background-color: rgba(0,0,0,0);
      height: 140px
    }
  }
  div.container{
    width: 100%;
    height: 100%;
    padding: 0 10%;
    display: flex;
    align-items: center;
    color: #fff;
    letter-spacing: 2px;
  }
  img.logo{
    height: auto;
    width: 10%;
    max-width: 120px;
  }
  div.control{
    flex-grow: 1;
    height: 100%;
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  div .navigation{
    width: 70%;
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .first,.second{
      color: #08aba6;
      height: 30px;
      line-height: 30px;
      width: 100px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover{
        color: #ffffff;
      }
    }
    .first{
      border-right: 2px solid #08aba6;
    }
  }
  div.button{
    height: 40px;
    width: 15%;
    background-color: #08aba6;
    color: white;
    text-align: center;
    line-height: 40px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  div.button:hover{
    background-color: #fff;
    color: #08aba6;
  }
  .user{
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-size: contain;
    cursor: pointer;
    /*margin-left: 100px;*/
  }
  .user-function{
    width: 200px;
    background-color: #fff;
    position: absolute;
    top: 100%;
    right: 0;
    padding: 20px 0;
    color: #333;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, .075);
    .user-function-item{
      height: 35px;
      line-height: 35px;
      padding: 0 15px;
      cursor: pointer;
      &:hover{
        background-color: rgba(0,0,0,.05);
      }
    }
  }
  .slide-fade-enter-active,.slide-fade-leave-active{
    transition: all .3s ease-in-out;
  }
  .slide-fade-enter,.slide-fade-leave-to
  {
    transform: translateX(20px);
    opacity: 0;
  }
  a {
    text-decoration:none;
    out-line: none;
    color: #333;
  }
</style>
