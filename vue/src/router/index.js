import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import UserSettings from '../views/UserSettings'
import FilmReview from '../views/FilmReview'
import AddFilmReview from '../views/AddFilmReview'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/user/settings',
      name: 'UserSettings',
      component: UserSettings,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/filmReview',
      name: 'FilmReview',
      component: FilmReview,
    },
    {
      path: '/film/addReview',
      name: 'AddFilmReview',
      component: AddFilmReview,
      meta: {
        requireAuth: true,
      },
    },
  ]
})
