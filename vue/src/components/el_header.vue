<template>
    <div>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="javascript">Brand</a>
          </div>
          <button type="button" class="btn btn-primary navbar-btn" v-bind:class="{ active: flagChange }"@click="flagChangeChild">升序</button>
          <button type="button" class="btn btn-primary navbar-btn" @click="flagChangeChild">降序</button>
          <button type="button" class="btn btn-primary navbar-btn" @click="loginShow">登陆</button>
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
        props:['flagChange'],
        methods:{
          flagChangeChild(){
            this.$emit('flagChange')
          },
          loginShow(){
            this.$emit('loginShow')
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
