<template>
    <div>
      <div class="container">
        <img src="../assets/logo.png" alt="" class="logo">
        <div class="control">
          <a  href="javascript" v-if="loginFlag">您还未登录!</a>
          <a  href="javascript" v-else="">欢迎您！&nbsp&nbsp{{userId}}&nbsp&nbsp</a>

          <div  class='button' @click="loginShow" v-if="loginFlag">登录</div>
          <div  class='button' @click="loginOut" v-else="">注销</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
        methods:{
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
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 100%;
    height: 140px;
    padding: 0 10%;
    display: flex;
    align-items: center;
  }
  .logo{
    height: 50px;
    width: auto;
  }
  .control{
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .button{
    height: 40px;
    width: 120px;
    background-color: #08aba6;
    color: white;
    text-align: center;
    line-height: 40px;
    transition: all 0.3s ease-in-out;
  }
  .button:hover{
    background-color: #fff;
    color: #08aba6;
  }

</style>
