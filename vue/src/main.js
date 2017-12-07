// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import imgUrl from './assets/user.png'
Vue.use(Vuex);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    userName:'',
    userId:'',
    userPwd:'',
    userProfilePicture:'',
  },
  mutations:{
    getUserInfo(state,content){
      state.userName = content.name
      state.userId = content.id;
      state.userPwd = content.pwd;
      state.userProfilePicture = !content.pic?imgUrl:'data:image/png;base64,'+content.pic;
    },
    updateUserInfo1(state,content){
      state.userName = content.name
      state.userProfilePicture = content.pic;
    },
    loginOut(state){
      state.userName = '';
      state.userId = '';
      state.userPwd = '';
      state.userProfilePicture = '';
    }
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
