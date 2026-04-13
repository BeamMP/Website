import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'es', 'fr', 'de', 'it', 'ru', 'zh']

export const LANGUAGES = {
  en: { name: 'English', code: 'en', flag: 'gb' },
  es: { name: 'Español', code: 'es', flag: 'es' },
  fr: { name: 'Français', code: 'fr', flag: 'fr' },
  de: { name: 'Deutsch', code: 'de', flag: 'de' },
  it: { name: 'Italiano', code: 'it', flag: 'it' },
  ru: { name: 'Русский', code: 'ru', flag: 'ru' },
  zh: { name: '中文', code: 'zh', flag: 'cn' },
}

export function setupI18n(options = { locale: 'en' }) {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale)
  return i18n
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  )

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}
