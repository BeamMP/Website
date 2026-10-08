/**
 * Every address on the site starts with the language: /de/servers. The router
 * adds one when it is missing, remembers the one in use, switches the page's
 * language and sets the title. The real router and its guard run here.
 */

import { installI18n, withRedirectLimit } from './helpers'
import router from '@/routes'

// Pushing the address the router is already on does nothing (and so skips the
// guard), so every test starts from the same neutral page.
beforeEach(async () => {
  installI18n('en')
  await router.push('/en/privacy')
  localStorage.clear()
  installI18n('en')
  document.title = ''
})

describe('addresses without a language', () => {
  test('the home address goes to the language you used last, or English', async () => {
    await router.push('/')
    expect(router.currentRoute.value.fullPath).toBe('/en')
    expect(router.currentRoute.value.name).toBe('Home')

    localStorage.setItem('lang', 'fr')
    await router.push('/')
    expect(router.currentRoute.value.fullPath).toBe('/fr')
  })

  test('a page address gets the language put in front of it', async () => {
    await router.push('/servers')
    expect(router.currentRoute.value.fullPath).toBe('/en/servers')
    expect(router.currentRoute.value.name).toBe('Servers')

    localStorage.setItem('lang', 'de')
    await router.push('/about')
    expect(router.currentRoute.value.fullPath).toBe('/de/about')
  })
})

describe('opening a page in a language', () => {
  test('sets the page language, remembers it, and sets the title', async () => {
    await router.push('/de/about')
    expect(router.currentRoute.value.name).toBe('About')
    expect(document.documentElement.getAttribute('lang')).toBe('de')
    expect(localStorage.getItem('lang')).toBe('de')
    expect(document.title).toBe('About - BeamMP')
  })

  test('loads a language the first time it is used', async () => {
    expect(window.i18n.global.availableLocales).toEqual(['en'])
    await router.push('/ru/about')
    expect(window.i18n.global.availableLocales).toContain('ru')
  })

  test('every language in the picker opens', async () => {
    for (const code of ['en', 'es', 'fr', 'de', 'it', 'ru', 'zh']) {
      await router.push(`/${code}/partners`)
      expect(router.currentRoute.value.fullPath).toBe(`/${code}/partners`)
      expect(document.documentElement.getAttribute('lang')).toBe(code)
    }
  })
})

describe('the pages', () => {
  const pages = ['', 'about', 'communities', 'servers', 'stats', 'partners', 'privacy', 'terms']

  test.each(pages)('/en/%s opens its page', async (page) => {
    await router.push(`/en/${page}`)
    expect(router.currentRoute.value.matched.length).toBeGreaterThan(0)
    expect(router.currentRoute.value.name).not.toBe('NotFound')
  })

  test('every page has its own title and description for search engines and tabs', () => {
    const named = router.getRoutes().filter((r) => r.name && r.name !== 'NotFound')
    expect(named.length).toBeGreaterThanOrEqual(pages.length)
    for (const route of named) {
      expect(route.meta.title, `${String(route.name)} title`).toMatch(/ - BeamMP$/)
      expect(route.meta.description, `${String(route.name)} description`).toBeTruthy()
    }
    const titles = named.map((r) => r.meta.title)
    expect(new Set(titles).size).toBe(titles.length)
  })
})

// This used to never finish: the not-found route matches anything, so it has
// no `locale` param even for /en/nope. The guard took that to mean "no
// language", redirected to /en/en/nope, which also has none, and so on - the
// page froze instead of showing the not-found page. withRedirectLimit stops a
// runaway redirect so a regression fails the test instead of hanging it.
describe('an address the site does not have', () => {
  const openWithRedirectLimit = (address) => withRedirectLimit(() => router.push(address))

  test.each([
    ['/en/does-not-exist', '/en/does-not-exist'],
    ['/de/does-not-exist', '/de/does-not-exist'],
    ['/en/servers/nope/deeper', '/en/servers/nope/deeper'],
  ])('%s shows the not-found page where it is', async (address, expected) => {
    await openWithRedirectLimit(address)
    expect(router.currentRoute.value.name).toBe('NotFound')
    expect(router.currentRoute.value.fullPath).toBe(expected)
  })

  test('one with no language gets the language you last used, then the not-found page', async () => {
    await openWithRedirectLimit('/does-not-exist')
    expect(router.currentRoute.value.fullPath).toBe('/en/does-not-exist')
    expect(router.currentRoute.value.name).toBe('NotFound')

    localStorage.setItem('lang', 'fr')
    await openWithRedirectLimit('/also-missing')
    expect(router.currentRoute.value.fullPath).toBe('/fr/also-missing')
    expect(router.currentRoute.value.name).toBe('NotFound')
  })

  test('a language the site does not have is treated as part of the missing address', async () => {
    await openWithRedirectLimit('/xx/about')
    expect(router.currentRoute.value.fullPath).toBe('/en/xx/about')
    expect(router.currentRoute.value.name).toBe('NotFound')
  })

  test('the not-found page is shown in the language of the address', async () => {
    await openWithRedirectLimit('/de/does-not-exist')
    expect(document.documentElement.getAttribute('lang')).toBe('de')
    expect(localStorage.getItem('lang')).toBe('de')
  })
})
