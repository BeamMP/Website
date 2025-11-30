<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const loading = ref(true)
const error = ref(null)
const servers = ref([])

// Backend endpoints (use null to fall back to synthetic data)
const STATS_ENDPOINT = null // e.g., 'https://backend.beammp.com/stats-timeseries'

// All-time high tracking
const peakPlayers = ref(0)
const peakServers = ref(0)

// KPIs from current servers snapshot
const serverCount = computed(() => servers.value.length)
const totalPlayers = computed(() =>
  servers.value.reduce((s, x) => s + (parseInt(x.players) || 0), 0)
)
const officialCount = computed(() => servers.value.filter((s) => s.official).length)
const partnerCount = computed(() => servers.value.filter((s) => s.partner).length)
const avgPlayers = computed(() =>
  serverCount.value ? Math.round((totalPlayers.value / serverCount.value) * 10) / 10 : 0
)

// Time range selection for the chart (mock until backend available)
const ranges = [
  { key: '24h', label: '24h', points: 24, stepHours: 1 },
  { key: '7d', label: '7d', points: 7 * 24, stepHours: 1 },
  { key: '30d', label: '30d', points: 30, stepHours: 24 },
]
const selectedRangeKey = ref('7d')
const selectedRange = computed(() => ranges.find((r) => r.key === selectedRangeKey.value))

// Release markers (fill with real dates/labels as desired)
const releases = ref([
  { date: '2025-11-24', label: 'v4.0.0' },
  { date: '2025-11-27', label: 'v4.1.0' },
  { date: '2025-11-29', label: 'v4.2.0' },
])

// Load time-series from backend or generate synthetic
async function loadTimeSeries(points, stepHours) {
  if (STATS_ENDPOINT) {
    try {
      const res = await fetch(STATS_ENDPOINT)
      if (!res.ok) throw new Error('Stats endpoint failed')
      const data = await res.json()
      // Expected format: [{ timestamp: ISO string or epoch, players: number, servers: number }, ...]
      return {
        players: data.map((d) => ({ t: new Date(d.timestamp), v: d.players || 0 })),
        servers: data.map((d) => ({ t: new Date(d.timestamp), v: d.servers || 0 })),
      }
    } catch (e) {
      console.error('Failed to load time series, falling back to synthetic:', e)
    }
  }
  // Fallback: generate synthetic series
  return generateSeries(totalPlayers.value || 0, serverCount.value || 0, points, stepHours)
}

// Generate a synthetic series based on current players (until API exists)
function generateSeries(baseP, baseS, points, stepHours) {
  const now = new Date()
  const players = []
  const servers = []
  let vP = Math.max(0, baseP)
  let vS = Math.max(0, baseS)
  let maxPlayers = peakPlayers.value || baseP
  let maxServers = peakServers.value || baseS

  for (let i = points - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * stepHours * 3600_000)
    // daily cycle + random noise
    const hour = t.getHours()
    const cycle = (Math.sin((hour / 24) * 2 * Math.PI) + 1) / 2 // 0..1
    const noiseP = (Math.random() - 0.5) * 0.1 * baseP
    const trendP = (Math.random() - 0.5) * 0.02 * baseP
    vP = Math.max(0, 0.6 * baseP + 0.6 * baseP * cycle + noiseP + trendP)
    const roundedP = Math.round(vP)
    players.push({ t, v: roundedP })

    // Server count with similar but less volatile pattern
    const noiseS = (Math.random() - 0.5) * 0.08 * baseS
    const trendS = (Math.random() - 0.5) * 0.015 * baseS
    vS = Math.max(0, 0.65 * baseS + 0.5 * baseS * cycle + noiseS + trendS)
    const roundedS = Math.round(vS)
    servers.push({ t, v: roundedS })

    // Track peaks (simulate historical highs)
    if (roundedP > maxPlayers) maxPlayers = roundedP
    if (roundedS > maxServers) maxServers = roundedS
  }

  // Update peaks if synthetic data exceeded them
  if (maxPlayers > peakPlayers.value) peakPlayers.value = maxPlayers
  if (maxServers > peakServers.value) peakServers.value = maxServers

  return { players, servers }
}

const seriesPlayers = ref([])
const seriesServers = ref([])

