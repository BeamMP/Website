<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { bannerSrc, formatLap, formatWhen, useEventsFeed, useEventText } from './helpers'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { status, errorText } = useEventText()
const route = useRoute()
const locale = computed(() => route.params.locale || 'en')
const eventId = computed(() => String(route.params.eventId || ''))
const search = ref('')

const { data, error, connected, restart } = useEventsFeed(
  () => `/v1/events/${encodeURIComponent(eventId.value)}/leaderboard?mode=top&limit=100`
)
watch(eventId, () => {
  search.value = ''
  restart()
})

const event = computed(() => data.value?.event)
const topRows = computed(() =>
  (data.value?.rows ?? []).slice(0, event.value?.leaderboardSize ?? 100)
)
const rows = computed(() =>
  topRows.value.filter((r) => r.name.toLowerCase().includes(search.value.toLowerCase()))
)
const cutoff = computed(() => topRows.value.find((r) => r.rank === event.value?.leaderboardSize))
const servers = computed(() => data.value?.servers ?? [])
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 py-10">
    <RouterLink
      :to="`/${locale}/events`"
      class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-orange-600"
      >{{ t('message.events.back') }}</RouterLink
    >

    <p v-if="error" class="mt-4 text-sm text-red-600" role="status">
      {{ errorText(error) }}
      <span v-if="data">{{ t('message.events.lastShown') }}</span>
    </p>

    <div v-if="!event && !error" class="py-16 text-center text-neutral-600 dark:text-neutral-300">
      {{ t('message.events.loadingEvent') }}
    </div>

    <template v-if="event">
      <div
        :class="[
          'mt-4 mb-8',
          event.bannerVersion
            ? 'relative overflow-hidden rounded-xl bg-neutral-900 px-6 py-10 sm:px-10 sm:py-16'
            : '',
        ]"
      >
        <template v-if="event.bannerVersion">
          <img
            :src="bannerSrc(event, 'hero')"
            alt=""
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
            aria-hidden="true"
          />
        </template>
        <div class="relative">
          <div
            class="text-xs uppercase tracking-wide text-orange-600 dark:text-orange-400 font-semibold"
          >
            {{ status(event.status) }} · {{ t('message.events.standings') }}
          </div>
          <h1
            :class="[
              'mt-1 text-4xl font-extrabold tracking-tight',
              event.bannerVersion ? 'text-white' : 'text-neutral-900 dark:text-white',
            ]"
          >
            {{ event.title }}
          </h1>
          <p
            :class="[
              'mt-3 max-w-2xl',
              event.bannerVersion ? 'text-white/85' : 'text-neutral-600 dark:text-neutral-300',
            ]"
          >
            {{ event.subtitle }}
            <span v-if="event.subtitle">·</span>
            {{ t('message.events.topDrivers', { count: event.leaderboardSize }) }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {{ t('message.events.statDrivers') }}
          </div>
          <div class="mt-1 text-3xl font-semibold">{{ event.stats.players.toLocaleString() }}</div>
        </div>
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {{ t('message.events.statLaps') }}
          </div>
          <div class="mt-1 text-3xl font-semibold">{{ event.stats.laps.toLocaleString() }}</div>
        </div>
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Servers
          </div>
          <div class="mt-1 text-3xl font-semibold">{{ servers.length }}</div>
        </div>
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
        >
          <div class="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            {{ t('message.events.statPlace', { count: event.leaderboardSize }) }}
          </div>
          <div class="mt-1 text-2xl sm:text-3xl font-semibold tabular-nums">
            {{ cutoff ? formatLap(cutoff.time) : '—' }}
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div
          class="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 overflow-hidden"
        >
          <div
            class="flex items-center justify-between gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800"
          >
            <h2 class="font-semibold">{{ t('message.events.standingsTitle') }}</h2>
            <input
              v-model="search"
              type="search"
              :aria-label="t('message.events.search')"
              :placeholder="t('message.events.search')"
              class="w-48 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm"
            />
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead
                class="text-left text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
              >
                <tr>
                  <th scope="col" class="px-4 py-2">{{ t('message.events.pos') }}</th>
                  <th scope="col" class="px-4 py-2">{{ t('message.events.driver') }}</th>
                  <th scope="col" class="px-4 py-2">{{ t('message.events.bestLap') }}</th>
                  <th scope="col" class="px-4 py-2">{{ t('message.events.gap') }}</th>
                  <th scope="col" class="px-4 py-2">{{ t('message.events.pen') }}</th>
                  <th scope="col" class="px-4 py-2 hidden sm:table-cell">
                    {{ t('message.events.server') }}
                  </th>
                </tr>
              </thead>
              <tbody class="tabular-nums">
                <tr
                  v-for="row in rows"
                  :key="row.identityKey"
                  class="border-t border-neutral-200 dark:border-neutral-800"
                >
                  <td class="px-4 py-2 font-semibold">{{ String(row.rank).padStart(2, '0') }}</td>
                  <td class="px-4 py-2">{{ row.name }}</td>
                  <td class="px-4 py-2">{{ formatLap(row.time) }}</td>
                  <td class="px-4 py-2 text-neutral-500 dark:text-neutral-400">
                    {{ row.rank === 1 ? t('message.events.leader') : '+' + row.gap.toFixed(3) }}
                  </td>
                  <td class="px-4 py-2">{{ row.penalties }}</td>
                  <td class="px-4 py-2 hidden sm:table-cell text-neutral-500 dark:text-neutral-400">
                    {{ row.server }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-if="!rows.length" class="p-6 text-center text-neutral-600 dark:text-neutral-300">
            {{ topRows.length ? t('message.events.noMatch') : t('message.events.waiting') }}
          </p>
        </div>

        <aside class="space-y-6">
          <div
            class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60"
          >
            <h2 class="font-semibold">{{ t('message.events.sources') }}</h2>
            <ul class="mt-3 space-y-2 text-sm">
              <li v-for="s in servers" :key="s.id">
                {{ s.name }}
                <div class="text-xs text-neutral-500 dark:text-neutral-400">
                  {{
                    t('message.events.lastResult', {
                      when: formatWhen(s.lastEventAt) || t('message.events.none'),
                    })
                  }}
                </div>
              </li>
              <li v-if="!servers.length" class="text-neutral-500">
                {{ t('message.events.noServers') }}
              </li>
            </ul>
            <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              {{ connected ? t('message.events.live') : t('message.events.lost') }}
            </p>
          </div>
          <div
            class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white/70 dark:bg-neutral-900/60 text-sm space-y-3"
          >
            <h2 class="font-semibold">{{ t('message.events.rules') }}</h2>
            <p>
              <b>{{ t('message.events.r1t') }}</b> {{ t('message.events.r1') }}
            </p>
            <p>
              <b>{{ t('message.events.r2t') }}</b> {{ t('message.events.r2') }}
            </p>
            <p>
              <b>{{ t('message.events.r3t') }}</b> {{ t('message.events.r3') }}
            </p>
            <p>
              <b>{{ t('message.events.r4t') }}</b> {{ t('message.events.r4') }}
            </p>
          </div>
        </aside>
      </div>
    </template>
  </section>
</template>
