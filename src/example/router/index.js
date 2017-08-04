import Vue from 'vue'
import Router from 'vue-router'
import example from '../example.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'example',
      component: example
    }
  ]
})
