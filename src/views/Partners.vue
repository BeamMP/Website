<script setup>
import { ref, onMounted } from 'vue'

const partners = ref([])
const loading = ref(true)
const error = ref(null)

async function loadPartners() {
  try {
    const res = await fetch('/partners.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to load partners (${res.status})`)
    const data = await res.json()
    partners.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e.message || 'Unable to fetch partners'
  } finally {
    loading.value = false
  }
}

onMounted(loadPartners)
</script>

<template>
  <section class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold">{{ $t('message.partners.title') }}</h1>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {{ $t('message.partners.description') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/50 animate-pulse"
        >
          <div class="h-16 bg-neutral-200 dark:bg-neutral-800 rounded mb-4" />
          <div class="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3 mb-2" />
          <div class="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
          <div class="h-9 bg-neutral-200 dark:bg-neutral-800 rounded w-full mt-6" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <p class="text-red-600 dark:text-red-400">{{ $t('message.partners.error_loading') }}</p>
      </div>

      <!-- Partners Grid -->
      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(p, idx) in partners"
          :key="idx"
          class="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 p-6 hover:border-beammp-blue dark:hover:border-beammp-orange hover:shadow-xl transition-all"
        >
          <div class="flex items-center justify-center h-16 mb-4">
            <img :src="p.logo" :alt="p.name" class="max-h-16 object-contain" />
          </div>
          <div class="space-y-1">
            <h3 class="text-xl font-semibold">{{ p.name }}</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ $t('message.partners.from_price', { price: p.from }) }}
            </p>
          </div>
          <a
            :href="p.website"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center justify-center gap-2 w-full bg-beammp-blue hover:bg-beammp-blue/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors dark:bg-beammp-orange dark:hover:bg-beammp-orange/90"
          >
            {{ $t('message.partners.visit_website') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
