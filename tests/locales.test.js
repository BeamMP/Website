/**
 * The site is shown in seven languages from seven JSON files. Nothing else
 * notices when one of them falls behind, so this does: every language has
 * every English text, nothing is blank, translations keep the same {placeholders}
 * as English, and every text a page asks for exists.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LANGUAGES, SUPPORT_LOCALES } from '@/i18n'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const localesDir = path.join(root, 'src/locales')
const read = (code) => JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'))

function flatten(obj, prefix = '') {
  const out = {}
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value))
      Object.assign(out, flatten(value, full))
    else out[full] = value
  }
  return out
}

// Texts that are known to be untranslated, so the test can pass today and still
// catch anything new. Translate one and delete it from here: the "still
// missing" test below fails if an entry is left behind.
const KNOWN_UNTRANSLATED = {
  'message.nav.store': ['de', 'es', 'fr', 'it', 'ru'],
}

const english = flatten(read('en'))
const others = SUPPORT_LOCALES.filter((code) => code !== 'en')

describe('the language list', () => {
  test('every supported language has a file, and every file is a supported language', () => {
    const files = fs
      .readdirSync(localesDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''))
    expect(files.sort()).toEqual([...SUPPORT_LOCALES].sort())
  })

  test('every supported language has a name and a flag for the picker', () => {
    for (const code of SUPPORT_LOCALES) {
      expect(LANGUAGES[code]).toMatchObject({
        code,
        name: expect.any(String),
        flag: expect.any(String),
      })
    }
  })
})

describe.each(others)('%s translation', (code) => {
  const messages = flatten(read(code))
  const allowedMissing = (key) => (KNOWN_UNTRANSLATED[key] || []).includes(code)

  test('has every English text', () => {
    const missing = Object.keys(english).filter((key) => !(key in messages) && !allowedMissing(key))
    expect(missing).toEqual([])
  })

  test('has no text English does not have (a leftover or a typo in the name)', () => {
    expect(Object.keys(messages).filter((key) => !(key in english))).toEqual([])
  })

  test('has no blank texts', () => {
    const blank = Object.entries(messages).filter(
      ([, value]) => typeof value !== 'string' || !value.trim()
    )
    expect(blank.map(([key]) => key)).toEqual([])
  })

  test('keeps the same {placeholders} as English', () => {
    const placeholders = (text) => [...String(text).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
    const mismatched = Object.keys(messages)
      .filter((key) => key in english)
      .filter(
        (key) =>
          JSON.stringify(placeholders(messages[key])) !== JSON.stringify(placeholders(english[key]))
      )
    expect(mismatched).toEqual([])
  })
})

test('every entry in the known-untranslated list is still untranslated', () => {
  const stale = []
  for (const [key, codes] of Object.entries(KNOWN_UNTRANSLATED)) {
    if (!(key in english)) stale.push(`${key} (not in English)`)
    for (const code of codes)
      if (key in flatten(read(code))) stale.push(`${key} (${code} has it now)`)
  }
  expect(stale).toEqual([])
})

describe('texts the pages ask for', () => {
  const sourceFiles = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.(vue|js)$/.test(entry.name)) sourceFiles.push(full)
    }
  }
  walk(path.join(root, 'src'))

  const used = new Map()
  const dynamic = []
  for (const file of sourceFiles) {
    const source = fs.readFileSync(file, 'utf8')
    for (const m of source.matchAll(/(?<![\w.])\$?(?:t|te|tm|rt)\(\s*(['"`])([^'"`]+)\1/g)) {
      if (m[2].includes('${')) dynamic.push(`${path.relative(root, file)}: ${m[2]}`)
      else used.set(m[2], path.relative(root, file))
    }
  }

  test('finds the texts the pages use (the scan itself works)', () => {
    expect(used.size).toBeGreaterThan(50)
  })

  test('every text a page asks for exists in English', () => {
    const missing = [...used].filter(
      ([key]) => !(key in english) && !Object.keys(english).some((k) => k.startsWith(`${key}.`))
    )
    expect(missing.map(([key, file]) => `${key} (${file})`)).toEqual([])
  })

  test('no page builds a text name on the fly, which this check could not see', () => {
    expect(dynamic).toEqual([])
  })
})
