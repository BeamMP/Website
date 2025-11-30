<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="min-h-[60vh] flex items-center justify-center">
    <div
      class="text-center px-6 py-10 sm:px-8 sm:py-12 rounded-xl border border-neutral-200/30 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm space-y-4"
    >
      <div class="flex items-center justify-center gap-3">
        <span
          class="inline-flex items-center justify-center rounded-full bg-orange-600/10 text-orange-600 dark:text-orange-400 w-12 h-12 text-xl font-bold"
          >404</span
        >
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Page Not Found</h1>
      </div>

      <p class="text-neutral-600 dark:text-neutral-300 max-w-prose mx-auto">
        The page you requested doesn’t exist. It may have been moved or removed.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <RouterLink
          to="/"
          class="inline-flex px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium"
        >
          Return Home
        </RouterLink>
        <RouterLink
          to="/servers"
          class="inline-flex px-4 py-2 rounded-md border border-neutral-300/60 dark:border-neutral-700/60 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Browse Servers
        </RouterLink>
      </div>
    </div>
  </section>
</template>
