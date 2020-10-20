import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/toRaw',
    name: 'toRaw',
    component: () => import(/* webpackChunkName: "about" */ '../views/toRaw.vue')
  },
  {
    path: '/shallowReactive_shallowRef',
    name: 'shallowReactive_shallowRef',
    component: () => import(/* webpackChunkName: "about" */ '../views/shallowReactive_shallowRef.vue')
  },
  {
    path: '/markRaw',
    name: 'markRaw',
    component: () => import(/* webpackChunkName: "about" */ '../views/markRaw.vue')
  },
  {
    path: '/toRef',
    name: 'toRef',
    component: () => import(/* webpackChunkName: "about" */ '../views/toRef.vue')
  },
  {
    path: '/customRef',
    name: 'customRef',
    component: () => import(/* webpackChunkName: "about" */ '../views/customRef.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
