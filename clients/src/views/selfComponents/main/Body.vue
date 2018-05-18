<template>
    <div id="body">
      <div class="body-top"></div>
      <div class="body-mid">
        <div class="body-mid-nav">
          电影Top250
          <div class="flip">
            <ul class="pagination flip-main">
              <li>
                <a href="#" @click="previous">
                  <span>&laquo;</span>
                </a>
              </li>
              <li><a href="#" @click="searchByPageId($event)">{{pages[0]}}</a></li>
              <li><a href="#" @click="searchByPageId($event)">{{pages[1]}}</a></li>
              <li><a href="#" @click="searchByPageId($event)">{{pages[2]}}</a></li>
              <li><a href="#" @click="searchByPageId($event)">{{pages[3]}}</a></li>
              <li><a href="#" @click="searchByPageId($event)">{{pages[4]}}</a></li>
              <li>
                <a href="#" @click="next">
                  <span>&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <transition-group
          name="fade"
          mode="in-out"
          tag="div"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
        >
          <div v-for="(movie,index) in movies" class="body-mid-content" v-bind:key="movie.ranking">
            <div class="item" :index="index">
            <div class="pic" @click="selectMovie(index)">
              <div>{{movie.ranking}}.</div>
              <img :src='`/movies/getImg?imgId=${movie.image}`' :alt=movie.CnName draggable="false">
            </div>
            <div class="info" @click="selectMovie(index)">
              <p>{{movie.title}}</p>
              <p>又名：{{movie.alias||'未知'}}</p>
              <div class="grade">{{movie.grade||'未知'}}</div>
              <p>导演：{{movie.director||'未知'}}</p>
              <p class="actors">演员：{{movie.actor||'未知'}}</p>
              <p class="others"><span>国家：{{movie.country||'未知'}}</span><span>年份：{{movie.time||'未知'}}</span><span>片长：{{movie.length||'未知'}}</span></p>
              <p>类型：{{movie.genre||'未知'}}</p>
              <p>语种：{{movie.language||'未知'}}</p>
            </div>
            <div class="control">
              <div class="control-item" :class="[collectionIsActive_hover[index] || collectionsFlag[index] ? fontActive :  fontNormal]" @mouseenter="collectionEnter(index)" @mouseleave="collectionLeave(index)" @click="collectionClick(index)">
                <img :src="[collectionIsActive_hover[index] || collectionsFlag[index]? collection_icon2 : collection_icon1]" alt="">&nbsp;&nbsp;收藏
              </div>
              <div class="control-item" :class="[commentIsActive_hover[index] || commentIsActive_click[index] ? fontActive :  fontNormal]" @mouseenter="commentEnter(index)" @mouseleave="commentLeave(index)" @click="commentClick(index)">
                <img :src="[commentIsActive_hover[index] || commentIsActive_click[index] ? comment_icon2 : comment_icon1]" alt="">&nbsp;&nbsp;评论
              </div>
            </div>
              <div class="comment" v-if="commentIsActive_click[index]">
                <div class="selfComment" v-if="loginFlag">
                  <div class="controlSelfComment">
                    <div class="controlSelfComment1">
                      <div class="userImg" :style="{ 'background-image' : `url(/users/getImg?imgId=${userProfilePicture})`}"></div>
                      <input type="text" v-model="selfComment[index]" @keyup.enter="addComment(movie.ranking,index)">
                    </div>
                    <div class='button' @click="addComment(movie.ranking,index)">评论</div>
                  </div>
                </div>
                <div class="tip" v-if="!moviesCommentFlag[index]">
                  还没有人评论，快来评论吧！
                </div>
                <div class="othersComment" v-if="moviesCommentFlag[index]">
                  <div class="othersCommentItem" v-for="(movieComment,index1) in movies[index].movieComments" v-bind:key="movieComment.user.userName">
                    <div class="userImg" :style="{ 'background-image' : `url(/users/getImg?imgId=${movieComment.user.userProfilePicture})`}"></div>
                    <div class="mainContent">
                      <div class="top">
                        <span class="userName">{{movieComment.user.userName}}：</span>
                        <span class="userComment">{{movieComment.comment}}</span>
                        <div class="userControl">
                          <div class="time">{{movieComment.time}}</div>
                          <div class="reply">
                            <div @click="reply(index,index1)">回复</div>
                            <div @click="addNumberOfLike_comment(index,index1)">赞&nbsp;&nbsp;{{movieComment.numberOfLike.length}}</div>
                          </div>
                        </div>
                        <div class="replyUser" v-if="replyCommentFlag[index][index1]&&loginFlag">
                          <input type="text" v-model="selfReplyComment[index][index1]" @keyup.enter="addReply(movieComment._id,index,index1)">
                          <div class='button' @click="addReply(movieComment._id,index,index1)">回复</div>
                        </div>
                      </div>
                      <div class="bottom">
                        <div class="replyItem" v-for="(reply,index2) in movieComment.reply.slice(0,2)" v-bind:key="reply.userId">
                          <span class="userName" v-if="">{{reply.user.userName}}：</span>
                          <span class="userComment">{{reply.comment}}</span>
                          <div class="userControl">
                            <div class="time">{{reply.time}}</div>
                            <div class="reply" @click="addNumberOfLike_commentReply(index,index1,index2)">赞&nbsp;&nbsp;{{reply.numberOfLike.length}}</div>
                          </div>
                        </div>
                        <div class="totalTip">共{{movieComment.reply.length}}条回复</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </div>
        </transition-group>
      </div>
      <div class="body-tip" v-if="bodyTipFlag">空荡荡的什么也没有，换个词试试吧！</div>
    </div>
