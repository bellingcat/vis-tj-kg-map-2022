// Composables
import { createRouter, createWebHistory } from 'vue-router'

let children = [
  {
    path: '',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  }
];
if (process.env.APP_ENV == "ghpages") {
  console.log("GH_PAGES DEPLOYMENT DETECTED")
  children.push(
    {
      path: '/vis-tj-kg-map-2022/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
  )
}
console.log(`in index: ${process.env.APP_ENV}`)
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
