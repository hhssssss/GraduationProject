<template>
    <div>
      <el_header @flagChange="flagChangeParents" @loginShow="loginShow" :flagChange="sortFlag"></el_header>
      <el_body :goods="goods"></el_body>
      <login v-show="loginShowFlag" @loginHide="loginHide" @loginSuccess="loginSuccess"></login>
      <div>用户名{{userId}}</div>
      <div>密码{{userPwd}}</div>
    </div>
</template>

<script>
import axios from 'axios';
import el_header from '../components/el_header.vue';
import el_body from '../components/el_body.vue';
import login from '../components/login.vue';
export default {
  name: 'hello',
  data () {
    return {
      goods: [],
      sortFlag:true,
      loginShowFlag:false,
      userId:'',
      userPwd:''
    }
  },
  components:{
    el_header,
    el_body,
    login
  },
  mounted(){
//   this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      let params = {
        sortFlag:this.sortFlag?1:-1
      }
      axios.get("/goods",{
        params:params
      }).then((response) => {
        let res = response.data;
        if (res.status == '0'){
          this.goods = res.result.list;
        }else{
          this.goods = [];
        }
      })
    },
    flagChangeParents(){
      this.sortFlag=!this.sortFlag
      this.getGoodsList();
    },
    loginShow(){
      this.loginShowFlag = !this.loginShowFlag;
    },
    loginHide(){
      this.loginShowFlag = !this.loginShowFlag;
    },
    loginSuccess(id,pwd){
      this.loginShowFlag = !this.loginShowFlag;
      this.userId = id;
      this.userPwd = pwd;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    text-align: left;
    line-height: 2;
  }
  ul,li{
    list-style: none;
  }
  ul{
    margin: 0;
    padding: 0;
  }
</style>
