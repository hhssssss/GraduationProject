<template>
    <div>
      <div class="table-responsive text-center">
        <table class="table table-hover">
          <thead>
          <tr >
            <th class="text-center">ProductID</th>
            <th class="text-center">ProductName</th>
            <th class="text-center">ProductPrice</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="good in goods">
            <td>{{good.productId}}</td>
            <td>{{good.productName}}</td>
            <td>{{good.salePrice}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
      props:["goods"]
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
