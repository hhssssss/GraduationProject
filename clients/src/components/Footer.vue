<template>
    <div id="footer">
      <div class="main">
        ©&nbsp;&nbsp;归我所有
      </div>
    </div>
</template>

<script>
    export default {
      name:'footer',
      data() {
          return {}
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    user-select: none;
    font-size: 14px;
    width: 100%;
    min-width: 1024px;
    height: 60px;
    background-color: #1c1c1c;
    text-align: center;
    line-height: 60px;
    color: #767676;
  }
</style>
