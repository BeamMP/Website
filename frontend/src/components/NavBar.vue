<template>
  <Disclosure as="nav" class="bg-white dark:bg-beammp-gray shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-beammp-orange hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-beammp-orange">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <a href="/">
              <span class="sr-only">BeamMP</span>
              <img class="w-auto block dark:hidden" src="../assets/BeamMP_blk.png" alt="BeamMP" style="height: 80px;"/>
              <img class="w-auto dark:block hidden" src="../assets/BeamMP_wht.png" alt="BeamMP" style="height: 80px;"/>
            </a>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-beammp-orange text-zinc-900", Default: "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700" -->
            <a 
              v-for="(item, index) in updatedNavItems" 
              :key="index" 
              :href="item.href"
              :class="['inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium', 
                      item.active 
                        ? 'border-beammp-orange text-beammp-orange' 
                        : 'border-transparent text-zinc-500 dark:text-zinc-300 hover:border-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-100']"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Notifications dropdown -->
          <!--<button type="button" class="relative rounded-full bg-white p-1 text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-beammp-orange focus:ring-offset-2">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>-->

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3" v-if="false">
            <div>
              <MenuButton class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-beammp-orange focus:ring-offset-2">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-zinc-100' : '', 'block px-4 py-2 text-sm text-zinc-700']">Your Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-zinc-100' : '', 'block px-4 py-2 text-sm text-zinc-700']">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-zinc-100' : '', 'block px-4 py-2 text-sm text-zinc-700']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <div class="flex-shrink-0" v-else>
            <button type="button" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-beammp-orange px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beammp-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beammp-orange ml-3">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-4 pt-2">
        <!-- Current: "bg-beammp-orange border-beammp-orange text-beammp-orange", Default: "border-transparent text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-700" -->
        <DisclosureButton
          v-for="(item, index) in updatedNavItems"
          :key="index"
          as="a"
          :href="item.href"
          :class="['block border-l-4 py-2 pl-3 pr-4 text-base font-medium', 
                  item.active 
                    ? 'border-beammp-orange text-beammp-orange' 
                    : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300', 
                  item.hover 
                    ? 'hover:border-beammp-orange hover:bg-beammp-orange hover:text-zinc-700' 
                    : '']"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
export default {
  computed: {
    updatedNavItems() {
      // Check the current path and set 'active' accordingly
      return this.navItems.map(item => ({
        ...item,
        active: this.$route.path === item.href
      }));
    }
  },
  data() {
    return {
      navItems: [
        { name: 'Forum', href: 'https://forum.beammp.com/', active: false },
        { name: 'Docs', href: 'https://docs.beammp.com/', active: false },
        { name: 'Stats', href: '/stats', active: false },
        { name: 'Servers', href: '/servers', active: false },
        { name: 'Hosting', href: '/hosting', active: false },
        { name: 'Events', href: 'https://forum.beammp.com/c/important/events/25', active: false },
        { name: 'Store', href: 'https://store.beammp.com/', active: false },
        { name: 'GitHub', href: 'https://github.com/BeamMP', active: false },
        { name: 'Patreon', href: 'https://patreon.com/BeamMP', active: false },
      ],
       user: [

       ]
    };
  },
  methods: {
    setTheme(theme) {
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'system') {
        document.documentElement.classList.remove('dark');
      }
    },
  },
  mounted() {
    console.log(this.user)
  }
};
</script>

<script setup>
import ThemeToggle from './common/ThemeToggle.vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
</script>