<template>
    <div id="userSettings">
      <elHeader></elHeader>
      <elBody @promptControl="promptControl"></elBody>
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
  import Body from './selfComponents/userSettings/Body';
  import Prompt from '../components/Prompt';
    export default {
      name:'userSettings',
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
  #userSettings{
    height: 100%;
  }
</style>
