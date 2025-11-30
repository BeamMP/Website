<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur sticky top-0 z-20"
  >
    <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 shrink-0" @click="closeMobileMenu">
        <!-- Light mode logo -->
        <img src="/beammp-logo.png" alt="BeamMP Logo" class="h-10 w-auto shrink-0 dark:hidden" />
        <!-- Dark mode logo -->
        <img
          src="/beammp-logo-dark.png"
          alt="BeamMP Logo"
          class="h-10 w-auto shrink-0 hidden dark:block"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <!-- Switch to mobile earlier (avoid logo crowding) -->
      <div class="hidden lg:flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://forum.beammp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  Forum
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://docs.beammp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  Docs
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  to="/communities"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  Communities
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  to="/servers"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  Servers
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <RouterLink
                  to="/stats"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  Statistics
                </RouterLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://github.com/BeamMP/BeamMP"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  GitHub
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink as-child>
                <a
                  href="https://www.patreon.com/BeamMP"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="
                    cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 dark:hover:text-white'
                    )
                  "
                >
                  Patreon
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>

      <!-- Mobile Menu Button and Theme Toggle -->
      <div class="flex lg:hidden items-center gap-2">
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
            to="/about"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            About
          </RouterLink>
          <a
            href="https://forum.beammp.com"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            Forum
          </a>
          <a
            href="https://docs.beammp.com"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            Docs
          </a>
          <RouterLink
            to="/communities"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            Communities
          </RouterLink>
          <RouterLink
            to="/servers"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            Servers
          </RouterLink>
          <RouterLink
            to="/stats"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            Statistics
          </RouterLink>
          <a
            href="https://github.com/BeamMP/BeamMP"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            GitHub
          </a>
          <a
            href="https://www.patreon.com/BeamMP"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-4 py-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            @click="closeMobileMenu"
          >
            Patreon
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
