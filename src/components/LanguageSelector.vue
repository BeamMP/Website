<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { LANGUAGES, loadLocaleMessages } from '@/i18n'
import { switchLocale, getCurrentLocale } from '@/utils/locale'
import { ChevronDown } from 'lucide-vue-next'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()
const isOpen = ref(false)

const currentLanguage = () => {
  return LANGUAGES[locale.value] || LANGUAGES['en']
}

const selectLanguage = async (langCode) => {
  // Load messages dynamically before switching
  try {
    await loadLocaleMessages(window.i18n, langCode)
  } catch (e) {
    // Fallback if dynamic import fails
    console.warn('Failed to load locale messages for', langCode, e)
  }
  locale.value = langCode
  localStorage.setItem('lang', langCode)
  isOpen.value = false

  // Navigate to the new locale route
  const currentPath = route.fullPath
  const newPath = switchLocale(langCode, currentPath)
  router.push(newPath)
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const getFlagUrl = (flagName) => {
  //return new URL(`../assets/flags/${flagName}.png`, import.meta.url).href
  return `/flags/${flagName}.png`
}

onMounted(async () => {
  const saved = localStorage.getItem('lang') || getCurrentLocale()
  if (saved && saved !== locale.value) {
    try {
      await loadLocaleMessages(window.i18n, saved)
      locale.value = saved
    } catch (e) {
      console.warn('Failed to hydrate saved locale', saved, e)
    }
  }
})
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800/50 hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white text-sm font-medium"
      style="height: 40px"
      :aria-expanded="isOpen"
      :aria-label="$t('message.nav.language')"
      @click="toggleDropdown"
    >
      <img
        :src="getFlagUrl(currentLanguage().flag)"
        :alt="currentLanguage().name"
        class="w-5 h-4 rounded-sm"
      />
      <span class="hidden sm:inline">{{ currentLanguage().name }}</span>
      <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50"
    >
      <div class="py-1">
        <button
          v-for="(lang, code) in LANGUAGES"
          :key="code"
          :class="[
            'w-full px-4 py-2 flex items-center gap-3 text-sm transition-colors',
            locale === code
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/70',
          ]"
          @click="selectLanguage(code)"
        >
          <img :src="getFlagUrl(lang.flag)" :alt="lang.name" class="w-5 h-4 rounded-sm" />
          <span>{{ lang.name }}</span>
          <span v-if="locale === code" class="ml-auto text-neutral-500">✓</span>
        </button>
      </div>
    </div>
  </div>
</template>
