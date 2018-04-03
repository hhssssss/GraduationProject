import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import UserSettings from '../views/UserSettings'
import FilmReview from '../views/FilmReview'
import OneFilmReview from '../views/OneFilmReview'
import OneMovie from '../views/OneMovie'
import AddFilmReview from '../views/AddFilmReview'
import MyFilmReview from '../views/MyFilmReview'
import MyFilmCollection from '../views/MyFilmCollection'
import MyFilmReviewCollection from '../views/MyFilmReviewCollection'

Vue.use(Router);

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
      path: '/film/oneFilmReview/:filmReview_id',
      name: 'OneFilmReview',
      component: OneFilmReview,
      props: true,
    },
    {
      path: '/film/oneMovie/:film_id',
      name: 'OneMovie',
      component: OneMovie,
      props: true,
    },
    {
      path: '/film/addReview',
      name: 'AddFilmReview',
      component: AddFilmReview,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/film/myFilmReview',
      name: 'MyFilmReview',
      component: MyFilmReview,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/film/myFilmReviewCollection',
      name: 'MyFilmReviewCollection',
      component: MyFilmReviewCollection,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/film/myFilmCollection',
      name: 'MyFilmCollection',
      component: MyFilmCollection,
      meta: {
        requireAuth: true,
      },
    },
  ]
})
