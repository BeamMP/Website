<template>
  <div class="servers-container">
    <div class="servers-header">
      <h1 class="text-4xl font-bold">{{ $t('message.servers.title') }}</h1>
      <p class="text-base servers-subtitle text-neutral-600 dark:text-neutral-400">{{ $t('message.servers.description') }}</p>
    </div>

    <div class="servers-filters">
      <div class="filter-group">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('message.servers.filters.search')"
          class="search-input"
        />
      </div>

      <div class="filter-group">
        <label class="filter-label text-neutral-600 dark:text-neutral-400">
          <input v-model="filters.hideEmpty" type="checkbox" />
          {{ $t('message.servers.filters.hide_empty') }}
        </label>
        <label class="filter-label text-neutral-600 dark:text-neutral-400">
          <input v-model="filters.hideFull" type="checkbox" />
          {{ $t('message.servers.filters.hide_full') }}
        </label>
        <!--<label class="filter-label">
          <input v-model="filters.hidePassword" type="checkbox" />
          {{ $t('message.servers.filters.hide_password') }}
        </label>-->
      </div>

      <div class="filter-group">
        <span class="filter-heading">{{ $t('message.servers.show_only') }}</span>
        <label class="filter-label text-neutral-600 dark:text-neutral-400">
          <input v-model="filters.official" type="checkbox" />
          {{ $t('message.servers.filters.show_official') }}
        </label>
        <label class="filter-label text-neutral-600 dark:text-neutral-400">
          <input v-model="filters.partner" type="checkbox" />
          {{ $t('message.servers.filters.show_partner') }}
        </label>
        <label class="filter-label text-neutral-600 dark:text-neutral-400">
          <input v-model="filters.featured" type="checkbox" />
          {{ $t('message.servers.filters.show_featured') }}
        </label>
      </div>

      <div class="server-count">
        {{ $t('message.servers.server_count', { count: filteredServers.length }) }} ({{ $t('message.servers.players_found', { count: totalPlayers }) }})
      </div>
    </div>

    <div v-if="loading" class="loading">{{ $t('message.servers.loading_servers') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="table-wrapper">
      <table class="servers-table">
        <thead>
          <tr>
            <th class="col-location">{{ $t('message.servers.table_headers.location') }}</th>
            <th class="col-name">{{ $t('message.servers.table_headers.name') }}</th>
            <th class="col-map">{{ $t('message.servers.table_headers.map') }}</th>
            <th class="col-players">{{ $t('message.servers.table_headers.players') }}</th>
            <th class="col-mods">{{ $t('message.servers.table_headers.mods') }}</th>
            <th class="col-status">{{ $t('message.servers.table_headers.status') }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="server in filteredServers" :key="server.ip + ':' + server.port">
            <!-- Main row -->
            <tr
              class="server-row"
              :class="{
                expanded: expandedServer === server.ip + ':' + server.port,
                'server-official': server.official,
                'server-partner': server.partner,
                'server-featured': server.featured,
              }"
              @click="toggleExpand(server.ip + ':' + server.port)"
            >
              <td class="col-location">
                <img
                  :src="getCountryFlag(server.location)"
                  :alt="server.location"
                  :title="getCountryName(server.location)"
                  class="location-flag"
                  @error="(e) => (e.target.style.display = 'none')"
                />
                <span class="location-code sr-only">{{ server.location }}</span>
              </td>
              <td class="col-name">
                <div class="name-cell">
                  <span v-html="cleanServerName(server.sname)" />
                  <div class="name-badges">
                    <span v-if="server.official" class="badge badge-official">Official</span>
                    <span v-if="server.partner" class="badge badge-partner">Partner</span>
                    <span v-if="server.password" class="badge badge-password">🔒</span>
                  </div>
                </div>
              </td>
              <td class="col-map">{{ formatMapName(server.map) }}</td>
              <td class="col-players">
                <span
                  class="players-count"
                  :class="{
                    full: parseInt(server.players) >= parseInt(server.maxplayers),
                    active:
                      parseInt(server.players) > 0 &&
                      parseInt(server.players) < parseInt(server.maxplayers),
                  }"
                >
                  {{ server.players }}/{{ server.maxplayers }}
                </span>
              </td>
              <td class="col-mods">
                <span v-if="server.modstotal > 0" class="mods-count">{{ server.modstotal }}</span>
                <span v-else class="vanilla">Vanilla</span>
              </td>
              <td class="col-status">
                <span class="expand-icon">{{
                  expandedServer === server.ip + ':' + server.port ? '▼' : '▶'
                }}</span>
              </td>
            </tr>

            <!-- Expanded details row -->
            <tr v-if="expandedServer === server.ip + ':' + server.port" class="details-row">
              <td colspan="6">
                <div class="server-details-panel">
                  <div class="details-grid">
                    <div class="detail-section">
                      <h4>Server Information</h4>
                      <div class="detail-item">
                        <span class="label">IP Address:</span>
                        <span class="value mono">{{ server.ip }}:{{ server.port }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Version:</span>
                        <span class="value">{{ server.version }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Owner:</span>
                        <span class="value">{{ server.owner }}</span>
                      </div>
                      <div v-if="server.sdesc" class="detail-item">
                        <span class="label">Description:</span>
                        <span class="value">{{ server.sdesc }}</span>
                      </div>
                      <div v-if="server.tags" class="detail-item">
                        <span class="label">Tags:</span>
                        <div class="tags-list">
                          <span v-for="tag in server.tags.split(',')" :key="tag" class="tag">
                            {{ tag.trim() }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div v-if="server.playerslist" class="detail-section">
                      <h4>Online Players</h4>
                      <div v-if="server.playerslist" class="players-list">
                        <span
                          v-for="player in server.playerslist.split(';').filter((p) => p)"
                          :key="player"
                          class="player-name"
                        >
                          {{ player }}
                        </span>
                      </div>
                      <div v-else class="empty-players">No players online</div>
                    </div>

                    <div v-if="server.modstotal > 0" class="detail-section">
                      <h4>Mods ({{ server.modstotal }})</h4>
                      <div class="mods-info">
                        <div class="detail-item">
                          <span class="label">Total Size:</span>
                          <span class="value">{{ formatBytes(server.modstotalsize) }}</span>
                        </div>
                        <div class="mods-list">
                          <details>
                            <summary>View mod list</summary>
                            <div class="mod-items">
                              <span
                                v-for="mod in server.modlist.split(';').filter((m) => m)"
                                :key="mod"
                                class="mod-item"
                              >
                                {{ mod.replace(/^\//, '') }}
                              </span>
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="actions-bar">
                    <button class="btn-join" @click.stop="joinServer(server)">
                      Copy Server Address
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <div v-if="filteredServers.length === 0" class="no-servers">
        No servers match your filters.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const servers = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const expandedServer = ref(null)
const filters = ref({
  hideEmpty: false,
  hideFull: false,
  hidePassword: false,
  // category filters (inclusive OR). If none selected, show all.
  official: false,
  partner: false,
  featured: false,
})

const { locale } = useI18n()
const regionDisplay = computed(() => {
  try {
    return new Intl.DisplayNames([locale.value], { type: 'region' })
  } catch {
    return new Intl.DisplayNames(['en'], { type: 'region' })
  }
})

onMounted(async () => {
  try {
    //const response = await fetch('/servers.json')
    const response = await fetch('https://backend.beammp.com/servers-info')
    console.log(response)
    if (!response.ok) throw new Error('Failed to fetch servers')
    const data = await response.json()
    servers.value = data
  } catch (err) {
    error.value = 'Failed to load servers. Please try again later.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

const filteredServers = computed(() => {
  // Start with a shallow copy so sorting doesn't mutate original order
  let list = servers.value.slice()

  // Sort officials to the top (stable for equal official flag)
  list.sort((a, b) => {
    if (a.official === b.official) return 0
    return a.official ? -1 : 1
  })

  // Apply filters
  list = list.filter((server) => {
    // Category filters (inclusive OR among selected)
    const catFilters = filters.value
    const anyCatSelected = catFilters.official || catFilters.partner || catFilters.featured
    if (anyCatSelected) {
      const inCategory =
        (catFilters.official && server.official) ||
        (catFilters.partner && server.partner) ||
        (catFilters.featured && server.featured)
      if (!inCategory) return false
    }

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchesSearch =
        cleanServerName(server.sname).toLowerCase().includes(query) ||
        (server.sdesc && server.sdesc.toLowerCase().includes(query)) ||
        formatMapName(server.map).toLowerCase().includes(query) ||
        server.owner.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Empty filter
    if (filters.value.hideEmpty && parseInt(server.players) === 0) return false

    // Full filter
    if (filters.value.hideFull && parseInt(server.players) >= parseInt(server.maxplayers))
      return false

    // Password filter
    if (filters.value.hidePassword && server.password) return false

    return true
  })

  return list
})

const totalPlayers = computed(() => {
  return servers.value.reduce((sum, server) => sum + parseInt(server.players), 0)
})

function toggleExpand(ident) {
  expandedServer.value = expandedServer.value === ident ? null : ident
}

const styleMap = {
  '^0': 'color:#000000',
  '^1': 'color:#0000AA',
  '^2': 'color:#00AA00',
  '^3': 'color:#00AAAA',
  '^4': 'color:#AA0000',
  '^5': 'color:#AA00AA',
  '^6': 'color:#FFAA00',
  '^7': 'color:#AAAAAA',
  '^8': 'color:#555555',
  '^9': 'color:#5555FF',
  '^a': 'color:#55FF55',
  '^b': 'color:#55FFFF',
  '^c': 'color:#FF5555',
  '^d': 'color:#FF55FF',
  '^e': 'color:#FFFF55',
  '^f': 'color:#FFFFFF',
  '^l': 'font-weight:bold',
  '^m': 'text-decoration:line-through',
  '^n': 'text-decoration:underline',
  '^o': 'font-style:italic',
}

function applyCode(string, codes) {
  let style = ''
  for (let i = 0; i < codes.length; i++) {
    if (styleMap[codes[i]]) {
      style += styleMap[codes[i]] + ';'
    }
  }
  // eslint-disable-next-line no-control-regex
  string = string.replace(/\x00*/g, '')
  return `<span style="${style}">${string}</span>`
}

function cleanServerName(name) {
  const codes = name.match(/\^.{1}/g) || []
  const indexes = []
  let apply = []
  let final = ''

  for (let i = 0; i < codes.length; i++) {
    indexes.push(name.indexOf(codes[i]))
    name = name.replace(codes[i], '\x00\x00')
  }

  if (indexes[0] !== 0) {
    final += applyCode(name.substring(0, indexes[0]), [])
  }

  for (let i = 0; i < codes.length; i++) {
    let indexDelta = indexes[i + 1] - indexes[i]
    if (indexDelta === 2) {
      while (indexDelta === 2) {
        apply.push(codes[i])
        i++
        indexDelta = indexes[i + 1] - indexes[i]
      }
      apply.push(codes[i])
    } else {
      apply.push(codes[i])
    }

    if (apply.lastIndexOf('^r') > -1) {
      apply = apply.slice(apply.lastIndexOf('^r') + 1)
    }

    const tmpStr = name.substring(indexes[i], indexes[i + 1])
    final += applyCode(tmpStr, apply)
  }

  return final
}

function formatMapName(mapPath) {
  // Extract map name from path like "/levels/italy/info.json"
  const match = mapPath.match(/\/levels\/([^/]+)/)
  if (!match) return mapPath

  // Convert snake_case to Title Case
  return match[1]
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getCountryName(code) {
  if (!code) return ''
  const name = regionDisplay.value.of(code)
  return name || code
}

function getCountryFlag(code) {
  return `/flags/${code.toLowerCase()}.png`
}

function joinServer(server) {
  // Copy server address to clipboard
  const address = `${server.ip}:${server.port}`
  navigator.clipboard
    .writeText(address)
    .then(() => {
      alert(`Server address copied to clipboard!\n${address}\n\nPaste this in BeamMP to connect.`)
    })
    .catch(() => {
      prompt('Copy this server address:', address)
    })
}
</script>

<style scoped>
/* Pure CSS - No Tailwind for in-game compatibility */
.servers-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.servers-header {
  text-align: center;
  margin-bottom: 40px;
}

.servers-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted, #666);
  margin: 0;
}

.servers-filters {
  background: var(--filters-bg);
  border: 1px solid var(--filters-border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: var(--filters-shadow);
  backdrop-filter: blur(10px);
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1a1a1a);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.search-input:focus {
  outline: none;
  border-color: #ff6a00;
  box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.1);
}

.search-input::placeholder {
  color: var(--placeholder-color, var(--text-muted, #999));
}

.filter-heading {
  display: block;
  margin-bottom: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color, #1a1a1a);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.filter-label {
  display: inline-flex;
  align-items: center;
  margin-right: 24px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-label:hover {
  color: #ff6a00;
}

.filter-label input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid var(--checkbox-border, #d0d0d0);
  border-radius: 6px;
  background: var(--checkbox-bg, #fff);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
}

.filter-label input[type='checkbox']:hover {
  border-color: #ff6a00;
  box-shadow: 0 0 0 3px var(--checkbox-hover-shadow, rgba(255, 106, 0, 0.1));
}

.filter-label input[type='checkbox']:checked {
  background: linear-gradient(135deg, #ff6a00 0%, #ff8c26 100%);
  border-color: #ff6a00;
  box-shadow: 0 2px 8px rgba(255, 106, 0, 0.3);
}

.filter-label input[type='checkbox']:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.server-count {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color, #e0e0e0);
  font-weight: 600;
  color: var(--text-color, #1a1a1a);
}

.loading,
.error {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
}

.table-wrapper {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  overflow: hidden;
}

.servers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.servers-table thead {
  background: var(--header-bg, #f5f5f5);
  border-bottom: 2px solid var(--border-color, #e0e0e0);
}

.servers-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--text-color, #1a1a1a);
  white-space: nowrap;
}

.servers-table tbody tr.server-row {
  cursor: pointer;
  transition: background-color 0.15s;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
}

.servers-table tbody tr.server-row:hover {
  background: var(--hover-bg, #f9f9f9);
}

.servers-table tbody tr.server-row.expanded {
  background: var(--active-bg, #f0f7ff);
}

.servers-table tbody tr.server-row.server-official {
  background: rgba(255, 106, 0, 0.25);
  border-left: 3px solid #ff6a00;
}

.servers-table tbody tr.server-row.server-official:hover {
  background: rgba(255, 106, 0, 0.35);
}

.servers-table tbody tr.server-row.server-official.expanded {
  background: rgba(255, 106, 0, 0.3);
}

.servers-table tbody tr.server-row.server-partner {
  background: rgba(0, 123, 195, 0.3);
  border-left: 3px solid #007bc3;
}

.servers-table tbody tr.server-row.server-partner:hover {
  background: rgba(0, 123, 195, 0.4);
}

.servers-table tbody tr.server-row.server-partner.expanded {
  background: rgba(0, 123, 195, 0.35);
}

.servers-table tbody tr.server-row.server-featured {
  background: rgba(0, 128, 0, 0.25);
  border-left: 3px solid #008000;
}

.servers-table tbody tr.server-row.server-featured:hover {
  background: rgba(0, 128, 0, 0.35);
}

.servers-table tbody tr.server-row.server-featured.expanded {
  background: rgba(0, 128, 0, 0.3);
}

.servers-table td {
  padding: 12px 16px;
  color: var(--text-color, #1a1a1a);
}

.col-location {
  width: 80px;
}

.location-flag {
  /*width: 24px;*/
  height: 16px;
  margin-right: 6px;
  vertical-align: middle;
  object-fit: cover;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 2px;
}

.location-code {
  font-weight: 500;
}

.col-name {
  min-width: 250px;
  max-width: 400px;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.name-badges {
  display: flex;
  gap: 4px;
}

.badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-official {
  background: #4caf50;
  color: white;
}

.badge-partner {
  background: #ff9800;
  color: white;
}

.badge-password {
  background: #9e9e9e;
  color: white;
}

.col-map {
  width: 180px;
}

.col-players {
  width: 100px;
  text-align: center;
}

.players-count {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.players-count.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.players-count.full {
  background: #ffebee;
  color: #c62828;
}

.col-mods {
  width: 100px;
  text-align: center;
}

.mods-count {
  font-weight: 500;
  color: var(--primary-color, #5d9cec);
}

.vanilla {
  color: var(--text-muted, #999);
  font-size: 0.85rem;
}

.col-status {
  width: 50px;
  text-align: center;
}

.expand-icon {
  color: var(--text-muted, #999);
  font-size: 0.8rem;
}

.details-row {
  background: var(--details-bg, #fafafa);
  border-bottom: 1px solid var(--border-color, #e0e0e0);
}

.details-row td {
  padding: 0;
}

.server-details-panel {
  padding: 20px;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.detail-section h4 {
  margin: 0 0 12px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color, #1a1a1a);
  border-bottom: 2px solid var(--primary-color, #5d9cec);
  padding-bottom: 6px;
}

.detail-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.detail-item .label {
  font-weight: 600;
  color: var(--text-muted, #666);
  min-width: 100px;
}

.detail-item .value {
  color: var(--text-color, #1a1a1a);
  word-break: break-word;
}

.detail-item .value.mono {
  font-family: 'Courier New', monospace;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background: var(--tag-bg, #e8e8e8);
  color: var(--text-color, #1a1a1a);
  border-radius: 4px;
  font-size: 0.8rem;
}

.players-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 150px;
  overflow-y: auto;
}

.player-name {
  padding: 4px 10px;
  background: var(--tag-bg, #e8e8e8);
  border-radius: 4px;
  font-size: 0.85rem;
}

.empty-players {
  color: var(--text-muted, #999);
  font-style: italic;
}

.mods-info details {
  margin-top: 8px;
}

.mods-info summary {
  cursor: pointer;
  color: var(--primary-color, #5d9cec);
  font-weight: 500;
  padding: 8px;
  border-radius: 4px;
  user-select: none;
}

.mods-info summary:hover {
  background: var(--hover-bg, #f0f0f0);
}

.mod-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: var(--input-bg, #fff);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 4px;
}

.mod-item {
  padding: 4px 8px;
  background: var(--tag-bg, #e8e8e8);
  border-radius: 3px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
}

.actions-bar {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color, #e0e0e0);
}

.btn-join {
  padding: 12px 24px;
  background: linear-gradient(135deg, #5d9cec, #4a89dc);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.btn-join:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 156, 236, 0.4);
}

.btn-join:active {
  transform: translateY(0);
}

.no-servers {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.1rem;
  color: var(--text-muted, #666);
}

:global(.dark) .servers-container,
@media (prefers-color-scheme: dark) {
  .servers-container {
    --text-color: #e0e0e0;
    --text-muted: #999999;
    --card-bg: #2a2a2a;
    --border-color: #404040;
    --input-bg: #1a1a1a;
    --tag-bg: #404040;
    --primary-color: #5d9cec;
    --header-bg: #1f1f1f;
    --hover-bg: #333333;
    --active-bg: #2a3f5f;
    --details-bg: #252525;
    --filters-bg: linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%);
    --filters-border: rgba(255, 106, 0, 0.2);
    --filters-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --checkbox-bg: rgba(255, 255, 255, 0.05);
    --checkbox-border: rgba(255, 255, 255, 0.15);
    --checkbox-hover-shadow: rgba(255, 106, 0, 0.15);
    --placeholder-color: #666666;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .servers-container {
    padding: 15px;
  }

  .servers-filters {
    padding: 15px;
  }

  .filter-label {
    display: flex;
    margin-right: 0;
    margin-bottom: 10px;
  }

  /* Make table scrollable on mobile */
  .table-wrapper {
    overflow-x: auto;
  }

  .servers-table {
    min-width: 600px;
  }

  .servers-table th,
  .servers-table td {
    padding: 8px 10px;
    font-size: 0.85rem;
  }

  .col-name {
    min-width: 200px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .server-details-panel {
    padding: 15px;
  }
}
</style>
  
    /* Light theme defaults */
    --text-color: #1a1a1a;
    --text-muted: #666666;
    --card-bg: #ffffff;
    --border-color: #e0e0e0;
    --input-bg: #ffffff;
    --tag-bg: #e8e8e8;
    --primary-color: #5d9cec;
    --header-bg: #f5f5f5;
    --hover-bg: #f9f9f9;
    --active-bg: #f0f7ff;
    --details-bg: #fafafa;
    --filters-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 249, 249, 0.95) 100%);
    --filters-border: var(--border-color, #e0e0e0);
    --filters-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    --checkbox-bg: #ffffff;
    --checkbox-border: #d0d0d0;
    --checkbox-hover-shadow: rgba(255, 106, 0, 0.1);
    --placeholder-color: var(--text-muted, #999999);