async function rebuildSeries() {
  const data = await loadTimeSeries(selectedRange.value.points, selectedRange.value.stepHours)
  seriesPlayers.value = data.players
  seriesServers.value = data.servers
  drawPlayers()
  drawServers()
}

// Fetch servers snapshot for KPIs
onMounted(async () => {
  try {
    const res = await fetch('/servers.json')
    if (!res.ok) throw new Error('Failed to fetch servers')
    servers.value = await res.json()

    // Initialize peaks from current snapshot (will be updated by time series if higher)
    peakPlayers.value = totalPlayers.value
    peakServers.value = serverCount.value
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load statistics. Please try again later.'
  } finally {
    loading.value = false
    await rebuildSeries()
  }
  window.addEventListener('resize', () => {
    drawPlayers()
    drawServers()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    drawPlayers()
    drawServers()
  })
})

watch([selectedRangeKey, servers], async () => {
  if (!loading.value) await rebuildSeries()
})

// Canvas charts (no deps)
const canvasElPlayers = ref(null)
const canvasElServers = ref(null)
const tooltipPlayers = ref({ show: false, x: 0, y: 0, text: '' })
const tooltipServers = ref({ show: false, x: 0, y: 0, text: '' })
const tooltipRelease = ref({ show: false, x: 0, y: 0, text: '', chart: '' })
let lastBoundsPlayers = { left: 0, top: 0 }
let lastBoundsServers = { left: 0, top: 0 }
let releaseMarkersPlayers = []
let releaseMarkersServers = []

function drawPlayers() {
  const canvas = canvasElPlayers.value
  if (!canvas) return
  const parent = canvas.parentElement
  const w = parent.clientWidth
  const h = 320
  canvas.width = w * window.devicePixelRatio
  canvas.height = h * window.devicePixelRatio
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  const ctx = canvas.getContext('2d')
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // Background
  ctx.clearRect(0, 0, w, h)

  const padding = { left: 48, right: 16, top: 16, bottom: 28 }
  const plotW = w - padding.left - padding.right
  const plotH = h - padding.top - padding.bottom
  if (plotW <= 0 || plotH <= 0 || seriesPlayers.value.length === 0) return

  const xs = seriesPlayers.value
  const minV = 0
  const maxV = Math.max(10, Math.max(...xs.map((p) => p.v)))
  const minT = xs[0].t.getTime()
  const maxT = xs[xs.length - 1].t.getTime()
  const tx = (t) => padding.left + ((t - minT) / (maxT - minT)) * plotW
  const ty = (v) => padding.top + (1 - (v - minV) / (maxV - minV)) * plotH

  // Axes
  ctx.strokeStyle =
    getComputedStyle(document.documentElement).getPropertyValue('--border') || '#e5e7eb'
  ctx.fillStyle =
    getComputedStyle(document.documentElement).getPropertyValue('--foreground') || '#111827'
  ctx.lineWidth = 1

  // y gridlines and labels (4 steps)
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillStyle = 'rgba(100,100,100,0.9)'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let i = 0; i <= 4; i++) {
    const v = (i / 4) * maxV
    const y = ty(v)
    ctx.strokeStyle = 'rgba(120,120,120,0.15)'
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(w - padding.right, y)
    ctx.stroke()
    ctx.fillText(String(Math.round(v)), padding.left - 8, y)
  }

  // x axis baseline
  ctx.strokeStyle = 'rgba(120,120,120,0.3)'
  ctx.beginPath()
  ctx.moveTo(padding.left, h - padding.bottom)
  ctx.lineTo(w - padding.right, h - padding.bottom)
  ctx.stroke()

  // x axis labels (4-6 time points)
  ctx.fillStyle = 'rgba(100,100,100,0.9)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  const numLabels = Math.min(6, Math.floor(plotW / 80))
  for (let i = 0; i <= numLabels; i++) {
    const t = minT + (i / numLabels) * (maxT - minT)
    const x = tx(t)
    const date = new Date(t)
    const label =
      selectedRange.value.key === '24h'
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    ctx.fillText(label, x, h - padding.bottom + 6)
  }

  // Line path
  ctx.strokeStyle = '#4a89dc'
  ctx.lineWidth = 2
  ctx.beginPath()
  xs.forEach((p, i) => {
    const x = tx(p.t.getTime())
    const y = ty(p.v)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  // Points
  ctx.fillStyle = '#4a89dc'
  xs.forEach((p) => {
    const x = tx(p.t.getTime())
    const y = ty(p.v)
    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2)
    ctx.fill()
  })

  // Release markers
  ctx.strokeStyle = 'rgba(255,106,0,0.8)'
  ctx.fillStyle = 'rgba(255,106,0,0.9)'
  ctx.lineWidth = 1
  const rels = (releases.value || [])
    .map((r) => ({ ...r, time: new Date(r.date).getTime() }))
    .filter((r) => !isNaN(r.time) && r.time >= minT && r.time <= maxT)
  releaseMarkersPlayers = []
  rels.forEach((r) => {
    const x = tx(r.time)
    releaseMarkersPlayers.push({ x, label: r.label, date: r.date, time: r.time })
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, h - padding.bottom)
    ctx.stroke()
    // small marker triangle at top
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x - 4, padding.top + 8)
    ctx.lineTo(x + 4, padding.top + 8)
    ctx.closePath()
    ctx.fill()
  })

  lastBoundsPlayers = canvas.getBoundingClientRect()
}

