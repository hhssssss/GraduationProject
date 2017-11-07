<template>
    <div>
      <el_header @loginShow="loginShow"></el_header>
      <el_body></el_body>
      <login v-show="loginShowFlag" @loginHide="loginHide" @loginSuccess="loginSuccess"></login>
    </div>
</template>

<script>
import el_header from '../components/el_header.vue';
import el_body from '../components/el_body.vue';
import login from '../components/login.vue';
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
    login
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
</style>
