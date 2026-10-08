/**
 * The footer is on every page: the social links, the Patreon link, and the
 * legal links. A wrong address or a missing "opens in a new tab" safety
 * attribute here is shipped to every visitor.
 */

import { mount, flushPromises } from '@vue/test-utils'
import { installI18n } from './helpers'
import router from '@/routes'
import AppFooter from '@/components/AppFooter.vue'

async function mountFooter() {
  const i18n = installI18n('en')
  await router.push('/en')
  await router.isReady()
  const wrapper = mount(AppFooter, { global: { plugins: [i18n, router] } })
  await flushPromises()
  return wrapper
}

const SOCIAL = {
  GitHub: 'https://github.com/BeamMP',
  Discord: 'https://discord.gg/beammp',
  YouTube: 'https://www.youtube.com/@beammpofficial',
  X: 'https://x.com/beammpofficial',
  Reddit: 'https://www.reddit.com/r/BeamMP',
  Bluesky: 'https://bsky.app/profile/beammp.com',
  Twitch: 'https://www.twitch.tv/beammpofficial',
  Instagram: 'https://www.instagram.com/beammpofficial',
  TikTok: 'https://www.tiktok.com/@beammpofficial',
  Facebook: 'https://www.facebook.com/BeamMPTeam',
}

test('shows each social link, in order, with the right address', async () => {
  const wrapper = await mountFooter()
  const links = wrapper.findAll('a[aria-label]')
  expect(links.map((a) => a.attributes('aria-label'))).toEqual(Object.keys(SOCIAL))
  for (const a of links) {
    expect(a.attributes('href'), a.attributes('aria-label')).toBe(
      SOCIAL[a.attributes('aria-label')]
    )
  }
})

test('Twitch and Bluesky are both there, side by side', async () => {
  const wrapper = await mountFooter()
  const labels = wrapper.findAll('a[aria-label]').map((a) => a.attributes('aria-label'))
  expect(labels.indexOf('Twitch')).toBe(labels.indexOf('Bluesky') + 1)
})

test('every link that leaves the site opens in a new tab without handing over the opener', async () => {
  const wrapper = await mountFooter()
  const external = wrapper
    .findAll('a')
    .filter((a) => /^https?:\/\//.test(a.attributes('href') || ''))
  expect(external.length).toBeGreaterThanOrEqual(Object.keys(SOCIAL).length + 3)
  for (const a of external) {
    expect(a.attributes('target'), a.attributes('href')).toBe('_blank')
    expect(a.attributes('rel'), a.attributes('href')).toContain('noopener')
  }
})

test('every social icon is a labelled link with a drawn icon', async () => {
  const wrapper = await mountFooter()
  for (const a of wrapper.findAll('a[aria-label]')) {
    expect(a.find('svg').exists(), a.attributes('aria-label')).toBe(true)
  }
})

test('has the Patreon link and the legal links, and this year in the copyright', async () => {
  const wrapper = await mountFooter()
  const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))
  expect(hrefs).toContain('https://www.patreon.com/BeamMP')
  expect(hrefs).toContain('https://beammp.com/privacy')
  expect(hrefs).toContain('https://beammp.com/terms')
  expect(hrefs).toContain('/en/about')
  expect(wrapper.text()).toContain(`2019 - ${new Date().getFullYear()}`)
})

test('the About link follows the language', async () => {
  const i18n = installI18n('en')
  await router.push('/de')
  const wrapper = mount(AppFooter, { global: { plugins: [i18n, router] } })
  await flushPromises()
  expect(wrapper.findAll('a').map((a) => a.attributes('href'))).toContain('/de/about')
})
