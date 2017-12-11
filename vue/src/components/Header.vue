<template>
    <div id="header" :class='{animation1:backgroundFlag,animation2:!backgroundFlag&&initFlag}'>
      <div class="container">
        <img src="../assets/logo.png" alt="" class="logo" draggable="false">
        <div class="control">
          <div class="search">
            <input type="text" placeholder="Search for..." v-model="searchKey" @keyup.enter="search">
            <div class="search-button" @click="search" >Go!</div>
          </div>
          <div  class='button' @click="loginShow" v-if="loginFlag">登录</div>
          <div class="user" v-else @click="userFunctionShow" :style="{ 'background-image' : `url(${userProfilePicture})`}"></div>
          <transition name="slide-fade">
            <div class="user-function" v-show="userFunctionFlag">
              <router-link to="/user/settings"><div class="user-function-item" @click="userFunctionShow">个人信息设置</div></router-link>
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
          },
          loginShow(){
            this.$emit('loginShow')
          },
          loginOut(){
            this.$store.commit('loginOut');
            this.userFunctionShow();
            this.$router.push('/')
          },
          search(){
            axios.get("/movies/search", {params:{searchKey:this.searchKey}}).then((response) => {
              let res = response.data;
              if (res.status == '1') {
                this.$parent.$children[1].$data.movies = res.result;
              } else {
                this.$parent.$children[1].$data.movies = [];
              }
            })

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
    height: 50px;
    width: auto;
  }
  div.control{
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  div.search{
    width: 300px;
    height: 40px;
  }
  .search input{
    height: 100%;
    width: 80%;
    float: left;
    outline: none;
    border: none;
    border-right: 1px solid #08aba6;
    color: #08aba6;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    transition: all 0.3s ease-in-out;
  }
  .search input::-webkit-input-placeholder{
    color: #dcdcdc;
  }
  .search input:hover{
    border-color: #08aba6;
    position: relative;
    box-shadow: 0 0 10px 0px #08aba6 ;
  }
  .search input:focus{
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
  div.title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 140px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  div.title:hover{
    color: #08aba6;
  }
  div.button{
    height: 40px;
    width: 140px;
    background-color: #08aba6;
    color: white;
    text-align: center;
    line-height: 40px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    margin-left: 100px;
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
    margin-left: 100px;
  }
  .user-function{
    width: 200px;
    background-color: #fff;
    position: absolute;
    top: 100%;
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
