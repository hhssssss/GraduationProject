<template>
  <div id="prompt" >
    <div class="content">
      <div class="prompt-header">
        提示
      </div>
      <div class="slot">
        <slot>
          内容为空
        </slot>
      </div>
      <div class="prompt-button-box">
        <button type="button" class="btn btn-default" @click="promptControl">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name:'prompt',
    data() {
      return {
      }
    },
    methods:{
      promptControl(){
        this.$emit('promptControl')
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #prompt{
    position: fixed;
    height: 100%;
    width: 100%;
    top: -100px;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .content{
    position: relative;
    background-color: rgba(255, 255, 255, 0.95);
    width: 420px;
    height: 280px;
    border: 1px solid #08aba6;
    border-radius: 6px;
    padding: 10px;
  }

  .prompt-header{
    width: 100%;
    height: 48px;
    left: 48px;
    text-align: center;
    font-size: 36px;
    color: #08aba6;
    margin-bottom: 20px;
    border-bottom: 1px solid #08aba6;
  }
  .slot{
    padding: 10px;
    height: 120px;
    font-size: 20px;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
  }
  .prompt-button-box{
    margin-top: 20px;
    width: 384px;
    margin-left: 8px;
    display: flex;
    justify-content: space-around;
  }
  .prompt-button-box button{
    width: 80px;
  }
</style>
