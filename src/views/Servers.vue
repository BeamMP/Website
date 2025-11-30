<template>
  <div class="servers-container">
    <div class="servers-header">
      <h1 class="servers-title">BeamMP Servers</h1>
      <p class="servers-subtitle">Join thousands of players in multiplayer BeamNG.drive</p>
    </div>

    <div class="servers-filters">
      <div class="filter-group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search servers..."
          class="search-input"
        />
      </div>

      <div class="filter-group">
        <label class="filter-label">
          <input v-model="filters.hideEmpty" type="checkbox" />
          Hide Empty
        </label>
        <label class="filter-label">
          <input v-model="filters.hideFull" type="checkbox" />
          Hide Full
        </label>
        <label class="filter-label">
          <input v-model="filters.hidePassword" type="checkbox" />
          Hide Password
        </label>
      </div>

      <div class="filter-group">
        <span class="filter-heading">Show only:</span>
        <label class="filter-label">
          <input v-model="filters.official" type="checkbox" />
          Official
        </label>
        <label class="filter-label">
          <input v-model="filters.partner" type="checkbox" />
          Partner
        </label>
        <label class="filter-label">
          <input v-model="filters.featured" type="checkbox" />
          Featured
        </label>
      </div>

      <div class="server-count">
        {{ filteredServers.length }} servers found ({{ totalPlayers }} players online)
      </div>
    </div>

    <div v-if="loading" class="loading">Loading servers...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="table-wrapper">
      <table class="servers-table">
        <thead>
          <tr>
            <th class="col-location">Location</th>
            <th class="col-name">Server Name</th>
            <th class="col-map">Map</th>
            <th class="col-players">Players</th>
            <th class="col-mods">Mods</th>
            <th class="col-status">Status</th>
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

onMounted(async () => {
  try {
    //const response = await fetch('/servers.json')
    const response = await fetch('https://backend.beammp.com/servers-info');
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

const isoCountries = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: "Cote D'Ivoire",
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
}

function getCountryName(code) {
  return isoCountries[code] || code
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

.servers-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: var(--text-color, #1a1a1a);
}

.servers-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted, #666);
  margin: 0;
}

.servers-filters {
  background: var(--card-bg, #f9f9f9);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid var(--border-color, #d0d0d0);
  border-radius: 6px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1a1a1a);
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color, #5d9cec);
}

.filter-label {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  color: var(--text-color, #1a1a1a);
}

.filter-label input[type='checkbox'] {
  margin-right: 6px;
  cursor: pointer;
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

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .servers-container {
    --text-color: #e0e0e0;
    --text-muted: #999;
    --card-bg: #2a2a2a;
    --border-color: #404040;
    --input-bg: #1a1a1a;
    --tag-bg: #404040;
    --primary-color: #5d9cec;
    --header-bg: #1f1f1f;
    --hover-bg: #333;
    --active-bg: #2a3f5f;
    --details-bg: #252525;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .servers-container {
    padding: 15px;
  }

  .servers-title {
    font-size: 2rem;
  }

  .servers-subtitle {
    font-size: 1rem;
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
