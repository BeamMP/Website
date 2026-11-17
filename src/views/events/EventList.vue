<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { bannerSrc, useEventsFeed, useEventText } from './helpers'

const { status, errorText } = useEventText()
const route = useRoute()
const locale = computed(() => route.params.locale || 'en')
const { data, error, connected } = useEventsFeed(() => '/v1/events', { intervalMs: 5000 })
const events = computed(() => data.value?.events ?? [])
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 py-10">
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {{ $t('message.events.title') }}
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl">
        {{ $t('message.events.description') }}
      </p>
    </div>

    <p v-if="error" class="mb-6 text-sm text-red-600" role="status">
      {{ errorText(error) }}
    </p>

    <div v-if="!data && !error" class="py-16 text-center text-neutral-600 dark:text-neutral-300">
      {{ $t('message.events.loading') }}
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="event in events"
        :key="event.id"
        :to="`/${locale}/events/${event.id}`"
        :class="[
          'group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 p-5 hover:border-orange-500 transition-colors',
          event.bannerVersion
            ? 'bg-neutral-900 min-h-[13rem]'
            : 'bg-white/70 dark:bg-neutral-900/60',
        ]"
      >
        <template v-if="event.bannerVersion">
          <img
            :src="bannerSrc(event, 'card')"
            alt=""
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25"
            aria-hidden="true"
          />
        </template>
        <div class="relative flex h-full flex-col">
          <div class="flex items-center justify-between text-xs uppercase tracking-wide">
            <span class="text-orange-600 dark:text-orange-400 font-semibold">{{
              status(event.status)
            }}</span>
            <span
              v-if="event.partner === 'moza'"
              :class="
                event.bannerVersion ? 'text-white/80' : 'text-neutral-500 dark:text-neutral-400'
              "
              >MOZA × BeamMP</span
            >
          </div>
          <h2
            :class="[
              'mt-3 text-xl font-semibold',
              event.bannerVersion ? 'text-white' : 'text-neutral-900 dark:text-white',
            ]"
          >
            {{ event.title }}
          </h2>
          <p
            v-if="event.subtitle"
            :class="[
              'mt-1 text-sm',
              event.bannerVersion ? 'text-white/85' : 'text-neutral-600 dark:text-neutral-300',
            ]"
          >
            {{ event.subtitle }}
          </p>
          <div
            :class="[
              'mt-4 flex gap-4 text-sm',
              event.bannerVersion ? 'text-white/85' : 'text-neutral-600 dark:text-neutral-300',
            ]"
          >
            <span>{{ $t('message.events.ranked', { count: event.stats.players }) }}</span>
            <span>{{ $t('message.events.servers', { count: event.serverCount }) }}</span>
          </div>
          <div
            :class="[
              'mt-4 text-sm font-medium group-hover:text-orange-500',
              event.bannerVersion ? 'text-white' : 'text-neutral-900 dark:text-white',
            ]"
          >
            {{ $t('message.events.viewTop', { count: event.leaderboardSize }) }}
          </div>
        </div>
      </RouterLink>
    </div>

    <p
      v-if="data && !events.length && connected"
      class="py-16 text-center text-neutral-600 dark:text-neutral-300"
    >
      {{ $t('message.events.empty') }}
    </p>
  </section>
</template>
