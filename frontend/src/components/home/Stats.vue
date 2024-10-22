<template>
  <div class="bg-beammp-white dark:bg-beammp-gray py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.id" class="mx-auto flex max-w-xs flex-col gap-y-4">
          <a :href="stat.link"><dt class="text-base leading-7 text-zinc-600 dark:text-white">{{ stat.name }}</dt></a>
          <dd class="order-first text-3xl font-semibold tracking-tight text-beammp-orange sm:text-5xl dark:text-beammp-orange"><AnimatedNumber :number="stat.value"></AnimatedNumber></dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import AnimatedNumber from '@/components/common/AnimatedNumber.vue'

const stats = [
  { id: 1, name: 'Players Online', value: 1500, link: '/stats' },
  { id: 2, name: 'Public Servers', value: 1200, link: '/stats' },
  { id: 3, name: 'Users', value: 760000, link: 'https://forum.beammp.com' },
  { id: 4, name: 'Discord Members', value: 190000, link: 'https://discord.com/servers/beammp-601558901657305098' },
]
</script>