<template>
    <div>
      <div class="table-responsive text-center">
        <nav aria-label="...">
          <ul class="pager">
            <li class="previous"><a href="javascript:;" @click="previous"><span>&larr;</span> Previous</a></li>
            <span style="font-size: 18px">页数：&nbsp&nbsp{{parseInt(pageId)+1}}</span>
            <li class="next"><a href="javascript:;" @click="next">Next <span>&rarr;</span></a></li>
          </ul>
        </nav>
        <table class="table table-hover">
          <thead>
          <tr >
            <th class="text-center">排名</th>
            <th class="text-center">电影名称</th>
            <th class="text-center">图片</th>
            <th class="text-center">外文名</th>
            <th class="text-center">信息</th>
            <th class="text-center">描述</th>
            <th class="text-center">评分</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="movie in movies">
            <td>{{movie.ranking}}</td>
            <td>{{movie.CnName}}</td>
            <td><img :src=movie.image :alt=movie.CnName></td>
            <td>{{movie.EnName}}</td>
            <td>{{movie.information}}</td>
            <td>{{movie.describe}}</td>
            <td>{{movie.rating}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
      data() {
          return {
            movies : [],
            pageId : '0',
          }
      },
      computed:{

      },
      mounted(){
        this.getMoviesList(this.pageId);
      },
      methods: {
        getMoviesList(pageId) {
          axios.get("/movies", {params:{pageId:pageId}}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              this.movies = res.result;
            } else {
              this.movies = [];
            }
          })
        },
        previous(){
          if(this.pageId <= 0){
            return;
          }
          else {
            this.pageId--;
            this.getMoviesList(this.pageId);
          }
        },
        next() {
          if (this.pageId >= 9) {
            return;
          }
          else {
            this.pageId++;
            this.getMoviesList(this.pageId);
          }
        }
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
