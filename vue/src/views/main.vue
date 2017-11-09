<template>
    <div id="main">
      <el_header @loginShow="loginShow"></el_header>
      <el_body></el_body>
      <el_footer></el_footer>
      <login v-show="loginShowFlag" @loginHide="loginHide" @loginSuccess="loginSuccess"></login>
      <return_top></return_top>
    </div>
</template>

<script>
import el_header from '../components/el_header.vue';
import el_body from '../components/el_body.vue';
import login from '../components/login.vue';
import el_footer from '../components/el_footer.vue';
import return_top from '../components/return_top.vue';
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
    el_header,
    el_body,
    el_footer,
    login,
    return_top
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