function drawServers() {
  const canvas = canvasElServers.value
  if (!canvas) return
  const parent = canvas.parentElement
  const w = parent.clientWidth
  const h = 320
  canvas.width = w * window.devicePixelRatio
  canvas.height = h * window.devicePixelRatio
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  const ctx = canvas.getContext('2d')
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // Background
  ctx.clearRect(0, 0, w, h)

  const padding = { left: 48, right: 16, top: 16, bottom: 28 }
  const plotW = w - padding.left - padding.right
  const plotH = h - padding.top - padding.bottom
  if (plotW <= 0 || plotH <= 0 || seriesServers.value.length === 0) return

  const xs = seriesServers.value
  const minV = 0
  const maxV = Math.max(10, Math.max(...xs.map((p) => p.v)))
  const minT = xs[0].t.getTime()
  const maxT = xs[xs.length - 1].t.getTime()
  const tx = (t) => padding.left + ((t - minT) / (maxT - minT)) * plotW
  const ty = (v) => padding.top + (1 - (v - minV) / (maxV - minV)) * plotH

  // Axes
  ctx.strokeStyle =
    getComputedStyle(document.documentElement).getPropertyValue('--border') || '#e5e7eb'
  ctx.fillStyle =
    getComputedStyle(document.documentElement).getPropertyValue('--foreground') || '#111827'
  ctx.lineWidth = 1

  // y gridlines and labels (4 steps)
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillStyle = 'rgba(100,100,100,0.9)'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let i = 0; i <= 4; i++) {
    const v = (i / 4) * maxV
    const y = ty(v)
    ctx.strokeStyle = 'rgba(120,120,120,0.15)'
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(w - padding.right, y)
    ctx.stroke()
    ctx.fillText(String(Math.round(v)), padding.left - 8, y)
  }

  // x axis baseline
  ctx.strokeStyle = 'rgba(120,120,120,0.3)'
  ctx.beginPath()
  ctx.moveTo(padding.left, h - padding.bottom)
  ctx.lineTo(w - padding.right, h - padding.bottom)
  ctx.stroke()

  // x axis labels (4-6 time points)
  ctx.fillStyle = 'rgba(100,100,100,0.9)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  const numLabels = Math.min(6, Math.floor(plotW / 80))
  for (let i = 0; i <= numLabels; i++) {
    const t = minT + (i / numLabels) * (maxT - minT)
    const x = tx(t)
    const date = new Date(t)
    const label =
      selectedRange.value.key === '24h'
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    ctx.fillText(label, x, h - padding.bottom + 6)
  }

  // Line path (different color for servers)
  ctx.strokeStyle = '#22c55e'
  ctx.lineWidth = 2
  ctx.beginPath()
  xs.forEach((p, i) => {
    const x = tx(p.t.getTime())
    const y = ty(p.v)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  // Points
  ctx.fillStyle = '#22c55e'
  xs.forEach((p) => {
    const x = tx(p.t.getTime())
    const y = ty(p.v)
    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2)
    ctx.fill()
  })

  // Release markers
  ctx.strokeStyle = 'rgba(255,106,0,0.8)'
  ctx.fillStyle = 'rgba(255,106,0,0.9)'
  ctx.lineWidth = 1
  const rels = (releases.value || [])
    .map((r) => ({ ...r, time: new Date(r.date).getTime() }))
    .filter((r) => !isNaN(r.time) && r.time >= minT && r.time <= maxT)
  releaseMarkersServers = []
  rels.forEach((r) => {
    const x = tx(r.time)
    releaseMarkersServers.push({ x, label: r.label, date: r.date, time: r.time })
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, h - padding.bottom)
    ctx.stroke()
    // small marker triangle at top
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x - 4, padding.top + 8)
    ctx.lineTo(x + 4, padding.top + 8)
    ctx.closePath()
    ctx.fill()
  })

  lastBoundsServers = canvas.getBoundingClientRect()
}

