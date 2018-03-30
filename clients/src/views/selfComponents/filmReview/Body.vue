<template>
  <div id="body">
    <div class="body-top"></div>
    <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class"
      appear-active-class="custom-appear-active-class"
    >
      <div class="body-main" v-if="filmReviews.length">
        <div class="left">
          <div class="search">
          <input type="text" placeholder="Search for..." v-model="searchKey" @keyup.enter="search">
          <div class="search-button" @click="search" >Go!</div>
          </div>
          <div class="main">
            <div class="item" v-for="(filmReview,index) in filmReviews"  v-bind:key="filmReview._id" @click="select(index)">
              <div class="title">{{filmReview.title}}</div>
              <div class="img" :style="{ 'background-image' : `url(/filmReviews/getImg?imgId=${filmReview.img})`}"></div>
            </div>
          </div>
          <div class="change">
            <div  class='button' @click="change">换一批</div>
          </div>
        </div>
        <div class="right">
          <div class="main">
            <div class="content" v-if="filmReviews[filmReviewsIndex]">
              <div class="title" >{{filmReviews[filmReviewsIndex].title||''}}</div>
              <div class="author" v-if="filmReviews[filmReviewsIndex].author">作者：{{filmReviews[filmReviewsIndex].author.userName||''}}</div>
              {{filmReviews[filmReviewsIndex].content||''}}
              <div class="reviewLabel">标签：{{filmReviews[filmReviewsIndex].label||''}}</div>
            </div>
          </div>
          <div class="bottom">
            <div class="control">
              <div class="control-left" :class="[collectionIsActive_hover || collectionsFlag[filmReviewsIndex] ? fontActiveRed :  fontNormal]" @mouseenter="collectionEnter" @mouseleave="collectionLeave" @click="collectionClick">
                <div class="control-icon">
                  <img :src="[collectionIsActive_hover || collectionsFlag[filmReviewsIndex]? collection_icon2 : collection_icon1]" alt="">
                </div>
                <div class="control-title">
                  <div class="control-title-top">收藏</div>
                  <div class="control-title-bottom">{{filmReviews[filmReviewsIndex].collected.length}}</div>
                </div>
              </div>
              <div class="control-right" :class="[coinIsActive_hover || coinsFlag ? fontActiveYellow :  fontNormal]" @mouseenter="coinEnter" @mouseleave="coinLeave" @click="coinClick">
                <div class="control-icon">
                  <img :src="[coinIsActive_hover || coinsFlag? coin_icon2 : coin_icon1]" alt="">
                </div>
                <div class="control-title">
                  <div class="control-title-top">投币</div>
                  <div class="control-title-bottom">{{filmReviews[filmReviewsIndex].coins}}</div>
                </div>
              </div>
            </div>
            <div class="addComment">
              <div class="controlSelfComment" v-if="loginFlag">
                <div class="controlSelfComment1">
                  <div class="userImg" :style="{ 'background-image' : `url(/users/getImg?imgId=${userProfilePicture})`}"></div>
                  <input type="text" v-model="selfComment" @keyup.enter="addComment">
                </div>
                <div class='button' @click="addComment">评论</div>
              </div>
              <div class="controlSelfComment" v-if="!loginFlag">
                <span class="tip">评论需要登陆！</span>
              </div>
            </div>
            <template v-if="filmReviewComments.length"  v-for="(filmReviewComment,index) in filmReviewComments">
              <div class="comments">
                <div class="userImg" :style="{ 'background-image' : `url(/users/getImg?imgId=${filmReviewComment.user.userProfilePicture})`}"></div>
                <div class="comment-news">
                  <div class="comment-userName">{{filmReviewComment.user.userName}}：</div>
                  <div class="comment-content">{{filmReviewComment.comment}}</div>
                  <div class="comment-time">{{filmReviewComment.time}}</div>
                </div>
                <div class="like" @click="addNumberOfLike_comment(index)">
                  <div class="likeImg">
                    <img :src="[likeFlag[index]? collection_icon2 : collection_icon1]" alt="">
                  </div>
                  <div class="likeNumber">{{filmReviewComment.numberOfLike.length}}</div>
                </div>
              </div>
            </template>
            <template v-if="!filmReviewComments.length">
              <div class="comments">
               <div class="tip">
                 还没有人评论，快来评论吧！
               </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="body-tip" v-if="!filmReviews.length">空荡荡的什么也没有！</div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';
  import collection_icon1 from '../../../assets/icon/collection_icon1.png';
  import collection_icon2 from '../../../assets/icon/collection_icon2.png';
  import coin_icon1 from '../../../assets/icon/coin_icon1.png';
  import coin_icon2 from '../../../assets/icon/coin_icon2.png';
  export default {
    name: "body",
    data() {
      return {
        searchKey : '',
        filmReviews : [],
        filmReviewsIndex : 0,
        collectionIsActive_hover : 0,
        coinIsActive_hover : 0,
        coin_icon1,
        coin_icon2,
        collection_icon1,
        collection_icon2,
        fontActiveRed : 'font-active-red',
        fontActiveYellow : 'font-active-yellow',
        fontNormal : 'font-normal',
        selfComment : '',
        filmReviewComments : '',
      }
    },
    computed:{
      collectionsFlag(){
        let flag = [];
        if(this.filmReviews.length && this.$store.state.filmReviewCollections)
        {
          for(let i = this.filmReviews.length; i--;){
            if(this.$store.state.filmReviewCollections.indexOf(this.filmReviews[i]._id)>=0){
              flag[i] = 1;
            }else {
              flag[i] = 0;
            }
          }
        }
        return flag;
      },
      userProfilePicture() {
        return this.$store.state.userProfilePicture;
      },
      coinsFlag(){
        return 0
      },
      loginFlag() {
        return this.$store.state.userName ? true : false;
      },
      likeFlag(){
        let flag = [];
        if(this.filmReviewComments.length && this.$store.state._id)
        {
          for(let i = this.filmReviewComments.length; i--;){
            if(this.filmReviewComments[i].numberOfLike.indexOf(this.$store.state._id)>=0){
              flag[i] = 1;
            }else {
              flag[i] = 0;
            }
          }
        }
        return flag;
      },
    },
    watch: {
      filmReviews: function () {
        if(this.filmReviews.length){
          this.getComment();
        }
      }
    },
    mounted() {
      axios.get("/filmReviews/getFilmReviews").then((response) => {
        let res = response.data;
        if (res.status == '1') {
          this.filmReviews = res.result;
        } else {
          this.filmReviews = [];
        }
      });
    },
    methods: {
      search(){
        axios.get("/filmReviews/searchFilmReviews", {params:{searchKey:this.searchKey}}).then((response) => {
          let res = response.data;
          if (res.status == '1') {
            this.filmReviews = res.result;
          } else {
            this.filmReviews = [];
          }
        })
      },
      change(){
        axios.get("/filmReviews/getRandomFilmReviews").then((response) => {
          let res = response.data;
          if (res.status == '1') {
            this.filmReviews = res.result;
          } else {
            this.filmReviews = [];
          }
        })
      },
      select(index){
        this.filmReviewsIndex = index;
        this.getComment();
      },
      collectionEnter(){
        this.collectionIsActive_hover = 1;
      },
      collectionLeave(){
        this.collectionIsActive_hover = 0;
      },
      collectionClick(){
        if(!this.$store.state.userName){
          return this.$emit('promptControl','你还没有登陆，无法收藏！');
        }
        else{
          let i = this.$store.state.filmReviewCollections.indexOf(this.filmReviews[this.filmReviewsIndex]._id);
          if(i > -1){
            this.$store.commit('pullFilmReviewCollections',i)
          }else {
            this.$store.commit('pushFilmReviewCollections',this.filmReviews[this.filmReviewsIndex]._id)
          }
          axios.get("/users/addFilmReviewCollections", {
            params:{
              filmReview_id : this.filmReviews[this.filmReviewsIndex]._id ,
              user_id : this.$store.state._id
            }}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              //收藏成功
              this.getOneFilmReview();
            } else {
              console.log("收藏失败")
            }
          })
        }
      },
      getOneFilmReview(){
        axios.get("/filmReviews/getOneFilmReview", {params : {filmReview_id : this.filmReviews[this.filmReviewsIndex]._id}}).then((response) => {
          let res = response.data;
          if (res.status == '1') {
            this.filmReviews[this.filmReviewsIndex] = res.result;
          } else {
            console.log("获取一条影评内容失败")
          }
        })
      },
      coinEnter(){
        this.coinIsActive_hover = 1;
      },
      coinLeave(){
        this.coinIsActive_hover = 0;
      },
      coinClick(){
        if(!this.$store.state.userName){
          return this.$emit('promptControl','你还没有登陆，无法投币！');
        }else if(this.$store.state.coins<=0){
          return this.$emit('promptControl','你的硬币已不足一枚！');
        } else{
          axios.get("/users/reward", {
            params:{
              filmReview_id : this.filmReviews[this.filmReviewsIndex]._id ,
              user_id : this.$store.state._id
            }}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              //投币成功
              this.$store.commit('reward');
              this.getOneFilmReview();
            } else {
              console.log("投币失败")
            }
          })
        }
      },
      addComment(){
        if(!this.selfComment){
          return this.$emit('promptControl','评论内容不能为空！');
        }
        else {
          axios.post("/filmReviews/addComment",
            {
              filmReview_id : this.filmReviews[this.filmReviewsIndex]._id,
              comment:this.selfComment,
              user_id:this.$store.state._id
            }).then((response) => {
            let res = response.data;
            if(res.status == 1)
            {
              console.log('添加评论成功');
              this.getComment();
              this.selfComment = '';
            }
            else {
              console.log(res.message)
            }
          })
        }
      },
      getComment(){
        axios.get("/filmReviews/getComments", {params : {filmReview_id : this.filmReviews[this.filmReviewsIndex]._id}}).then((response) => {
          let res = response.data;
          if (res.status == '1') {
            this.filmReviewComments = res.result;
          } else {
            console.log("获取评论失败")
          }
        })
      },
      addNumberOfLike_comment(index){
        if(!this.$store.state.userName){
          return this.$emit('promptControl','你还没有登陆，无法点赞！');
        }
        else{
          axios.get("/filmReviews/addNumberOfLike_comment", {
            params:{
              comment_id : this.filmReviewComments[index]._id ,
              user_id : this.$store.state._id
            }}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              //点赞成功
              this.getComment();
            } else {
              console.log("点赞失败")
            }
          })
        }
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
    min-width: 1024px;
    padding-bottom: 60px;
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
    width: 1000px;
    min-height: 500px;
    margin: 60px auto;
    padding: 20px 20px;
    display: flex;
    .left{
      width: 30%;
      border-right: 1px solid #08aba6;
      min-height: 500px;
      height: 100%;
      padding-right: 20px;
      position: relative;
      .search{
        width: 100%;
        height: 40px;
        border: 1px solid #08aba6;
       input{
        height: 100%;
        width: 80%;
        float: left;
        outline: none;
        border: none;
        border-right: 1px solid #08aba6;
        color: #08aba6;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        transition: all 0.3s ease-in-out;
         padding-left: 5px;
      }
        input::-webkit-input-placeholder{
        color: #dcdcdc;
      }
        input:hover{
        border-color: #08aba6;
        position: relative;
        box-shadow: 0 0 10px 0px #08aba6 ;
      }
        input:focus{
        position: relative;
        box-shadow: 0 0 10px 0px #08aba6 ;
      }
      .search-button{
        height: 100%;
        line-height: 40px;
        text-align: center;
        width: 20%;
        background-color: #08aba6;
        color: #fff;
        float: left;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      .search-button:hover{
        background-color: #fff;
        color: #08aba6;
      }
      }
      .change{
        height: 40px;
        width: 100%;
        padding-right: 20px;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        div.button{
          height: 40px;
          width: 140px;
          background-color: #08aba6;
          color: white;
          text-align: center;
          line-height: 40px;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &:hover{
            background-color: #fff;
            color: #08aba6;
            border: 1px solid #08aba6;
          }
        }
      }
      .main{
        width: 100%;
        padding: 20px 20px;
        margin-bottom: 55px;
        .item{
          width: 100%;
          height: 250px;
          background-color: #08aba6;
          margin-top: 15px;
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
            font-family: zhFont;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
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
    }
    .right{
      width: 70%;
      min-height: 500px;
      height: 100%;
      padding-left: 20px;
      .main{
        position: relative;
        margin-top: 50px;
        margin-bottom: 50px;
        .content{
          position: relative;
          font-family: zhFont;
          font-weight: bold;
          min-height: 500px;
          width: 100%;
          outline: none;
          resize: none;
          padding: 20px 20px;
          font-size: 24px;
          line-height: 30px;
          background-color: #f4f39e;
          border-bottom-left-radius: 20px 300px;
          border-bottom-right-radius: 400px 20px;
          border-top-right-radius: 5px 100px;
          box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
          text-shadow: 0 1px 0 #F6EF97;
        }
        &:after{
          width: 180px;
          height: 30px;
          content: " ";
          margin-left: -90px;
          border: 1px solid rgba(200, 200, 200, .8);
          background: rgba(254, 254, 254, .6);
          -moz-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
          -webkit-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
          box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
          -moz-transform: rotate(-5deg);
          -webkit-transform: rotate(-5deg);
          -o-transform: rotate(-5deg);
          transform: rotate(-5deg);
          position: absolute;
          left: 50%;
          top: -15px;
        }
        .title{
          text-align: center;
          font-size: 28px;
        }
        .author{
          text-align: center;
          font-size: 20px;
        }
        .reviewLabel{
          font-size: 18px;
          position: absolute;
          bottom: 18px;
        }
      }
      .bottom{
        margin-bottom: 50px;
        .control{
          height: 80px;
          margin-bottom: 10px;
          display: flex;
          .control-left{
            border-right: 1px solid #08aba6;
            flex-grow: 1;
            height: 100%;
            display: flex;
            cursor: pointer;
          }
          .control-right{
            flex-grow: 1;
            height: 100%;
            display: flex;
            cursor: pointer;
          }
          .control-icon{
            height: 100%;
            flex-grow: 1;
            text-align: right;
            padding-right: 5px;
            img{
              margin-top: 20px;
              height: 40px;
            }
          }
          .control-title{
            height: 100%;
            flex-grow: 1;
            padding-left: 10px;
            .control-title-top{
              height: 43px;
              font-size: 20px;
              display: table-cell;
              vertical-align: bottom;
            }
            .control-title-bottom{
              font-size: 16px;
            }
          }
          .font-active-red{
            color: #d81e06;
          }
          .font-active-yellow{
            color: #f4ea2a;
          }
          .font-normal{
            color: #808080;
          }
        }
        .addComment{
          background: #f2f2f5;
          padding: 0 20px;
          .controlSelfComment{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
            .tip{
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              color: #08aba6;
            }
            .controlSelfComment1{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .userImg{
                height: 50px;
                width: 50px;
                background-size: contain;
                float: left;
                background-image: url("../../../assets/user.png");
              }
              input{
                height: 40px;
                width: 400px;
                outline: none;
                border: none;
                color: #08aba6;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
                padding: 0 10px;
                margin-left: 20px;
                float: left;
                &:hover{
                  border:1px solid #08aba6;
                }
                &:focus{
                  border:1px solid #08aba6;
                }
              }
            }
            .button{
              height: 40px;
              width: 100px;
              background-color: #08aba6;
              color: white;
              text-align: center;
              line-height: 40px;
              transition: all 0.3s ease-in-out;
              cursor: pointer;
              border: 1px solid #08aba6;
              &:hover{
                background-color: #fff;
                color: #08aba6;
              }
            }
          }
        }
        .comments{
          margin-top: 10px;
          background: #f2f2f5;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .tip{
            color: #08aba6;
            text-align: center;
            height: 200px;
            width: 100%;
            font-size: 20px;
            line-height: 200px;
            text-align: center;
          }
          .userImg{
            height: 50px;
            width: 50px;
            background-size: contain;
            float: left;
            background-image: url("../../../assets/user.png");
          }
          .comment-news{
            width: 450px;
            .comment-userName{
              color: #515151;
              font-size: 16px;
            }
            .comment-content{
              font-size: 18px;
              word-break: break-all;
            }
            .comment-time{
              color: #808080;
              font-size: 14px;
            }
          }
          .like{
            width: 50px;
            height: 50px;
            text-align: center;
            cursor: pointer;
            .likeImg{
              height: 30px;
              img{
                height: 30px;
              }
            }
            .likeNumber{
              color: #808080;
            }
          }
        }
      }
    }
  }
  .body-tip{
    color: #fff;
    font-size: 28px;
    text-align: center;
    width: 100%;
    margin-top: 140px;
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
