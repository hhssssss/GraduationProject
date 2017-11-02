<template>
    <div>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="javascript" v-if="loginFlag">您还未登录!</a>
            <a class="navbar-brand" href="javascript" v-else="">欢迎您！&nbsp&nbsp{{userId}}&nbsp&nbsp</a>
          </div>
          <button type="button" class="btn btn-primary navbar-btn" @click="loginShow" v-if="loginFlag">登录</button>
          <button type="button" class="btn btn-primary navbar-btn" @click="loginOut" v-else="">注销</button>
        </div>
      </nav>
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
</style>
