<template>
  <div id="myFilmReviewCollection">
    <elHeader @promptControl="promptControl"></elHeader>
    <elBody></elBody>
    <elFooter></elFooter>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
      <prompt v-show="promptShowFlag" @promptControl="promptControl">
        {{promptContent}}
      </prompt>
    </transition>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Body from './selfComponents/myFilmReviewCollection/Body';
  import Prompt from '../components/Prompt';
  export default {
    name:'myFilmReview',
    data() {
      return {
        promptShowFlag:false,
        promptContent:''
      }
    },
    components:{
      elHeader:Header,
      elFooter:Footer,
      elBody:Body,
      prompt:Prompt
    },
    methods:{
      promptControl(content){
        this.promptShowFlag = !this.promptShowFlag;
        this.promptContent = content;
      },
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
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
  #myFilmReviewCollection{
    height: 100%;
  }
</style>
