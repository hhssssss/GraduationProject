// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
var Velocity = require("../node_modules/velocity-animate/velocity");
require("../node_modules/velocity-animate/velocity.ui.js");
Vue.use(Vuex);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    userName : '',
    userId : '',
    userPwd : '',
    userProfilePicture : '',
    _id : '',
    collections : [],
    filmReviewCollections : [],
    signIn : [],
    coins : 0,
    admin : false,
  },
  mutations:{
    getUserInfo(state,content){
      state.userName = content.name
      state.userId = content.id;
      state.userPwd = content.pwd;
      state.userProfilePicture = content.pic;
      state._id = content._id;
      state.collections = content.collections;
      state.filmReviewCollections = content.filmReviewCollections;
      state.signIn = content.signIn;
      state.coins = content.coins;
      state.admin = content.admin;
    },
    updateUserInfo1(state,content){
      state.userName = content.name;
      state.userProfilePicture = content.pic;
    },
    loginOut(state){
      state.userName = '';
      state.userId = '';
      state.userPwd = '';
      state.userProfilePicture = '';
      state._id = '';
      state.collections = [];
      state.filmReviewCollections = [];
      state.signIn = [];
      state.coins = 0;
      state.admin = false;
    },
    pushCollections(state,id){
      state.collections.push(id);
      console.log("收藏成功");
    },
    pullCollections(state,index){
      state.collections.splice(index,1);
      console.log("取消收藏");
    },
    pushFilmReviewCollections(state,id){
      state.filmReviewCollections.push(id);
      console.log("收藏成功");
    },
    pullFilmReviewCollections(state,index){
      state.filmReviewCollections.splice(index,1);
      console.log("取消收藏");
    },
    pushSignIn(state,id){
      state.signIn.push(id);
      state.coins += 3;
    },
    reward(state){
      state.coins -= 1;
      console.log("投币成功");
    },
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.userId) {
      next();
    }
    else {
      next({
        path: '/',
      })
    }
  }
  else {
    next();
  }
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
