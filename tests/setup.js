// Runs before every test file (see vitest.config.js).

// jsdom has no matchMedia, which the theme toggle reads.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom has no IntersectionObserver / ResizeObserver, which some views use.
for (const name of ['IntersectionObserver', 'ResizeObserver']) {
  if (!window[name]) {
    window[name] = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
  }
}

// jsdom cannot draw: canvas.getContext() is null, and the statistics charts call
// ctx.scale() straight away. A stand-in whose every method does nothing lets
// the page run; what it would have drawn is not what is tested.
HTMLCanvasElement.prototype.getContext = function getContext() {
  const noop = () => {}
  return new Proxy(
    { canvas: this },
    {
      get: (target, prop) =>
        prop in target ? target[prop] : prop === 'measureText' ? () => ({ width: 0 }) : noop,
      set: (target, prop, value) => {
        target[prop] = value
        return true
      },
    }
  )
}

// Node 22+ has its own `localStorage` global that wins over jsdom's and does
// nothing useful unless node is started with --localstorage-file. A plain
// in-memory one means the tests do not depend on the node version or a flag.
class MemoryStorage {
  #map = new Map()
  getItem(key) {
    return this.#map.has(key) ? this.#map.get(key) : null
  }
  setItem(key, value) {
    this.#map.set(key, String(value))
  }
  removeItem(key) {
    this.#map.delete(key)
  }
  clear() {
    this.#map.clear()
  }
  key(index) {
    return Array.from(this.#map.keys())[index] ?? null
  }
  get length() {
    return this.#map.size
  }
}

const memoryStorage = new MemoryStorage()
Object.defineProperty(globalThis, 'localStorage', {
  value: memoryStorage,
  configurable: true,
  writable: true,
})
Object.defineProperty(window, 'localStorage', {
  value: memoryStorage,
  configurable: true,
  writable: true,
})

beforeEach(() => {
  localStorage.clear()
})
