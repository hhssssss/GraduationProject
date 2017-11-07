// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(Vuex);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    userId:'',
    userPwd:''
  },
  mutations:{
    updateUserInfo(state,content){
      state.userId = content.id;
      state.userPwd = content.pwd;
    }
  }
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
