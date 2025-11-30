import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home - BeamMP',
      description: 'Welcome to BeamMP',
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About - BeamMP',
      description: 'Learn more about BeamMP',
      requiresAuth: false,
    },
  },
  /*{
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact - BeamMP',
      description: 'Get in touch with us',
      requiresAuth: false
    }
  },*/
  {
    path: '/communities',
    name: 'Communities',
    component: () => import('@/views/Communities.vue'),
    meta: {
      title: 'Communities - BeamMP',
      description: 'Discover thriving BeamMP communities and find your group',
      requiresAuth: false,
    },
  },
  {
    path: '/servers',
    name: 'Servers',
    component: () => import('@/views/Servers.vue'),
    meta: {
      title: 'Servers - BeamMP',
      description: 'Browse active BeamMP servers',
      requiresAuth: false,
    },
  },
  {
    path: '/stats',
    name: 'Statistics',
    component: () => import('@/views/Statistics.vue'),
    meta: {
      title: 'Statistics - BeamMP',
      description: 'View BeamMP network statistics',
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found - BeamMP',
      description: 'The page you are looking for does not exist',
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard for meta data
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'BeamMP'

  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || '')
  }

  next()
})

export default router
