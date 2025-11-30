<script setup>
import { RouterView } from 'vue-router'
import AppNavigation from '@/components/AppNavigation.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
  >
    <AppNavigation />
    <main class="flex-1 w-full">
      <div class="max-w-6xl mx-auto px-4 py-10">
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
