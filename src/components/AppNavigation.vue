<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import { Menu, X } from 'lucide-vue-next'
import { getLocalizedPath } from '@/utils/locale'

const mobileMenuOpen = ref(false)
const route = useRoute()

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

// Generate localized route
function localRoute(path) {
  return getLocalizedPath(path, route.params.locale)
}
</script>

<template>
  <header
    class="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur sticky top-0 z-20"
  >
    <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink
        :to="localRoute('')"
        class="flex items-center gap-2 shrink-0 mr-4"
        @click="closeMobileMenu"
      >
        <!-- Light mode logo (black) -->
        <img
          src="/src/assets/BeamMP_blk.png"
          alt="BeamMP Logo"
          class="h-16 w-auto shrink-0 dark:hidden"
        />
        <!-- Dark mode logo (white) -->
        <img
          src="/src/assets/BeamMP_wht.png"
          alt="BeamMP Logo"
          class="h-16 w-auto shrink-0 hidden dark:block"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <!-- Switch to mobile earlier (avoid logo crowding) -->
      <div class="hidden xl:flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  :to="localRoute('communities')"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.communities') }}
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  :to="localRoute('partners')"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.partners') }}
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  :to="localRoute('servers')"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.servers') }}
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  :to="localRoute('stats')"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.statistics') }}
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://forum.beammp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="External link"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.forums') }}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://docs.beammp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="External link"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.docs') }}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://store.beammp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="External link"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.store') }}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://github.com/BeamMP/BeamMP"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="External link"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.github') }}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://www.patreon.com/BeamMP"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="External link"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  {{ $t('message.nav.patreon') }}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>

      <!-- Mobile Menu Button and Theme Toggle -->
      <div class="flex xl:hidden items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
        <button
          class="p-2 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
        >
          <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <div class="px-4 py-3 space-y-1">
          <RouterLink
            :to="localRoute('communities')"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.communities') }}
          </RouterLink>
          <RouterLink
            :to="localRoute('partners')"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.partners') }}
          </RouterLink>
          <RouterLink
            :to="localRoute('servers')"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.servers') }}
          </RouterLink>
          <RouterLink
            :to="localRoute('stats')"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.statistics') }}
          </RouterLink>
          <a
            href="https://forum.beammp.com"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.forums') }}
          </a>
          <a
            href="https://docs.beammp.com"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.docs') }}
          </a>
          <a
            href="https://github.com/BeamMP/BeamMP"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.github') }}
          </a>
          <a
            href="https://www.patreon.com/BeamMP"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            {{ $t('message.nav.patreon') }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
