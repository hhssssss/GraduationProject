<template>
    <div id="el_header" :class='{animation1:backgroundFlag,animation2:!backgroundFlag&&initFlag}'>
      <div class="container">
        <img src="../assets/logo.png" alt="" class="logo" draggable="false">
        <div class="control">
          <div class="search">
            <input type="text" placeholder="Search for..." v-model="searchKey" @keyup.enter="search">
            <div class="search-button" @click="search" >Go!</div>
          </div>
          <div  class="title" v-if="loginFlag">您还未登录!</div>
          <div  class="title" v-else="">欢迎您！&nbsp&nbsp{{userId}}&nbsp&nbsp</div>
          <div  class="title" v-if="!loginFlag">修改个人信息</div>
          <div  class='button' @click="loginShow" v-if="loginFlag">登录</div>
          <div  class='button' @click="loginOut" v-else="">注销</div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name:'elHeader',
        data() {
            return {
              scroll:'',
              backgroundFlag:false,
              initFlag:false,
              searchKey:''
            }
        },
        computed:{
          userId(){
            return this.$store.state.userId;
          },
          loginFlag(){
            return !this.$store.state.userId;
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
            let content = {
              id : '',
              pwd : ''
            }
            this.$store.commit('updateUserInfo',content);
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

          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #el_header{
    position: fixed;
    width: 100%;
    min-width: 1024px;
    height: 140px;
    top: 0;
    left: 0;
    z-index: 1;
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
  }
  div.button:hover{
    background-color: #fff;
    color: #08aba6;
  }

</style>
