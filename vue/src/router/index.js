import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../views/Hello.vue'
import Main from '../views/Main.vue'
import UserSettings from '../views/UserSettings'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/user/settings',
      name: 'UserSettings',
      component: UserSettings
    }
  ]
})
