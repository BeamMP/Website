<script setup>
import { ref, onMounted } from 'vue'
import {
  Download,
  Zap,
  Globe,
  Server,
  Package,
  Code,
  BookOpen,
  Wrench,
  Gamepad2,
  Shield,
  Rocket,
} from 'lucide-vue-next'

const onlinePlayers = ref('...')
const onlineServers = ref('...')
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('https://backend.beammp.com/metrics')
    // beammp_players_online 2783 beammp_public_servers 2959 beammp_all_servers 4663
    const data = await response.text()
    const values = data.split(' ')
    if (values.length >= 2) {
      onlinePlayers.value = values[1]
      onlineServers.value = values[3]
    }
  } catch {
    onlinePlayers.value = 'N/A'
    onlineServers.value = 'N/A'
  } finally {
    isLoading.value = false
  }
})

const features = [
  {
    icon: Server,
    title: 'Stable Servers',
    description:
      'BeamMP allows for stable servers, with a variety of servers located across the globe.',
  },
  {
    icon: Package,
    title: 'BeamNG.drive',
    description:
      "BeamMP uses the same maps, vehicles & mods so you don't need to learn anything new!",
  },
  {
    icon: Zap,
    title: 'Standalone',
    description:
      "BeamMP doesn't modify your original installation, so you can play either singleplayer or multiplayer.",
  },
  {
    icon: Globe,
    title: 'Sync Quality',
    description:
      'BeamMP updates your vehicle position ~100 times per second, allowing for a smooth overall experience.',
  },
]

const communities = [
  {
    name: 'Racing Communities',
    icon: Rocket,
    description: 'Competitive racing leagues and time trials with players worldwide',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Roleplay Servers',
    icon: Gamepad2,
    description: 'Immersive roleplay experiences from police chases to delivery services',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Crash & Derby',
    icon: Shield,
    description: 'Demolition derbies and destruction-focused gameplay modes',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Free Roam',
    icon: Globe,
    description: 'Casual multiplayer sessions exploring maps with friends',
    color: 'from-green-500 to-emerald-500',
  },
]

const devFeatures = [
  {
    icon: Code,
    title: 'Lua API',
    description: 'Powerful server-side Lua scripting for custom game modes and features',
    link: 'https://docs.beammp.com/scripting/mod-reference/',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Comprehensive guides and API references for server development',
    link: 'https://docs.beammp.com',
  },
  {
    icon: Wrench,
    title: 'Open Source',
    description: 'Community-driven development with source available on GitHub',
    link: 'https://github.com/BeamMP',
  },
]

const stats = [
  { label: 'Active Players', value: onlinePlayers, suffix: '+' },
  { label: 'Global Servers', value: '500', suffix: '+' },
  { label: 'Total Downloads', value: '2M', suffix: '+' },
]

