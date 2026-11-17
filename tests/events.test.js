import { describe, expect, test } from 'vitest'
import { bannerSrc, formatLap } from '@/views/events/helpers'

describe('event helpers', () => {
  test('banner address is built on the main API from the event id and version', () => {
    const version = 'a'.repeat(32)
    expect(bannerSrc({ id: 'hirochi', bannerVersion: version }, 'card')).toMatch(
      new RegExp(`/v1/event-banners/hirochi/${version}/card$`)
    )
    expect(bannerSrc({ id: 'a/b', bannerVersion: 'v 1' }, 'hero')).toMatch(/\/a%2Fb\/v%201\/hero$/)
  })
  test('an event without a banner has no address', () => {
    expect(bannerSrc({ id: 'x', bannerVersion: null }, 'card')).toBeNull()
    expect(bannerSrc({ id: 'x' }, 'hero')).toBeNull()
    expect(bannerSrc(undefined, 'hero')).toBeNull()
  })
  test('lap times are shown as m:ss.mmm', () => {
    expect(formatLap(80.122)).toBe('1:20.122')
    expect(formatLap(59.9996)).toBe('1:00.000')
  })
})
