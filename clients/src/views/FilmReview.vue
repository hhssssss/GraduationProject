<template>
  <div id="filmReview">
    <elHeader @loginShow="loginShow" @promptControl="promptControl"></elHeader>
    <elBody @promptControl="promptControl"></elBody>
    <elFooter></elFooter>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
      <login v-show="loginShowFlag" @loginHide="loginHide" @loginSuccess="loginSuccess"></login>
    </transition>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
      <prompt v-show="promptShowFlag" @promptControl="promptControl">
        {{promptContent}}
      </prompt>
    </transition>
    <returnTop></returnTop>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Body from './selfComponents/filmReview/Body';
  import Login from '../components/Login';
  import Prompt from '../components/Prompt';
  import ReturnTop from '../components/ReturnTop';
  export default {
    name:'filmReview',
    data() {
      return {
        loginShowFlag:false,
        promptShowFlag:false,
        promptContent:''
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
      elFooter:Footer,
      elBody:Body,
      login:Login,
      returnTop:ReturnTop,
      prompt:Prompt
    },
    methods:{
      loginShow(){
        this.loginShowFlag = !this.loginShowFlag;
      },
      loginHide(){
        this.loginShowFlag = !this.loginShowFlag;
      },
      loginSuccess(id,pwd,name,pic,_id,collections,filmReviewCollections,signIn,coins,admin){
        this.loginShowFlag = !this.loginShowFlag;
        let content = {
          id,pwd,name,pic,_id,collections,filmReviewCollections,signIn,coins,admin
        }
        this.$store.commit('getUserInfo',content);
      },
      promptControl(content){
        this.promptShowFlag = !this.promptShowFlag;
        this.promptContent = content;
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
<style scoped lang="less">
  #filmReview{
    height: 100%;
  }
</style>
