<template>
    <div id="main">
      <elHeader @loginShow="loginShow"></elHeader>
      <elBody></elBody>
      <elFooter></elFooter>
      <transition v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:leave="leave"
                  v-bind:css="false">
        <login v-show="loginShowFlag" @loginHide="loginHide" @loginSuccess="loginSuccess"></login>
      </transition>
      <returnTop></returnTop>
    </div>
</template>

<script>
import Header from '../components/Header';
import Body from './selfComponents/main/Body';
import Login from '../components/Login';
import Footer from '../components/Footer';
import ReturnTop from '../components/ReturnTop';
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
    loginSuccess(id,pwd,name,pic,_id,collections,filmReviewCollections,signIn,coins){
      this.loginShowFlag = !this.loginShowFlag;
      let content = {
        id,pwd,name,pic,_id,collections,filmReviewCollections,signIn,coins,
      }
      this.$store.commit('getUserInfo',content);
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      // Velocity(el, { opacity: 1, height: '50%',width: '50%' }, { duration: 300 })
      Velocity(el, { opacity: 1,translateY:100 }, { duration: 250,complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { opacity: 0,translateY:-100  }, { duration: 250,complete: done })
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
