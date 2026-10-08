/**
 * The helpers that build and switch the /<language>/... paths. Every link on
 * the site goes through these, so a slip here breaks navigation everywhere.
 */

import { getCurrentLocale, getLocalizedPath, switchLocale } from '@/utils/locale'

afterEach(() => {
  delete window.i18n
})

describe('getLocalizedPath', () => {
  test('puts the language first, with or without a leading slash on the page', () => {
    expect(getLocalizedPath('servers', 'de')).toBe('/de/servers')
    expect(getLocalizedPath('/servers', 'de')).toBe('/de/servers')
  })

  test('never doubles a slash', () => {
    expect(getLocalizedPath('//servers', 'fr')).toBe('/fr/servers')
    expect(getLocalizedPath('', 'fr')).toBe('/fr/')
  })

  test('uses the saved language when none is given, and English if nothing is saved', () => {
    expect(getLocalizedPath('about')).toBe('/en/about')
    localStorage.setItem('lang', 'it')
    expect(getLocalizedPath('about')).toBe('/it/about')
  })

  test('the language the app is showing wins over the saved one', () => {
    localStorage.setItem('lang', 'it')
    window.i18n = { global: { locale: { value: 'ru' } } }
    expect(getLocalizedPath('about')).toBe('/ru/about')
  })
})

describe('getCurrentLocale', () => {
  test('reads a plain string locale as well as a ref', () => {
    window.i18n = { global: { locale: 'es' } }
    expect(getCurrentLocale()).toBe('es')
    window.i18n = { global: { locale: { value: 'zh' } } }
    expect(getCurrentLocale()).toBe('zh')
  })
})

describe('switchLocale', () => {
  test('swaps the language and keeps the page', () => {
    expect(switchLocale('de', '/en/servers')).toBe('/de/servers')
    expect(switchLocale('fr', '/ru/about')).toBe('/fr/about')
  })

  test('keeps deeper paths', () => {
    expect(switchLocale('de', '/en/docs/getting-started')).toBe('/de/docs/getting-started')
  })

  test('the home page of one language is the home page of the next', () => {
    expect(switchLocale('es', '/en')).toBe('/es')
    expect(switchLocale('es', '/en/')).toBe('/es')
  })

  test('drops the old query string rather than carrying it across', () => {
    expect(switchLocale('de', '/en/servers?search=drift')).toBe('/de/servers')
  })

  test('adds a language to a path that has none', () => {
    expect(switchLocale('de', '/servers')).toBe('/de/servers')
  })
})
