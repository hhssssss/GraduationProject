<template>
    <div id="main">
      <elHeader @loginShow="loginShow"></elHeader>
      <elBody></elBody>
      <elFooter></elFooter>
      <login v-show="loginShowFlag" @loginHide="loginHide" @loginSuccess="loginSuccess"></login>
      <returnTop></returnTop>
    </div>
</template>

<script>
import Header from '../components/Header';
import Body from './selfComponents/main/Body';
import Login from './selfComponents/main/Login';
import Footer from '../components/Footer';
import ReturnTop from './selfComponents/main/ReturnTop';
export default {
  name: 'main',
  data () {
    return {
      loginShowFlag:false,
    }
  },
  computed:{
    userId(){
      return this.$store.state.userId;
    },
    userPwd(){
      return this.$store.state.userPwd;
    }
  },
  components:{
    elHeader:Header,
    elBody:Body,
    elFooter:Footer,
    login:Login,
    returnTop:ReturnTop
  },
  methods:{
    loginShow(){
      this.loginShowFlag = !this.loginShowFlag;
    },
    loginHide(){
      this.loginShowFlag = !this.loginShowFlag;
    },
    loginSuccess(id,pwd){
      this.loginShowFlag = !this.loginShowFlag;
      let content = {
        id,pwd
      }
      this.$store.commit('updateUserInfo',content);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main{
    height: 100%;
  }
</style>