function onMovePlayers(e) {
  const canvas = canvasElPlayers.value
  if (!canvas || seriesPlayers.value.length === 0) return
  const rect = lastBoundsPlayers
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // Check if hovering over a release marker (priority over data points)
  for (const marker of releaseMarkersPlayers) {
    if (Math.abs(marker.x - x) < 8) {
      tooltipRelease.value = {
        show: true,
        x: marker.x,
        y: 40,
        text: `${marker.label}\n${new Date(marker.date).toLocaleDateString()}`,
        chart: 'players',
      }
      tooltipPlayers.value.show = false
      return
    }
  }
  tooltipRelease.value.show = false

  // find nearest point by x distance
  const xs = seriesPlayers.value
  const minT = xs[0].t.getTime()
  const maxT = xs[xs.length - 1].t.getTime()
  const w = canvas.clientWidth
  const padding = { left: 48, right: 16 }
  const plotW = w - padding.left - padding.right
  const tx = (t) => padding.left + ((t - minT) / (maxT - minT)) * plotW

  let nearest = null,
    best = Infinity
  xs.forEach((p) => {
    const px = tx(p.t.getTime())
    const d = Math.abs(px - x)
    if (d < best) {
      best = d
      nearest = { px, p }
    }
  })
  if (nearest && best < 24) {
    tooltipPlayers.value = {
      show: true,
      x: nearest.px,
      y,
      text: `${nearest.p.v} players\n${nearest.p.t.toLocaleString()}`,
    }
  } else {
    tooltipPlayers.value.show = false
  }
}

function onMoveServers(e) {
  const canvas = canvasElServers.value
  if (!canvas || seriesServers.value.length === 0) return
  const rect = lastBoundsServers
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // Check if hovering over a release marker (priority over data points)
  for (const marker of releaseMarkersServers) {
    if (Math.abs(marker.x - x) < 8) {
      tooltipRelease.value = {
        show: true,
        x: marker.x,
        y: 40,
        text: `${marker.label}\n${new Date(marker.date).toLocaleDateString()}`,
        chart: 'servers',
      }
      tooltipServers.value.show = false
      return
    }
  }
  tooltipRelease.value.show = false

  // find nearest point by x distance
  const xs = seriesServers.value
  const minT = xs[0].t.getTime()
  const maxT = xs[xs.length - 1].t.getTime()
  const w = canvas.clientWidth
  const padding = { left: 48, right: 16 }
  const plotW = w - padding.left - padding.right
  const tx = (t) => padding.left + ((t - minT) / (maxT - minT)) * plotW

  let nearest = null,
    best = Infinity
  xs.forEach((p) => {
    const px = tx(p.t.getTime())
    const d = Math.abs(px - x)
    if (d < best) {
      best = d
      nearest = { px, p }
    }
  })
  if (nearest && best < 24) {
    tooltipServers.value = {
      show: true,
      x: nearest.px,
      y,
      text: `${nearest.p.v} servers\n${nearest.p.t.toLocaleString()}`,
    }
  } else {
    tooltipServers.value.show = false
  }
}

