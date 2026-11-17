import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { API_BASE } from '@/lib/config'

/** Seconds to m:ss.mmm, as shown on the boards. */
export function formatLap(value) {
  const ms = Math.round(value * 1000)
  return `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}.${String(ms % 1000).padStart(3, '0')}`
}

export function formatWhen(value) {
  return value
    ? new Date(value)
        .toISOString()
        .replace('T', ' ')
        .replace(/\.\d+Z$/, ' UTC')
    : null
}

/**
 * Polls one public events path and keeps the last good result on screen if a refresh fails.
 * The path (/v1/events/...) is served by the main API at API_BASE, which holds the read key, so no key
 * ever reaches the browser.
 */
export function useEventsFeed(pathGetter, { intervalMs = 2000 } = {}) {
  const data = ref(null)
  const error = ref('')
  const connected = ref(false)
  let timer
  let controller
  let generation = 0
  let stopped = false

  async function refresh() {
    const token = ++generation
    controller?.abort()
    const mine = new window.AbortController()
    controller = mine
    const timeout = window.setTimeout(() => mine.abort(), 7000)
    try {
      const res = await fetch(`${API_BASE}${pathGetter()}`, {
        cache: 'no-store',
        signal: mine.signal,
      })
      if (!res.ok) {
        throw new Error(
          res.status === 404 ? 'notFound' : res.status === 429 ? 'rateLimited' : 'unavailable'
        )
      }
      const json = await res.json()
      if (token !== generation || stopped) return
      data.value = json
      error.value = ''
      connected.value = true
    } catch (failure) {
      if (token !== generation || stopped) return
      connected.value = false
      error.value = failure.name === 'AbortError' ? 'timeout' : failure.message
    } finally {
      window.clearTimeout(timeout)
      if (token === generation && !stopped) timer = window.setTimeout(refresh, intervalMs)
    }
  }

  function restart() {
    window.clearTimeout(timer)
    data.value = null
    refresh()
  }

  onMounted(refresh)
  onBeforeUnmount(() => {
    stopped = true
    window.clearTimeout(timer)
    controller?.abort()
  })
  return { data, error, connected, restart }
}

/** Translated status and error text. The keys are written out so the locale check can see them. */
export function useEventText() {
  const { t } = useI18n()
  const status = (value) =>
    ({
      qualifying: t('message.events.status.qualifying'),
      live: t('message.events.status.live'),
      upcoming: t('message.events.status.upcoming'),
      finished: t('message.events.status.finished'),
    })[value] ?? value
  const errorText = (code) =>
    ({
      notFound: t('message.events.errors.notFound'),
      rateLimited: t('message.events.errors.rateLimited'),
      timeout: t('message.events.errors.timeout'),
    })[code] ?? t('message.events.errors.unavailable')
  return { status, errorText }
}

/** Address of an event's banner image, or null when it has none. Images are served by the main API. */
export function bannerSrc(event, size) {
  const version = event?.bannerVersion
  if (!version) return null
  return `${API_BASE}/v1/event-banners/${encodeURIComponent(event.id)}/${encodeURIComponent(version)}/${size}`
}
