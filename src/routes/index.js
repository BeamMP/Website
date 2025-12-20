import { loadLocaleMessages, setI18nLanguage, SUPPORT_LOCALES } from '@/i18n'
import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import { RouterView } from 'vue-router'

// Base routes without locale prefix
const baseRoutes = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home - BeamMP',
      description: 'Welcome to BeamMP',
      requiresAuth: false,
    },
  },
  {
    path: 'about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About - BeamMP',
      description: 'Learn more about BeamMP',
      requiresAuth: false,
    },
  },
  {
    path: 'communities',
    name: 'Communities',
    component: () => import('@/views/Communities.vue'),
    meta: {
      title: 'Communities - BeamMP',
      description: 'Discover thriving BeamMP communities and find your group',
      requiresAuth: false,
    },
  },
  {
    path: 'servers',
    name: 'Servers',
    component: () => import('@/views/Servers.vue'),
    meta: {
      title: 'Servers - BeamMP',
      description: 'Browse active BeamMP servers',
      requiresAuth: false,
    },
  },
  {
    path: 'stats',
    name: 'Statistics',
    component: () => import('@/views/Statistics.vue'),
    meta: {
      title: 'Statistics - BeamMP',
      description: 'View BeamMP network statistics',
      requiresAuth: false,
    },
  },
]

const routes = [
  {
    path: `/:locale(${SUPPORT_LOCALES.join('|')})`,
    component: RouterView,
    beforeEnter: (to) => {
      console.log('Entering locale route:', to.params.locale)
      // Validate locale
      if (!SUPPORT_LOCALES.includes(to.params.locale)) {
        return false
      }
    },
    children: baseRoutes,
  },
  {
    path: '/',
    redirect: () => {
      const locale = localStorage.getItem('lang') || 'en'
      return `/${locale}`
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

// Global navigation guard for meta data and locale
router.beforeEach(async (to, from, next) => {
  const paramsLocale = to.params.locale || 'en'
  const i18n = window.i18n

  // Ensure i18n is available
  if (!i18n) {
    next()
    return
  }

  // load locale messages
  if (!i18n.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(i18n, paramsLocale)
  }

  // set i18n language
  setI18nLanguage(i18n, paramsLocale)

  // Store current locale in localStorage
  localStorage.setItem('lang', paramsLocale)

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
