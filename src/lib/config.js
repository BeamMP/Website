// Where BeamMP's own services live. The container writes /assets/env.js when it starts
// (website-entrypoint.sh, from API_URL and ACCOUNTS_URL, as Accounts does); the defaults are
// the real services.
const trim = (url) => url.replace(/\/+$/, '')

export const API_BASE = trim(window.__ENV__?.API_URL || 'https://api.beammp.com')
export const ACCOUNTS_BASE = trim(window.__ENV__?.ACCOUNTS_URL || 'https://accounts.beammp.com')
