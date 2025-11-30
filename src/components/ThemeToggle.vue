<script setup>
import { ref, onMounted } from 'vue'
import { Sun, Moon, Monitor } from 'lucide-vue-next'

const theme = ref('system')

const setTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
}

const applyTheme = (selectedTheme) => {
  const root = document.documentElement
  if (
    selectedTheme === 'dark' ||
    (selectedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'system'
  theme.value = savedTheme
  applyTheme(savedTheme)

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.value === 'system') {
      applyTheme('system')
    }
  })
})
</script>

<template>
  <div class="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-800/50 rounded-lg p-1">
    <button
      :class="[
        'p-2 rounded transition-colors',
        theme === 'light'
          ? 'bg-white shadow-sm text-neutral-900 dark:bg-neutral-700 dark:text-white'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200',
      ]"
      title="Light mode"
      @click="setTheme('light')"
    >
      <Sun class="w-4 h-4" />
    </button>
    <button
      :class="[
        'p-2 rounded transition-colors',
        theme === 'system'
          ? 'bg-white shadow-sm text-neutral-900 dark:bg-neutral-700 dark:text-white'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200',
      ]"
      title="System theme"
      @click="setTheme('system')"
    >
      <Monitor class="w-4 h-4" />
    </button>
    <button
      :class="[
        'p-2 rounded transition-colors',
        theme === 'dark'
          ? 'bg-white shadow-sm text-neutral-900 dark:bg-neutral-700 dark:text-white'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200',
      ]"
      title="Dark mode"
      @click="setTheme('dark')"
    >
      <Moon class="w-4 h-4" />
    </button>
  </div>
</template>
