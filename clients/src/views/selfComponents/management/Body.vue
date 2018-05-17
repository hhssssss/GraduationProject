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
                  <div class="button">添加{{addTypes[selectedIndex]}}</div>
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
                      <div class="button">修改</div>
                      <div class="button">删除</div>
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
