import { createApp } from 'vue'
//import { createI18n } from 'vue-i18n'
import { setupI18n } from './i18n'
import App from './App.vue'
import './style.css'

//const i18n = createI18n({
const initialLocale = localStorage.getItem('lang') || 'en'
const i18n = setupI18n({
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    en: await import('./locales/en.json'),
    //fr: () => import('./locales/fr.json'),
    //es: () => import('./locales/es.json'),
  },
})

window.i18n = i18n
window.locale = i18n.global.locale

import router from './routes'

createApp(App)
  .use(i18n)
  .use(router)
  .mount('#app')
