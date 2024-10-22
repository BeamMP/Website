<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">Proudly partnered with trusted hosting companies</h2>
      <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <a v-for="partner in partners" :key="partner.id" :href="partner.link"><img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" :src="partner.logo" :alt="partner.alt" width="158" height="48" /></a>
      </div>
    </div>
  </div>
</template>

<script setup>
const partners = [
  { id: 1, logo: 'src/assets/partners/horizon_hosting-logo.png', alt: 'Horizon Hosting', link: 'https://billing.horizonnetworks.uk/store/beammp-server-hosting' },
  { id: 2, logo: 'src/assets/partners/pedalhost-logo.svg', alt: 'PedalHost', link: 'https://pedal.host/' },
]
</script>