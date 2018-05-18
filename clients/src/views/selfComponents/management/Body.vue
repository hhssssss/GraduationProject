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
        <div class="title">网站后台管理</div>
        <div class="main">
          <div class="left">
            <div class="item" :class="{ active: isActive[0]}" @click="selectItem(0)">用户管理</div>
            <div class="item" :class="{ active: isActive[1]}" @click="selectItem(1)">电影管理</div>
            <div class="item" :class="{ active: isActive[2]}" @click="selectItem(2)">影评管理</div>
          </div>
          <div class="right">
            <div class="right-title">
              <div class="search">
                <input type="text" placeholder="输入相应的名称"  v-model="searchKey" @keyup.enter="search">
                <div class="search-button" @click="search">查询{{addTypes[selectedIndex]}}</div>
              </div>
                <div class="control">
                  <div class="button" @click="pre">上一页</div>
                  <div class="button" @click="next">下一页</div>
                  <div class="button" @click="add">添加{{addTypes[selectedIndex]}}</div>
                </div>
            </div>
            <div class="line"></div>
            <div class="right-content">
              <table>
                <thead>
                <tr>
                  <th scope="col">_id</th>
                  <th scope="col">{{title[selectedIndex].first}}</th>
                  <th scope="col">{{title[selectedIndex].second}}</th>
                  <th scope="col">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in data" :key="item._id">
                  <td scope="row">{{item._id}}</td>
                  <td v-if="isActive[0]">{{item.userId}}</td>
                  <td v-if="isActive[0]">{{item.userName}}</td>
                  <td v-if="isActive[1]">{{item.name}}</td>
                  <td v-if="isActive[1]">{{item.title}}</td>
                  <td v-if="isActive[2]">{{item.title}}</td>
                  <td v-if="isActive[2]&&item.author">{{item.author.userName}}</td>
                  <td>
                    <div class="control">
                      <div class="button" @click="update(index)">修改</div>
                      <div class="button" @click="del(index)">删除</div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
      <div class="user" v-if="toastControl[0]">
        <div class="content">
          <div class="body-main-item">
            <div class="left">
              账号
            </div>
            <div class="right">
              <input type="text" placeholder="填写用户的账号（必填）" v-model="user.userId">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              密码
            </div>
            <div class="right">
              <input type="text" placeholder="填写用户的密码（必填）" v-model="user.userPwd">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              头像
            </div>
            <div class="right" style="padding: 0">
              <label class="button">
                <input type="file" name="profile-picture" id="profile-picture" accept="image/gif,image/jpeg,image/jpg,image/png" ref="profilePicture">上传头像
              </label>
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              昵称
            </div>
            <div class="right">
              <input type="text" placeholder="填写用户的昵称" v-model="user.userName">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              性别
            </div>
            <div class="right sex">
              <label class="label-sex"><input name="Sex" type="radio" value="secret" v-model="user.userGender"><span class="radioInput"></span>保密</label>
              <label class="label-sex"><input name="Sex" type="radio" value="boy" v-model="user.userGender"><span class="radioInput"></span>男</label>
              <label class="label-sex"><input name="Sex" type="radio" value="girl" v-model="user.userGender"><span class="radioInput"></span>女</label>
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              喜欢的电影类型
            </div>
            <div class="right">
              <input type="text" placeholder="填写用户喜欢的电影类型" v-model="user.userLikeTypes">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              个人介绍
            </div>
            <div class="right">
              <input type="text" placeholder="填写用户擅长的事情，喜欢的事情" v-model="user.userSelfIntroduction">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              拥有的硬币数
            </div>
            <div class="right">
              <input type="number" placeholder="填写用户拥有的硬币数" v-model="user.coins">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              管理员权限
            </div>
            <div class="right sex">
              <label class="label-sex"><input name="Admin" type="radio" value="false" v-model="user.admin"><span class="radioInput"></span>普通用户</label>
              <label class="label-sex"><input name="Admin" type="radio" value="true" v-model="user.admin"><span class="radioInput"></span>管理员</label>
            </div>
          </div>
          <div class="body-main-bottom">
            <div class="button" @click="saveUser">保存</div>
            <div class="button" @click="goBack(0)">返回</div>
          </div>
        </div>
      </div>
    </transition>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
      <div class="movie" v-if="toastControl[1]">
        <div class="content">
          <div class="body-main-item">
            <div class="left">
              排名
            </div>
            <div class="right">
              <input type="number" placeholder="填写电影的排名" v-model="movie.ranking">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              名称
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的名称(必填)" v-model="movie.name">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              图片
            </div>
            <div class="right" style="padding: 0">
              <label class="button">
                <input type="file" name="movie-picture" id="movie-picture" accept="image/gif,image/jpeg,image/jpg,image/png" ref="moviePicture">上传图片
              </label>
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              评分
            </div>
            <div class="right">
              <input type="number" placeholder="填写电影的评分" v-model="movie.grade">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              外文名
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的外文名" v-model="movie.title">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              别名
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的别名" v-model="movie.alias">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              导演
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的导演" v-model="movie.director">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              演员
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的演员" v-model="movie.actor">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              片长
            </div>
            <div class="right">
              <input type="number" placeholder="填写电影的时长（分钟）" v-model="movie.length1">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              语种
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的语种" v-model="movie.language">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              发行时间
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的发行时间" v-model="movie.time">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              类型
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的类型" v-model="movie.genre">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              发行国家
            </div>
            <div class="right">
              <input type="text" placeholder="填写电影的发行国家" v-model="movie.country">
            </div>
          </div>
          <div class="body-main-bottom">
            <div class="button" @click="saveMovie">保存</div>
            <div class="button" @click="goBack(1)">返回</div>
          </div>
        </div>
      </div>
    </transition>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
      <div class="filmReview" v-if="toastControl[2]">
        <div class="content">
          <div class="body-main-item">
            <div class="left">
              名称
            </div>
            <div class="right">
              <input type="text" placeholder="填写影评的名称（必填）" v-model="filmReview.title">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              标签
            </div>
            <div class="right">
              <input type="text" placeholder="填写影评的标签（必填）" v-model="filmReview.label">
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              图片
            </div>
            <div class="right" style="padding: 0">
              <label class="button">
                <input type="file" name="filmReview-picture" id="filmReview-picture" accept="image/gif,image/jpeg,image/jpg,image/png" ref="filmReviewPicture">上传图片
              </label>
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              内容
            </div>
            <div class="right">
              <textarea  placeholder="填写影评的内容" v-model="filmReview.content"></textarea>
            </div>
          </div>
          <div class="body-main-item">
            <div class="left">
              获得的硬币数
            </div>
            <div class="right">
              <input type="number" placeholder="填写影评所获得的硬币数" v-model="filmReview.coins">
            </div>
          </div>
          <div class="body-main-bottom">
            <div class="button" @click="saveFilmReview">保存</div>
            <div class="button" @click="goBack(2)">返回</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "body",
    data() {
      return {
        isActive:[1,0,0],
        title:[{first:'用户账号',second:'用户名称'},{first:'电影名称',second:'电影别名'},{first:'影评名称',second:'作者'}],
        addTypes:['用户','电影','影评'],
        data:'',
        pageId:0,
        searchKey:'',
        toastControl:[],
        user:{},
        movie:{},
        filmReview:{},
        updateFlag:0,
      }
    },
    computed:{
      selectedIndex(){
        return this.isActive.indexOf(1);
      }
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers(PageId = 0){
        axios.get("/users", {params : {pageId : PageId}}).then((response) => {
          let res = response.data;
          if(res.message==0){
            this.pageId--;
            this.data = '';
            return this.$emit('promptControl','已经到最后一页了！');
          }
          if (res.status == '1') {
            this.data = res.result;
          } else {
            this.data = '';
          }
        });
      },
      getMovies(PageId = 0){
        axios.get("/movies", {params:{ pageId : PageId }}).then((response) => {
          let res = response.data;
          if(res.message==0){
            this.pageId--;
            this.data = '';
            return this.$emit('promptControl','已经到最后一页了！');
          }
          if (res.status == '1') {
            this.data = res.result;
          } else {
            this.data = '';
          }
        })
      },
      getFilmReviews(PageId = 0){
        axios.get("/filmReviews", {params:{ pageId : PageId }}).then((response) => {
          let res = response.data;
          if(res.message==0){
            this.pageId--;
            this.data = '';
            return this.$emit('promptControl','已经到最后一页了！');
          }
          if (res.status == '1') {
            this.data = res.result;
          } else {
            this.data = '';
          }
        })
      },
      selectItem(index){
        this.pageId = 0;
        this.searchKey = '';
        this.isActive = [];
        this.$set(this.isActive,index,1);
        if(index == 0){
          this.getUsers();
        }else if(index == 1){
          this.getMovies();
        }else if(index == 2){
          this.getFilmReviews();
        }
      },
      pre(){
        if(this.pageId==0){
          return this.$emit('promptControl','已经到第一页了！');
        }
        this.pageId--;
        let index = this.selectedIndex;
        if(index == 0){
          this.getUsers(this.pageId);
        }else if(index == 1){
          this.getMovies(this.pageId);
        }else if(index == 2){
          this.getFilmReviews(this.pageId);
        }
      },
      next(){
        this.pageId++;
        let index = this.selectedIndex;
        if(index == 0){
          this.getUsers(this.pageId);
        }else if(index == 1){
          this.getMovies(this.pageId);
        }else if(index == 2){
          this.getFilmReviews(this.pageId);
        }
      },
      search(){
        if(this.searchKey.trim() === '' || this.searchKey.trim() === null){
          return this.$emit('promptControl','搜索框内容不能为空！');
        }
        let index = this.selectedIndex;
        if(index == 0){
          axios.get("/users/searchUsers", {params:{searchKey:this.searchKey}}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              if(!res.result.length) return this.$emit('promptControl','没有找到相应的内容！');
              this.data = res.result;
            } else {
              return this.$emit('promptControl','未知服务器错误！');
            }
          })
        }else if(index == 1){
          axios.get("/movies/searchMovies", {params:{searchKey:this.searchKey}}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              if(!res.result.length) return this.$emit('promptControl','没有找到相应的内容！');
              this.data = res.result;
            } else {
              return this.$emit('promptControl','未知服务器错误！');
            }
          })
        }else if(index == 2){
          axios.get("/filmReviews/searchFilmReviews10", {params:{searchKey:this.searchKey}}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              if(!res.result.length) return this.$emit('promptControl','没有找到相应的内容！');
              this.data = res.result;
            } else {
              return this.$emit('promptControl','未知服务器错误！');
            }
          })
        }

      },
      add(){
        this.$set(this.toastControl,this.selectedIndex,1);
      },
      saveUser(){
        if(!this.user.userId || !this.user.userPwd){
          return this.$emit('promptControl','账号或密码不能为空！');
        }
        let infoData = new FormData();
        infoData.append('profilePicture', this.$refs.profilePicture.files[0] ? this.$refs.profilePicture.files[0] : '');
        infoData.append('profilePictureFlag', this.$refs.profilePicture.files[0] ? '1' : '0');
        infoData.append('userName', this.user.userName?this.user.userName:this.user.userId);
        infoData.append('userLikeTypes', this.user.userLikeTypes?this.user.userLikeTypes:'');
        infoData.append('userSelfIntroduction', this.user.userSelfIntroduction?this.user.userSelfIntroduction:'');
        infoData.append('userGender', this.user.userGender?this.user.userGender:'');
        infoData.append('userId', this.user.userId);
        infoData.append('userPwd', this.user.userPwd);
        infoData.append('coins', this.user.coins?this.user.coins:0);
        infoData.append('admin', this.user.admin?this.user.admin:false);
        if(!this.updateFlag){
          axios.post('/users/addUser', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              console.log("添加用户成功");
              this.getUsers(this.pageId);
            }
          });
        }else {
          infoData.append('_id', this.user._id);
          axios.post('/users/updateUser', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              console.log("修改用户成功");
            }
          });
          this.updateFlag = 0;
        }
        this.$set(this.toastControl,0,0);
        this.user = {};
      },
      saveMovie(){
        if(!this.movie.name){
          return this.$emit('promptControl','电影名称不能为空！');
        }
        let infoData = new FormData();
        infoData.append('moviePicture', this.$refs.moviePicture.files[0] ? this.$refs.moviePicture.files[0] : '');
        infoData.append('moviePictureFlag', this.$refs.moviePicture.files[0] ? '1' : '0');
        infoData.append('ranking', this.movie.ranking?this.movie.ranking:'');
        infoData.append('name', this.movie.name);
        infoData.append('grade', this.movie.grade?this.movie.grade:'');
        infoData.append('title', this.movie.title?this.movie.title:'');
        infoData.append('alias', this.movie.alias?this.movie.alias:'');
        infoData.append('director', this.movie.director?this.movie.director:'');
        infoData.append('actor', this.movie.actor?this.movie.actor:'');
        infoData.append('length1', this.movie.length1?this.movie.length1:'');
        infoData.append('language', this.movie.language?this.movie.language:'');
        infoData.append('time', this.movie.time?this.movie.time:'');
        infoData.append('genre', this.movie.genre?this.movie.genre:'');
        infoData.append('country', this.movie.country?this.movie.country:'');
        if(!this.updateFlag){
          axios.post('/movies/addMovie', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              console.log("添加电影成功");
              this.getMovies(this.pageId);
            }
          });
        }else {
          infoData.append('_id', this.movie._id);
          axios.post('/movies/updateMovie', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              console.log("修改电影成功");
            }
          });
          this.updateFlag = 0;
        }
        this.$set(this.toastControl,1,0);
        this.movie = {};
      },
      saveFilmReview(){
        if(!this.filmReview.title || !this.filmReview.label){
          return this.$emit('promptControl','标题或标签不能为空！');
        }
        if(!this.filmReview.coins){
          this.filmReview.coins = 0;
        }
        let infoData = new FormData();
        infoData.append('filmReviewImg', this.$refs.filmReviewPicture.files[0] ? this.$refs.filmReviewPicture.files[0] : '');
        infoData.append('filmReviewImgFlag', this.$refs.filmReviewPicture.files[0] ? '1' : '0');
        infoData.append('filmReviewName', this.filmReview.title);
        infoData.append('filmReviewLabel', this.filmReview.label?this.filmReview.label:'');
        infoData.append('filmReviewContent', this.filmReview.content?this.filmReview.content:'');
        infoData.append('coins', this.filmReview.coins?this.filmReview.coins:0);
        infoData.append('user_id', this.$store.state._id);
        if(!this.updateFlag){
          axios.post('/filmReviews/addFilmReview', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              console.log("添加影评成功");
              this.getFilmReviews(this.pageId);
            }
          })
        }else {
          infoData.append('_id', this.filmReview._id);
          axios.post('/filmReviews/updateFilmReview', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              console.log("修改影评成功");
            }
          });
          this.updateFlag = 0;
        }
        this.$set(this.toastControl,2,0);
        this.filmReview = {};
      },
      del(index){
        let id = this.data[index]._id;
        if(this.selectedIndex == 0){
          axios.post("/users/deleteUser", {'_id':id}).then((response)=>{
              let res = response.data;
              if(res.status=="1"){
                console.log("删除成功");
                this.getUsers(this.pageId);
              }
            })
        }else if(this.selectedIndex == 1){
          axios.post("/movies/deleteMovie", {'_id':id}).then((response)=>{
            let res = response.data;
            if(res.status=="1"){
              console.log("删除成功");
              this.getMovies(this.pageId);
            }
          })
        }else if(this.selectedIndex == 2){
          axios.post("/filmReviews/deleteFilmReviewByAdmin", {'_id':id}).then((response)=>{
            let res = response.data;
            if(res.status=="1"){
              console.log("删除成功");
              this.getFilmReviews(this.pageId);
            }
          })
        }

      },
      update(index){
        this.updateFlag = 1;
        if(this.selectedIndex ==0){
          this.user = this.data[index];
        }else if(this.selectedIndex ==1){
          this.movie = this.data[index];
        }else if(this.selectedIndex ==2){
          this.filmReview = this.data[index];
        }
        this.$set(this.toastControl,this.selectedIndex,1)
      },
      goBack(index){
        this.$set(this.toastControl,index,0);
        this.user = {};
        this.movie = {};
        this.filmReview ={};
        if(this.updateFlag ==1){
          this.updateFlag = 0;
        }
      },
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
        Velocity(el, { opacity: 1,translateY:100 }, { duration: 250,complete: done })
      },
      leave: function (el, done) {
        Velocity(el, { opacity: 0,translateY:-100  }, { duration: 250,complete: done })
      }
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
    min-width: 1200px;
  }
  .body-top{
    height: 140px;
    background: url("../../../assets/bac.jpg") center no-repeat;
    background-size: 100% auto;
  }
  .body-main{
    user-select: none;
    background-color: #f2f2f5;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, .075);
    width: 1100px;
    min-height: 400px;
    margin: 60px auto;
    .title{
      font-size: 28px;
      color:  #08aba6;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .main{
      margin-top: 15px;
      min-height: 335px;
      display: flex;
      justify-content: space-between;
      .left{
        background: #fff;
        width: 150px;
        padding: 5px 10px;
        .item{
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-bottom: 1px solid #f2f2f5;
          transition: all 0.15s ease-in-out;
          cursor: pointer;
          color: #08aba6;
          &:hover{
            background: rgba(0,0,0,0.05);
          }
        }
        .active{
          background: rgba(0,0,0,0.1);
        }
      }
      .right{
        background: #fff;
        width: 935px;
        padding: 10px 10px;
        .right-title{
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          .search{
            width: 300px;
            height: 30px;
            border: 1px solid #08aba6;
            box-sizing: content-box;
            input{
              height: 100%;
              width: 75%;
              float: left;
              outline: none;
              border: none;
              border-right: 1px solid #08aba6;
              color: #08aba6;
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
              transition: all 0.3s ease-in-out;
              padding-left: 5px;
              &::-webkit-input-placeholder{
                color: #dcdcdc;
              }
              &:hover{
                border-color: #08aba6;
                position: relative;
                box-shadow: 0 0 10px 0px #08aba6 ;
              }
              &:focus{
                position: relative;
                box-shadow: 0 0 10px 0px #08aba6 ;
              }

            }
            .search-button{
              height: 100%;
              line-height: 30px;
              text-align: center;
              width: 25%;
              background-color: #08aba6;
              color: #fff;
              float: left;
              transition: all 0.3s ease-in-out;
              cursor: pointer;
              &:hover{
                background-color: #fff;
                color: #08aba6;
              }
            }
          }
          .control{
            display: flex;
            justify-content: space-between;
            width: 400px;
          }
        }
        .line{
          height: 15px;
          background: #f2f2f5;
          margin: 10px -10px;
        }
        .right-content{
            font-family: "Open Sans", sans-serif;
            line-height: 1.25;
          table {
            border: 1px solid #ccc;
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
          }
          table tr {
            border: 1px solid #ddd;
            padding: .35em;
          }
          table tr:nth-child(even) {
            background: #f8f8f8;
          }
          table th,
          table td {
            padding: .625em;
            text-align: center;
          }
          table th {
            background: #08aba6;
            color: #fff;
            font-size: .85em;
            letter-spacing: .1em;
            text-transform: uppercase;
          }
          table td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .control{
            width: 100%;
            display: flex;
            justify-content: space-around;
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
  }
  .user,.movie,.filmReview{
    position: fixed;
    height: 100%;
    width: 100%;
    top: -100px;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    .content{
      position: relative;
      background-color: #fff;
      width: 800px;
      height: 500px;
      border: 1px solid #08aba6;
      border-radius: 6px;
      padding: 10px 20px;
      overflow-y: scroll;
      .body-main-item{
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        .left{
          width: 30%;
          padding: 15px 5px;
        }
        .right{
          width: 70%;
          padding: 15px 0px;
          display: flex;
          align-items: center;
          input[type='file']{
            display: none;
          }
          label{
            cursor: pointer;
            display: inline-block;
            font-size: 16px;
            font-weight: normal;
          }
          input[type='text'],input[type='number']{
            width: 80%;
            outline: none;
            border: none;
            font-size: 18px;
            overflow: visible;
            &::placeholder{
              color: #dcdcdc;
            }
          }
          textarea{
            width: 80%;
            &::placeholder{
              color: #dcdcdc;
            }
          }
          input[type='radio']{
            display: none;
          }
          .label-sex{
            margin-right: 15px;
            line-height: 1;
          }
          .radioInput{
            background-color:#fff;
            border:1px solid rgba(0,0,0,0.15);
            border-radius:100%;
            display:inline-block;
            height:16px;
            margin-right:15px;
            margin-top:-1px;
            vertical-align:middle;
            width:16px;
            line-height:1;
            padding: 2px;
          }
          input[type='radio']:checked + .radioInput{
            background-color:#08aba6;
            background-clip: content-box;
          }
        }
      }
      .body-main-bottom{
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
      }
      .button{
        height: 40px;
        width: 140px;
        background-color: #08aba6;
        color: white;
        text-align: center;
        line-height: 40px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        border: 1px solid #08aba6;
      }
      .button:hover{
        background-color: #fff;
        color: #08aba6;
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
