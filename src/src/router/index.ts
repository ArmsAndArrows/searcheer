import { createRouter, createWebHistory } from 'vue-router'

//@ts-ignore
import SearcheerView from '@/views/SearcheerView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearcheerView
    },
    {
      path: '/code',
      name: 'code',
      component: SearcheerView
    },
    {
      path: '/puny',
      name: 'puny',
      component: SearcheerView
    },
    {
      path: '/links',
      name: 'links',
      component: SearcheerView
    }
  ]
})

export default router
