import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../views/Hello.vue'
import ShowMongodbData from '../views/main.vue'

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
      name: 'showData',
      component: ShowMongodbData
    }
  ]
})