function onLeavePlayers() {
  tooltipPlayers.value.show = false
  if (tooltipRelease.value.chart === 'players') tooltipRelease.value.show = false
}
function onLeaveServers() {
  tooltipServers.value.show = false
  if (tooltipRelease.value.chart === 'servers') tooltipRelease.value.show = false
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 py-10">
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        BeamMP Statistics
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl">
        Live snapshot metrics from active servers and a player volume timeline. Releases can be
        annotated on the chart.
      </p>
    </div>

    <div v-if="loading" class="py-16 text-center text-neutral-600 dark:text-neutral-300">
      Loading…
    </div>
    <div v-else-if="error" class="py-16 text-center text-red-600">{{ error }}</div>

    <div v-else class="space-y-8">
      <!-- KPI Cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Current Players
          </div>
          <div class="mt-1 text-3xl font-semibold">{{ totalPlayers }}</div>
          <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Peak: {{ peakPlayers }}
          </div>
        </div>
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Current Servers
          </div>
          <div class="mt-1 text-3xl font-semibold">{{ serverCount }}</div>
          <div class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Peak: {{ peakServers }}
          </div>
        </div>
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Avg Players / Server
          </div>
          <div class="mt-1 text-3xl font-semibold">{{ avgPlayers }}</div>
        </div>
      </div>

      <!-- Secondary Stats -->
      <div class="grid grid-cols-2 gap-4">
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Official Servers
          </div>
          <div class="mt-1 text-2xl font-semibold">{{ officialCount }}</div>
        </div>
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Partner Servers
          </div>
          <div class="mt-1 text-2xl font-semibold">{{ partnerCount }}</div>
        </div>
      </div>

      <!-- Player Volume Chart -->
      <div
        class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
      >
        <div class="flex items-center justify-between gap-4 mb-3">
          <h2 class="text-lg font-semibold">Player Volume Over Time</h2>
          <div class="flex items-center gap-2">
            <button
              v-for="r in ranges"
              :key="r.key"
              class="px-3 py-1.5 rounded-md text-sm border transition-colors"
              :class="
                r.key === selectedRangeKey
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent'
                  : 'bg-transparent text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              "
              @click="selectedRangeKey = r.key"
            >
              {{ r.label }}
            </button>
          </div>
        </div>
        <div class="relative">
          <canvas
            ref="canvasElPlayers"
            class="w-full h-80"
            @mousemove="onMovePlayers"
            @mouseleave="onLeavePlayers"
          />
          <div
            v-if="tooltipPlayers.show"
            class="pointer-events-none absolute px-2 py-1 rounded bg-neutral-900 text-white text-xs whitespace-pre"
            :style="{
              left: tooltipPlayers.x + 'px',
              top: tooltipPlayers.y + 'px',
              transform: 'translate(-50%, -120%)',
            }"
          >
            {{ tooltipPlayers.text }}
          </div>
          <div
            v-if="tooltipRelease.show && tooltipRelease.chart === 'players'"
            class="pointer-events-none absolute px-2 py-1 rounded bg-orange-600 text-white text-xs whitespace-pre font-semibold"
            :style="{
              left: tooltipRelease.x + 'px',
              top: tooltipRelease.y + 'px',
              transform: 'translate(-50%, 0)',
            }"
          >
            {{ tooltipRelease.text }}
          </div>
        </div>
        <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Release markers are shown as orange vertical lines (e.g., v3.0.0, v4.0.0). Hover over data
          points for details.
        </p>
      </div>

      <!-- Server Count Chart -->
      <div
        class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
      >
        <div class="flex items-center justify-between gap-4 mb-3">
          <h2 class="text-lg font-semibold">Server Count Over Time</h2>
        </div>
        <div class="relative">
          <canvas
            ref="canvasElServers"
            class="w-full h-80"
            @mousemove="onMoveServers"
            @mouseleave="onLeaveServers"
          />
          <div
            v-if="tooltipServers.show"
            class="pointer-events-none absolute px-2 py-1 rounded bg-neutral-900 text-white text-xs whitespace-pre"
            :style="{
              left: tooltipServers.x + 'px',
              top: tooltipServers.y + 'px',
              transform: 'translate(-50%, -120%)',
            }"
          >
            {{ tooltipServers.text }}
          </div>
          <div
            v-if="tooltipRelease.show && tooltipRelease.chart === 'servers'"
            class="pointer-events-none absolute px-2 py-1 rounded bg-orange-600 text-white text-xs whitespace-pre font-semibold"
            :style="{
              left: tooltipRelease.x + 'px',
              top: tooltipRelease.y + 'px',
              transform: 'translate(-50%, 0)',
            }"
          >
            {{ tooltipRelease.text }}
          </div>
        </div>
        <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Server count follows similar trends. Release markers indicate major version launches.
        </p>
      </div>
    </div>
  </section>
</template>
