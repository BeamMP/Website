/**
 * Get the current locale from localStorage or window.i18n
 * @returns {string} The current locale code
 */
export function getCurrentLocale() {
  if (window.i18n) {
    const locale = window.i18n.global.locale
    return locale.value || locale
  }
  return localStorage.getItem('lang') || 'en'
}

/**
 * Generate a localized route path
 * @param {string} route - The route name or path (without leading slash)
 * @param {string} locale - Optional locale override
 * @returns {string} The full path including locale
 */
export function getLocalizedPath(route, locale = null) {
  const currentLocale = locale || getCurrentLocale()
  const path = route.startsWith('/') ? route.slice(1) : route
  return `/${currentLocale}/${path}`.replace(/\/+/g, '/')
}

/**
 * Create a redirect to the current route in a different locale
 * @param {string} newLocale - The new locale to switch to
 * @param {string} currentPath - The current route path (can include locale and query params)
 * @returns {string} The new path with the different locale
 */
export function switchLocale(newLocale, currentPath) {
  // Split path from query string
  const [pathOnly] = currentPath.split('?')
  
  // Remove locale from the beginning: /en/servers -> /servers, /en/ -> /
  const pathWithoutLocale = pathOnly.replace(/^\/[a-z]{2}(?:\/|$)/, '/')
  
  // Remove trailing slashes and ensure we have the right format
  const cleanPath = pathWithoutLocale.replace(/\/+/g, '/').replace(/\/$/, '') || ''
  
  return `/${newLocale}${cleanPath}`.replace(/\/+/g, '/')
}
