import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { flushPromises, mount } from '@vue/test-utils'
import { setupI18n } from '@/i18n'
import en from '@/locales/en.json'
import router from '@/routes'
import App from '@/App.vue'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const publicFile = (name) => fs.readFileSync(path.join(root, 'public', name), 'utf8')

// The same i18n the app builds in main.js, with English loaded. The router's
// guard reads window.i18n to switch language, so it is set here too.
export function installI18n(locale = 'en') {
  const i18n = setupI18n({ legacy: false, locale, fallbackLocale: 'en', messages: { en } })
  window.i18n = i18n
  return i18n
}

const reply = (body, ok = true, status = ok ? 200 : 503) => ({
  ok,
  status,
  json: async () => (typeof body === 'string' ? JSON.parse(body) : body),
  text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
})

/**
 * Stands in for fetch. Local files come from the repo's public folder; the
 * backend feeds can be given as data, or left to answer 503 ("backend down").
 * Nothing reaches the network, and a URL nobody planned for fails the test.
 */
export function stubFetch({ servers, metrics } = {}) {
  const calls = []
  const stub = async (url) => {
    const address = String(url)
    calls.push(address)
    if (
      address.startsWith('/docs/') ||
      address === '/partners.json' ||
      address === '/servers.json'
    ) {
      return reply(publicFile(address.slice(1)))
    }
    if (address === 'https://backend.beammp.com/servers-info')
      return servers ? reply(servers) : reply('', false)
    if (address === 'https://api.beammp.com/metrics')
      return metrics ? reply(metrics) : reply('', false)
    // The statistics page's release and stats feeds: down unless a test says otherwise.
    if (
      /^https:\/\/(api|backend)\.beammp\.com\//.test(address) ||
      address.startsWith('https://api.github.com/')
    )
      return reply('', false)
    throw new Error(`Unplanned fetch to ${address}`)
  }
  stub.calls = calls
  vi.stubGlobal('fetch', stub)
  return stub
}

/**
 * Runs `action` (a navigation) and fails it if the router's language guard
 * keeps redirecting. A runaway redirect would otherwise freeze the test run
 * the way it freezes the page. The guard reads the saved language on every
 * redirect, which is what is counted.
 */
export async function withRedirectLimit(action, limit = 5) {
  const real = localStorage.getItem.bind(localStorage)
  let passes = 0
  localStorage.getItem = (key) => {
    if (key === 'lang' && ++passes > limit) throw new Error('still redirecting')
    return real(key)
  }
  try {
    return await action()
  } finally {
    localStorage.getItem = real
  }
}

/** Opens a page of the real app (router, layout, nav and footer) and lets it finish loading. */
export async function openPage(pathname) {
  const i18n = installI18n('en')
  await withRedirectLimit(() => router.push(pathname))
  await router.isReady()
  const wrapper = mount(App, { attachTo: document.body, global: { plugins: [i18n, router] } })
  await flushPromises()
  return wrapper
}
