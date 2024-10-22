<template>
  <div class="ml-4 flow-root lg:ml-6">
    <button type="button" @click="toggleTheme" class="group -m-2 flex items-center p-2">
      <SunIcon class="h-6 w-6 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500 block dark:hidden" aria-hidden="true" />
      <MoonIcon class="h-6 w-6 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500 dark:block hidden" aria-hidden="true" />
      <span class="sr-only ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
    </button>
  </div>
</template>

<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
</script>

<script>
export default {
  data() {
    return {
      isDark: false,
    };
  },
  created() {
    // Check for initial theme preference in localStorage (fallback)
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
      this.isDark = preferredTheme === 'dark';
    } else {
      // Check for system preference using window.matchMedia
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDark.matches) {
        this.isDark = true;
      }

      // Add event listener for preference changes (optional)
      prefersDark.addEventListener('change', (e) => {
        this.isDark = e.matches;
        this.toggleTheme();
      });
    }
    this.updateTheme()
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      // Update document body class
      document.body.classList.toggle('dark');
      // Persist preference in localStorage
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    updateTheme() {
      if (this.isDark)
        document.body.classList.toggle('dark');

      console.log(`Theme: ${this.isDark}`)
    }
  },
};
</script>