</template>

<script>
    import axios from 'axios';
    import collection_icon1 from '../../../assets/icon/collection_icon1.png'
    import collection_icon2 from '../../../assets/icon/collection_icon2.png'
    import comment_icon1 from '../../../assets/icon/comment_icon1.png'
    import comment_icon2 from '../../../assets/icon/comment_icon2.png'
    export default {
      name:'body',
      data() {
          return {
            movies : [],
            pageId : '0',
            pages : [1,2,3,4,5],
            collection_icon1 : collection_icon1,
            collection_icon2 : collection_icon2,
            comment_icon1 : comment_icon1,
            comment_icon2 : comment_icon2,
            collectionIsActive_hover : [],
            commentIsActive_hover : [],
            commentIsActive_click : [],
            fontActive : 'font-active',
            fontNormal : 'font-normal',
            selfComment : [],
            selfReplyComment : [[],[],[],[],[],[],[],[],[],[]],
            replyCommentFlag : [[],[],[],[],[],[],[],[],[],[]],
            moviesCommentFlag : [],
          }
      },
      computed: {
        bodyTipFlag() {
          if (this.movies == '') {
            return true;
          } else {
            return false;
          }
        },
        userProfilePicture() {
          return this.$store.state.userProfilePicture;
        },
        loginFlag() {
          return this.$store.state.userName ? true : false;
        },
        collectionsFlag(){
          let flag = [0,0,0,0,0,0,0,0,0,0];
          if(this.movies[0]&&this.$store.state.collections) {
            for (let i = this.movies.length; i--;) {
              if (this.$store.state.collections.indexOf(this.movies[i]._id) >= 0) {
                flag[i] = 1;
              } else {
                flag[i] = 0;
              }
            }
          }
          return flag;
        }
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
            if(this.pages[0]==1)
              return;
            else {
              this.pages.forEach((item,index) => {
                this.pages[index] = item - 1;
              })
            }
          }
        },
        next() {
          if (this.pageId >= 24) {
            return;
          }
          else {
            this.pageId++;
            this.getMoviesList(this.pageId);
            if(this.pages[4]==25)
              return;
            else {
              this.pages.forEach((item, index) => {
                this.pages[index] = item + 1;
              })
            }
          }
        },
        searchByPageId(e){
          console.log(e.currentTarget.innerText);
          this.pageId = e.currentTarget.innerText-1;
          this.getMoviesList(this.pageId);
        },
        collectionEnter(index){
          this.$set(this.collectionIsActive_hover, index, 1);
        },
        collectionLeave(index){
          this.$set(this.collectionIsActive_hover, index, 0);
        },
        commentEnter(index){
          this.$set(this.commentIsActive_hover, index, 1);
        },
        commentLeave(index){
          this.$set(this.commentIsActive_hover, index, 0);
        },
        collectionClick(index){
          if(!this.$store.state.userName){
            return this.$emit('promptControl','你还没有登陆，无法收藏！');
          }
          else{
            let i = this.$store.state.collections.indexOf(this.movies[index]._id);
            if(i > -1){
              this.$store.commit('pullCollections',i)
            }else {
              this.$store.commit('pushCollections',this.movies[index]._id)
            }
            axios.get("/users/addCollections", {
              params:{
                movie_id : this.movies[index]._id ,
                user_id : this.$store.state._id
              }}).then((response) => {
              let res = response.data;
              if (res.status == '1') {
                // return this.$emit('promptControl','操作成功！');
              } else {
                return this.$emit('promptControl','未知服务器错误！');
              }
            })
          }
        },
        commentClick(index){
          this.$set(this.commentIsActive_click, index, !this.commentIsActive_click[index]);
          if(this.commentIsActive_click[index] == 0){
            this.$set(this.commentIsActive_hover, index, 0);
          };
          this.getMovieComment(index);
        },
        getMovieComment(index){
          axios.get("/movieComments/getMovieCommentsByLength", {params:{movieId:this.movies[index].ranking,length:5}}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              this.movies[index].movieComments = res.result;
              if(res.result.length>0){
                this.$set(this.moviesCommentFlag, index, 1);
              }
            } else {
              console.log("获取评论失败")
            }
          })
        },
        addComment(movieId,index){
          if(!this.selfComment[index]){
            return this.$emit('promptControl','评论内容不能为空！');
          }
          else {
            axios.post("/movieComments/addComment",
              {
                movieId:movieId,
                userId:this.$store.state.userId,
                comment:this.selfComment[index],
                user_id:this.$store.state._id
              }).then((response) => {
              let res = response.data;
              if(res.status == 1)
              {
                console.log('添加评论成功');
                this.movies[index].movieComments.unshift({
                  user:{
                    userName:this.$store.state.userName,
                    userProfilePicture:this.userProfilePicture,
                  },
                  time:'30秒前',
                  comment: this.selfComment[index],
                  numberOfLike:[],
                  reply:[],
                  _id:res.result
                });
                this.$set(this.moviesCommentFlag, index, 1);
                this.$set(this.selfComment, index, '');
              }
              else {
                console.log(res.message)
              }
            })
          }
        },
        beforeEnter: function (el) {
          el.style.opacity = 0
        },
        enter: function (el, done) {
            Velocity(
              el,
              { opacity: 1,translateY:-100},
              { complete: done,duration:800 }
            )
        },
        leave: function (el, done) {
            Velocity(
              el,
              {opacity: 0},
              {complete: done,duration:400}
            )
        },
        reply(index,index1){
          if(!this.$store.state.userName){
            return this.$emit('promptControl','你还没有登陆，无法回复！');
          }
          this.$set(this.replyCommentFlag[index], index1, !this.replyCommentFlag[index][index1]);
        },
        addReply(movieCommentId,index,index1){
          if(!this.selfReplyComment[index][index1]){
            return this.$emit('promptControl','回复内容不能为空！');
          }
          else {
            axios.post("/movieComments/addReply",
              {
                comment_id: movieCommentId,
                user_id: this.$store.state._id,
                comment: this.selfReplyComment[index][index1]
              }).then((response) => {
              let res = response.data;
              if (res.status == 1) {
                console.log('添加评论成功');
                this.$set(this.replyCommentFlag[index], index1, !this.replyCommentFlag[index][index1]);
                this.getMovieComment(index);
                this.$set(this.selfReplyComment[index], index1, '');
              }
              else {
                console.log(res.message)
              }
            })
          }
        },
        addNumberOfLike_comment(index,index1){
          if(!this.$store.state.userName){
            return this.$emit('promptControl','你还没有登陆，无法点赞！');
          }else{
            axios.get("/movieComments/addNumberOfLike_comment", {
              params:{
                movieComment_id:this.movies[index].movieComments[index1]._id,
                user_id : this.$store.state._id
              }}).then((response) => {
              let res = response.data;
              if (res.status == 1) {
                console.log('点赞成功');
                this.getMovieComment(index);
              }
              else {
                console.log(res.message)
              }
            })
          }
        },
        addNumberOfLike_commentReply(index,index1,index2){
          if(!this.$store.state.userName){
            return this.$emit('promptControl','你还没有登陆，无法点赞！');
          }else{
            axios.get("/movieComments/addNumberOfLike_commentReply", {
              params:{
                movieCommentReply_id:this.movies[index].movieComments[index1].reply[index2]._id,
                user_id : this.$store.state._id
              }}).then((response) => {
              let res = response.data;
              if (res.status == 1) {
                console.log('点赞成功');
                this.getMovieComment(index);
              }
              else {
                console.log(res.message)
              }
            })
          }
        },
        selectMovie(index){
          this.$router.push({name:"OneMovie",params:{film_id:this.movies[index]._id}})
        },
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #body{
    min-width: 1024px;
    background-color: #08aba6;
    margin-bottom: -60px;
    min-height: 100%;
    padding-bottom: 60px;
  }
  .body-top{
    height: 140px;
    background: url("../../../assets/bac.jpg") center no-repeat;
    background-size: 100% auto;
  }
  .body-mid{
    width: 900px;
    margin: auto;
    .body-mid-nav{
      font-size: 36px;
      padding: 20px 0 40px 100px;
      color:#fff ;
      user-select: none;
      cursor: default;
      position: relative;
      margin-bottom: 100px;
      .flip{
        position: absolute;
        height: 80px;
        width: 400px;
        bottom: 0;
        right: 0;
        .flip-main{
          position: absolute;
          right: 0px;
          font-size: 16px;
        }
      }
    }
    .item{
      user-select: none;
      padding: 12px;
      cursor: pointer;
      margin-bottom: 30px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, .075);
      &:hover{
        box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.2);
      }
      &:after{
        display: block;
        content: '';
        clear: both;
      }
      .pic{
        width: 25%;
        float: left;
        height: 223px;
        overflow: hidden;
        &>:first-child{
          float: left;
          /*width: 50px;*/
          font-style: italic;
          color: #ccc;
          font-size: 16px;
          margin-left:0px;
          margin-right: 5px;
        }
        img{
          float: left;
          width: 150px;
          height: auto;
        }
      }
      .info{
        position: relative;
        float: left;
        width: 75%;
        height: 223px;
        overflow: hidden;
        p:first-child{
          color: #669;
          font-size: 16px;
        }
        .grade{
          position: absolute;
          top: -12px;
          right: 0px;
          height: 50px;
          width: 50px;
          line-height: 50px;
          font-size: 20px;
          font-style: oblique;
          color: #08aba6;
        }
        .actors{
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
        }
        .others{
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          display: flex;
          justify-content: flex-start;
          span{
            display: block;
            float: left;
            margin-right: 30px;
          }
          &:after{
            display: block;
            content: '';
            clear: both;
          }
          &>:nth-child(3){
            flex-grow: 1;
            margin-right: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
        }
      }
      .control{
        margin: 12px -12px -12px -12px;
        height: 40px;
        width: 900px;
        float: left;
        border-top: 1px solid #dfdfdf;
        display: flex;
        align-items: center;
        .control-item{
          width: 50%;
          height: 30px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #808080;
          font-size: 14px;
          &:first-child{
            border-right: 1px solid #dfdfdf;
          }
          img{
            height: 20px;
          }
        }
        .font-active{
          color: #d81e06;
        }
        .font-normal{
          color: #808080;
        }
      }
      .comment{
        width: 900px;
        float: left;
        border-top: 1px solid #dfdfdf;
        margin: 12px -12px -12px -12px;
        background-color: #f2f2f5;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        .selfComment{
          margin: 0 12px;
          border-bottom: 1px solid #dfdfdf;
          .controlSelfComment{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
            width: 820px;
            margin: 0 28px;
            .controlSelfComment1{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .userImg{
                height: 35px;
                width: 35px;
                background-size: contain;
                border-radius: 100%;
                float: left;
              }
              input{
                height: 30px;
                width: 600px;
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
              height: 30px;
              width: 100px;
              background-color: #08aba6;
              color: white;
              text-align: center;
              line-height: 30px;
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
        .tip{
          line-height: 60px;
          height: 60px;
          color: #08aba6;
          width: 100%;
          text-align: center;
        }
        .othersComment{
          margin: 20px 40px;
          width: 820px;
          .othersCommentItem{
            display: flex;
            justify-content: flex-start;
            width: 100%;
            margin-top: 5px;
            .userImg{
              height: 35px;
              width: 35px;
              background-size: contain;
              border-radius: 100%;
            }
            .mainContent{
              margin-left: 20px;
              margin-top: -1px;
              width: 765px;
              word-break:break-all;
              font-size: 14px;
              color: #333;
              .top{
                .userName{
                  color:#08aba6 ;
                }
                .userControl{
                  display: flex;
                  justify-content: space-between;
                  .time{
                    color: #919191
                  }
                  .reply{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &>:first-child{
                      border-right: 1px solid #dfdfdf;
                      width: 50px;
                      text-align: left;
                      &:hover{
                        color: #08aba6;
                      }
                    }&>:nth-child(2){
                      width: 50px;
                      text-align: right;
                      &:hover{
                        color: #08aba6;
                      }
                    }
                  }
                }
                .replyUser{
                  background-color: #fff;
                  padding: 10px;
                  margin-top: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  input{
                    height: 30px;
                    width: 600px;
                    outline: none;
                    border: 1px solid #dfdfdf;
                    color: #08aba6;
                    padding: 0 10px;
                    &:hover{
                      border:1px solid #08aba6;
                    }
                    &:focus{
                      border:1px solid #08aba6;
                    }
                  }
                  .button{
                    height: 30px;
                    width: 80px;
                    background-color: #08aba6;
                    color: white;
                    text-align: center;
                    line-height: 30px;
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
              .bottom{
                margin-top: 10px;
                background-color: #eaeaec;
                padding: 12px;
                .replyItem{
                  border-bottom:1px solid #dfdfdf ;
                  padding-bottom: 10px;
                  .userName{
                    color:#08aba6 ;
                  }
                  .userControl{
                    display: flex;
                    justify-content: space-between;
                    .time{
                      color: #919191
                    }
                    .reply{
                      &:hover{
                        color: #08aba6;
                      }
                    }
                  }
                }
                &>:not(:first-child){
                  padding-top: 10px;
                }
                .totalTip{
                  color:#08aba6 ;
                }
              }
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
</style>
