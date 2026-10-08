/**
 * Opens each page of the real app (router, navigation, page, footer) with
 * fetch stubbed, the way a visitor gets it. A page that throws while loading,
 * logs a Vue warning, or goes blank when the backend is down shows up here.
 * The checks are about what a page says, not how it looks.
 */

import { openPage, publicFile, stubFetch } from './helpers'

const PAGES = [
  ['home', '/en'],
  ['about', '/en/about'],
  ['communities', '/en/communities'],
  ['servers', '/en/servers'],
  ['statistics', '/en/stats'],
  ['partners', '/en/partners'],
  ['privacy', '/en/privacy'],
  ['terms', '/en/terms'],
]

let wrapper
let warnings

beforeEach(() => {
  warnings = []
  vi.spyOn(console, 'warn').mockImplementation((...args) => warnings.push(args.join(' ')))
  vi.spyOn(console, 'error').mockImplementation((...args) => warnings.push(args.join(' ')))
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
  document.body.innerHTML = ''
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe.each(PAGES)('the %s page', (_name, address) => {
  test('opens with the navigation and footer around it, and no Vue warnings', async () => {
    stubFetch()
    wrapper = await openPage(address)
    expect(wrapper.find('nav, header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.find('main').text().length).toBeGreaterThan(0)
    expect(warnings.filter((w) => w.includes('[Vue warn]'))).toEqual([])
  })

  test('still opens, and says something, when the backend is down', async () => {
    stubFetch()
    wrapper = await openPage(address)
    expect(wrapper.find('main').text().trim()).not.toBe('')
    expect(wrapper.find('footer').exists()).toBe(true)
  })
})

describe('home', () => {
  test('shows the live numbers from the metrics feed', async () => {
    stubFetch({
      metrics: 'beammp_players_online 2783\nbeammp_public_servers 2959\nbeammp_all_servers 4663\n',
    })
    wrapper = await openPage('/en')
    const text = wrapper.text()
    expect(text).toContain('2783')
    expect(text).toContain('2959')
    expect(text).toContain('4663')
  })

  test('shows N/A rather than a broken number when the metrics are down', async () => {
    vi.stubGlobal('fetch', async () => {
      throw new Error('network down')
    })
    wrapper = await openPage('/en')
    expect(wrapper.text()).toContain('N/A')
    expect(wrapper.text()).not.toContain('undefined')
  })
})

describe('the docs links on the home page', () => {
  test('point at the docs in the language of the page', async () => {
    stubFetch()
    wrapper = await openPage('/en')
    const english = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(english).toContain('https://docs.beammp.com/')
    expect(english).toContain('https://docs.beammp.com/scripting/mod-reference/')
    wrapper.unmount()

    wrapper = await openPage('/de')
    const german = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(german).toContain('https://docs.beammp.com/de/')
    expect(german).toContain('https://docs.beammp.com/de/scripting/mod-reference/')
  })
})

describe('servers', () => {
  const servers = JSON.parse(publicFile('servers.json')).slice(0, 25)

  test('lists the servers the backend returns', async () => {
    stubFetch({ servers })
    wrapper = await openPage('/en/servers')
    const text = wrapper.find('main').text()
    expect(text).toContain('MTRTR Christmas')
    expect(text).not.toContain('Failed to load servers')
  })

  // A server's name is set by whoever hosts it and is shown as HTML so the
  // colour codes can apply, so the page escapes it itself. (The API also strips
  // every `<` at heartbeat, which is why the real feed has none: this is the
  // second layer, and it holds even if the first ever slips.)
  test('a server name with HTML in it is shown as text, not turned into page elements', async () => {
    const hostile = {
      ...servers[0],
      sname: '^1Evil <img src="x-probe" onerror="window.__pwned=1"> <b id="probe-b">bold</b>',
    }
    stubFetch({ servers: [hostile] })
    wrapper = await openPage('/en/servers')
    expect(document.querySelector('img[src="x-probe"]')).toBeNull()
    expect(document.querySelector('#probe-b')).toBeNull()
    expect(wrapper.find('main').text()).toContain('<b id="probe-b">bold</b>')
  })

  test('names with & and quotes still read as written, and keep their colours', async () => {
    const named = [
      { ...servers[0], ident: 'a1', sname: '^1C&B\'s ^2"Banger" League' },
      { ...servers[1], ident: 'a2', sname: 'Plain & simple' },
    ]
    stubFetch({ servers: named })
    wrapper = await openPage('/en/servers')
    const text = wrapper.find('main').text()
    expect(text).toContain('C&B\'s "Banger" League')
    expect(text).toContain('Plain & simple')
    expect(text).not.toContain('&amp;')
    // ^1 is dark blue: the colour codes are not shown, and the colour is applied
    expect(text).not.toContain('^1')
    expect(wrapper.find('.name-cell span[style*="color"]').exists()).toBe(true)
  })

  test('text that looks like an HTML entity is shown exactly as typed', async () => {
    stubFetch({
      servers: [{ ...servers[0], ident: 'a1', sname: 'Tags &lt;b&gt; and &amp; shown as typed' }],
    })
    wrapper = await openPage('/en/servers')
    expect(wrapper.find('main').text()).toContain('Tags &lt;b&gt; and &amp; shown as typed')
  })

  describe('searching', () => {
    const named = () => [
      {
        ...servers[0],
        ident: 'a1',
        sname: "^1C&B's ^2Banger League",
        sdesc: 'drift night',
        owner: 'zed',
        map: '/levels/west_coast_usa/info.json',
      },
      {
        ...servers[1],
        ident: 'a2',
        sname: '^4Quiet Valley',
        sdesc: 'relaxed driving',
        owner: 'amy',
        map: '/levels/italy/info.json',
      },
    ]
    const search = async (query) => {
      await wrapper.find('input.search-input').setValue(query)
      return wrapper.findAll('.name-cell').map((cell) => cell.text())
    }

    test('finds a name containing & or an apostrophe by what you type', async () => {
      stubFetch({ servers: named() })
      wrapper = await openPage('/en/servers')
      expect(await search("c&b's")).toEqual([expect.stringContaining("C&B's Banger League")])
      expect(await search('banger league')).toHaveLength(1)
    })

    test('does not match on the colour markup behind the name', async () => {
      stubFetch({ servers: named() })
      wrapper = await openPage('/en/servers')
      expect(await search('span')).toEqual([])
      expect(await search('color')).toEqual([])
    })

    test('still finds by description and owner', async () => {
      stubFetch({ servers: named() })
      wrapper = await openPage('/en/servers')
      expect(await search('relaxed')).toEqual([expect.stringContaining('Quiet Valley')])
      expect(await search('zed')).toEqual([expect.stringContaining("C&B's")])
    })
  })

  test('says so when the servers cannot be loaded', async () => {
    stubFetch()
    wrapper = await openPage('/en/servers')
    expect(wrapper.find('main').text()).toContain('Failed to load servers')
  })
})

describe('the policy pages', () => {
  test.each([
    ['privacy', '/en/privacy', 'docs/privacy_policy.md'],
    ['terms', '/en/terms', 'docs/terms.md'],
  ])('%s shows the text of its document', async (_name, address, file) => {
    stubFetch()
    wrapper = await openPage(address)
    const firstHeading = publicFile(file)
      .split('\n')
      .find((line) => /^#\s+\S/.test(line))
      .replace(/^#\s+/, '')
      .trim()
    expect(wrapper.find('main').text()).toContain(firstHeading)
  })
})

describe('partners', () => {
  test('shows each partner in the partners file', async () => {
    stubFetch()
    wrapper = await openPage('/en/partners')
    const partners = JSON.parse(publicFile('partners.json'))
    const list = Array.isArray(partners) ? partners : Object.values(partners).flat()
    expect(list.length).toBeGreaterThan(0)
    const names = list.map((p) => p.name).filter(Boolean)
    expect(names.length).toBeGreaterThan(0)
    for (const name of names) expect(wrapper.find('main').text(), name).toContain(name)
  })
})

describe('getting around', () => {
  // The Communities, Stats and forum entries sit in dropdown menus that only
  // draw their links once opened, so they are not on a freshly loaded page.
  test('the home page links to the main pages in the current language', async () => {
    stubFetch()
    wrapper = await openPage('/en')
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))
    for (const page of ['/en/', '/en/communities', '/en/partners', '/en/servers', '/en/about']) {
      expect(hrefs, page).toContain(page)
    }
  })

  test('the navigation bar links out to the docs, the store, GitHub and Patreon', async () => {
    stubFetch()
    wrapper = await openPage('/en')
    const hrefs = wrapper.findAll('nav a, header a').map((a) => a.attributes('href'))
    for (const url of [
      'https://docs.beammp.com',
      'https://store.beammp.com',
      'https://github.com/BeamMP/BeamMP',
      'https://www.patreon.com/BeamMP',
    ]) {
      expect(hrefs, url).toContain(url)
    }
  })

  test('the language is part of every internal link', async () => {
    stubFetch()
    wrapper = await openPage('/en')
    const internal = wrapper
      .findAll('a')
      .map((a) => a.attributes('href'))
      .filter((h) => h.startsWith('/') && !h.startsWith('/installer'))
    expect(internal.length).toBeGreaterThan(4)
    for (const href of internal) expect(href).toMatch(/^\/en(\/|$)/)
  })
})

describe('the not-found page', () => {
  test('opens at a missing address, with its message and a way back', async () => {
    stubFetch()
    wrapper = await openPage('/en/this-page-does-not-exist')
    expect(wrapper.find('main').text()).toContain('404')
    expect(wrapper.find('main a').exists()).toBe(true)
    expect(warnings.filter((w) => w.includes('[Vue warn]'))).toEqual([])
  })
})