const faqs = [
  {
    question: 'The server list is not showing up!',
    answer:
      'Try restarting BeamMP as this can sometimes happen. If this fails to fix your issue please create a topic on our forum or visit the support channel on our discord.',
  },
  {
    question: "How do I open a ticket in case something doesn't work or I have questions?",
    answer:
      'Please check the #how-to-use channel in Discord and on our forum. Please give an accurate description of what you have done so the support team will help you in a fast and effective way.',
  },
  {
    question: "Help! I'm getting error codes",
    answer:
      'Please head over to our forum and see if anyone has had the issue before. It is likely that someone else has at some point and therefore there will also probably be a solution posted with it too in the replies. Alternatively visit our discord where the larger portion of community is currently based.',
  },
  {
    question: 'Does this work with pirated versions of BeamNG.drive?',
    answer:
      "We don't know if it works with pirated versions of BeamNG.drive, but we will not provide any support to non legit copies of the game. Nor will we change to support it.",
  },
  {
    question: 'How do I host a server?',
    answer:
      'The server files required for hosting your own server can be found at the top of this page below the client download. You will also require an authentication key which can be found from keymaster. Further information around the setup can be found on our wiki.',
  },
  {
    question: 'Can I use mods?',
    answer:
      'Mods are supported. These are installed on the server. See our wiki for more information.',
  },
]
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section with Background -->
    <section class="relative -mt-10 mb-16 w-screen -ml-[50vw] left-1/2">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 overflow-hidden">
        <img
          src="/beamng-mp-landing.png"
          alt="BeamMP Gameplay"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-neutral-950 dark:to-neutral-950"
        />
        <div class="absolute inset-0 bg-linear-to-r from-beammp-blue/20 to-beammp-orange/20" />
      </div>

      <!-- Hero Content -->
      <div class="relative max-w-6xl mx-auto px-4 py-32 md:py-40">
        <div class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 class="text-5xl md:text-7xl font-bold leading-tight text-white">
            Multiplayer for <span class="text-beammp-orange">BeamNG.drive</span>
          </h1>
          <p class="text-xl md:text-2xl text-neutral-200">
            Experience the ultimate soft-body physics with friends. Race, roleplay, or just cruise
            together.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="/installer/BeamMP_Installer.zip"
              download
              class="group flex items-center gap-3 bg-linear-to-r from-beammp-orange to-red-600 hover:from-red-600 hover:to-beammp-orange px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-beammp-orange/50"
            >
              <Download class="w-6 h-6" />
              Download Now
            </a>
            <a
              href="/servers"
              class="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all text-white"
            >
              <Server class="w-6 h-6" />
              Browse Servers
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="text-center animate-fade-in-up"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="text-3xl md:text-4xl font-bold text-beammp-orange">
                <span :class="{ 'animate-pulse': stat.value === onlinePlayers && isLoading }">
                  {{ stat.value }} </span
                >{{ stat.suffix }}
              </div>
              <div class="text-sm md:text-base text-neutral-300 mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12">Why Choose BeamMP?</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="group bg-white/70 border border-neutral-200 rounded-xl p-6 hover:border-beammp-blue hover:shadow-xl transition-all animate-fade-in-up dark:bg-neutral-900/50 dark:border-neutral-800 dark:hover:border-beammp-orange"
          >
            <component
              :is="feature.icon"
              class="w-10 h-10 text-beammp-blue mb-4 group-hover:scale-110 transition-transform dark:text-blue-400"
            />
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Types Section -->
    <section class="py-16 px-4 bg-neutral-50 dark:bg-neutral-900/30">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Join a Thriving Community</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            Discover diverse gameplay experiences across hundreds of unique servers
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(community, index) in communities"
            :key="index"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="group relative bg-white dark:bg-neutral-900 rounded-xl p-6 overflow-hidden hover:shadow-2xl transition-all animate-fade-in-up border border-neutral-200 dark:border-neutral-800"
          >
            <div
              :class="`absolute inset-0 bg-linear-to-br ${community.color} opacity-0 group-hover:opacity-10 transition-opacity`"
            />
            <component
              :is="community.icon"
              class="w-12 h-12 mb-4 text-neutral-700 dark:text-neutral-300 group-hover:scale-110 transition-transform"
            />
            <h3 class="text-xl font-bold mb-2">{{ community.name }}</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              {{ community.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Server Showcase -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6 animate-fade-in order-2 md:order-1">
          <h2 class="text-4xl font-bold">Find Your Perfect Server</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            Browse hundreds of active servers with different game modes, mods, and communities. From
            competitive racing to casual free roam, there's something for everyone.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-beammp-blue/20 dark:bg-beammp-blue/30 flex items-center justify-center shrink-0 mt-0.5"
              >
                <div class="w-2 h-2 bg-beammp-blue rounded-full" />
              </div>
              <div>
                <div class="font-semibold">Custom Game Modes</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  Unique experiences created by the community
                </div>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-beammp-orange/20 dark:bg-beammp-orange/30 flex items-center justify-center shrink-0 mt-0.5"
              >
                <div class="w-2 h-2 bg-beammp-orange rounded-full" />
              </div>
              <div>
                <div class="font-semibold">Active Moderation</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  Safe and friendly gaming environment
                </div>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-beammp-green/20 dark:bg-beammp-green/30 flex items-center justify-center shrink-0 mt-0.5"
              >
                <div class="w-2 h-2 bg-beammp-green rounded-full" />
              </div>
              <div>
                <div class="font-semibold">Global Network</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  Servers in every region for low latency
                </div>
              </div>
            </li>
          </ul>
          <a
            href="/servers"
            class="inline-flex items-center gap-2 bg-beammp-blue hover:bg-beammp-blue/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse All Servers
            <Server class="w-5 h-5" />
          </a>
        </div>
        <div
          class="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl animate-slide-in order-1 md:order-2"
        >
          <img src="/beammpservers.png" alt="BeamMP Server Browser" class="w-full h-auto" />
        </div>
      </div>
    </section>

    <!-- Developer Section -->
    <section class="py-16 px-4 bg-neutral-50 dark:bg-neutral-900/30">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Built for Developers</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            Create custom game modes, host your own server, and contribute to the project
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <a
            v-for="(dev, index) in devFeatures"
            :key="index"
            :href="dev.link"
            target="_blank"
            rel="noopener noreferrer"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 hover:border-beammp-orange hover:shadow-xl transition-all animate-fade-in-up"
          >
            <component
              :is="dev.icon"
              class="w-12 h-12 text-beammp-orange mb-4 group-hover:scale-110 transition-transform"
            />
            <h3 class="text-2xl font-bold mb-3">{{ dev.title }}</h3>
            <p class="text-neutral-600 dark:text-neutral-400">{{ dev.description }}</p>
            <div
              class="mt-4 text-beammp-blue dark:text-beammp-orange font-semibold flex items-center gap-2"
            >
              Learn More
              <svg
                class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        </div>

        <!-- Download Server Section -->
        <div
          class="mt-12 bg-linear-to-br from-neutral-800 to-neutral-900 dark:from-neutral-950 dark:to-neutral-900 rounded-xl p-8 md:p-12 text-white"
        >
          <div class="max-w-3xl mx-auto text-center space-y-6">
            <h3 class="text-3xl font-bold">Ready to Host Your Own Server?</h3>
            <p class="text-neutral-300">
              Download the server files and create your own unique BeamMP experience
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://github.com/BeamMP/BeamMP-Server/releases/latest/download/BeamMP-Server.exe"
                class="flex items-center justify-center gap-3 bg-beammp-orange hover:bg-beammp-orange/90 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"
                  />
                </svg>
                Windows Server
                <Download class="w-5 h-5" />
              </a>
              <a
                href="https://github.com/BeamMP/BeamMP-Server/releases/latest"
                class="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.74-.348 2.642.893 13.117 23.57 6.98 21.94-5.859-.932-7.344-4.59-9.256-7.094-9.547-.31-.036-.623-.05-.935-.05-.007 0-.015 0-.023 0-.007 0-.015 0-.023 0z"
                  />
                </svg>
                Linux Builds
                <Download class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="space-y-8 py-8">
      <h2 class="text-4xl font-bold text-center mb-12">FAQ</h2>
      <div class="space-y-6 max-w-4xl mx-auto">
        <details
          v-for="(faq, index) in faqs"
          :key="index"
          class="group bg-white/70 border border-neutral-200 rounded-lg p-6 hover:border-beammp-blue/50 transition-all animate-fade-in-up dark:bg-neutral-900/50 dark:border-neutral-800"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <summary
            class="text-lg font-semibold cursor-pointer list-none flex items-center justify-between"
          >
            <span>{{ faq.question }}</span>
            <svg
              class="w-5 h-5 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <p class="mt-4 text-neutral-600 dark:text-neutral-400">{{ faq.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out backwards;
}
</style>
