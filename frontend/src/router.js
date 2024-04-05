import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/stats',
      component: () => import('@/views/Stats.vue'),
    },
    {
      path: '/servers',
      component: () => import('@/views/Servers.vue'),
    },
    {
      path: '/hosting',
      component: () => import('@/views/Hosting.vue'),
    },
    {
      path: '/rules',
      component: () => import('@/views/Rules.vue'),
    },
    {
      path: '/privacy',
      component: () => import('@/views/Privacy.vue'),
    },
    {
      path: '/terms',
      component: () => import('@/views/Terms.vue'),
    },
  ],
})
