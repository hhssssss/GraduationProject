<template>
  <div id="body">
    <div class="body-top"></div>
    <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class"
      appear-active-class="custom-appear-active-class"
    >
      <div class="body-main">
        <template v-if="movies.length">
          <div class="control" v-for="(movie,index) in movies"  v-bind:key="movie._id">
            <div class="item" @click="select(index)">
              <div class="title">{{movie.name}}</div>
              <div class="img" :style="{ 'background-image' : `url(/movies/getImg?imgId=${movie.image})`}"></div>
            </div>
          </div>
        </template>
        <div class="moreComment" v-if="movies.length&&moreFlag" @click="getMore">
          点击加载更多
          <img src="../../../assets/more.png" alt="">
        </div>
        <div class="moreComment" v-if="movies.length&&!moreFlag">
          没有更多了！
        </div>
        <div class="tip" v-if="!movies.length">
          你还没有收藏过电影哦！
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';
  import filmReviewImg from '../../../assets/icon/filmReview.png'
  export default {
    name: "body",
    data() {
      return {
        movies : [],
        moreFlag : 1,
      }
    },
    mounted() {
      this.getMovies();
    },
    methods: {
      getMovies(){
        axios.get("/users/getFilmCollection", {params : {user_id : this.$store.state._id}}).then((response) => {
          let res = response.data;
          if (res.status == '1') {
            this.movies = res.result[0].collections;
          } else {
            this.movies = [];
          }
        });
      },
      select(index){
        this.$router.push({name:"OneMovie",params:{film_id:this.movies[index]._id}})
      },
      getMore(){
        axios.get("/users/getFilmCollectionByIndex", {params: { user_id : this.$store.state._id , index : this.movies.length }}).then((response) => {
          let res = response.data;
          if (res.status == '1') {
            this.movies = this.movies.concat(res.result[0].collections);
            if(0<res.result[0].collections.length){
              console.log("获取电影成功，还有跟多");
            }else {
              this.moreFlag = 0;
            }
          } else {
            console.log("获取电影失败");
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @font-face {
    font-family: zhFont;
    src: url("../../../assets/font/beian.ttf");
  }
  #body{
    background-color: #08aba6;
    margin-bottom: -60px;
    min-height: 100%;
    padding-bottom: 60px;
    min-width: 1024px;
  }
  .body-top{
    height: 140px;
    background: url("../../../assets/bac.jpg") center no-repeat;
    background-size: 100% auto;
  }
  .body-main{
    user-select: none;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, .075);
    width: 800px;
    min-height: 400px;
    margin: 60px auto;
    padding: 0 40px;
    display: flex;
    flex-wrap: wrap;
    .control{
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 33.333%;
      .item{
        width: 200px;
        height: 250px;
        margin-top: 40px;
        background-color: #08aba6;
        cursor: pointer;
        border-radius: 6px;
        box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .075);
        &:hover{
          box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
        }
        .title{
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          border-bottom: 1px solid #fff;
          font-family: zhFont;
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
        }
        .img{
          height: 210px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
    .tip{
      width: 100%;
      display: flex;
      font-size: 24px;
      color: #08aba6;
      justify-content: center;
      align-items: center;
    }
    .moreComment{
      cursor: pointer;
      width: 800px;
      margin: 40px -40px 0 -40px;
      border-top: 1px solid #08aba6;
      color: #08aba6;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      img{
        height: 22px;
      }
    }
  }
  .custom-appear-class{
    opacity: 0;
    transform: translateX(100px);
  }
  .custom-appear-to-class{
    opacity: 1;
  }
  .custom-appear-active-class{
    transition: all 1s;
  }
</style>
