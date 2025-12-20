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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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
    title: t('message.home.features.stable_servers.title'),
    description: t('message.home.features.stable_servers.description'),
  },
  {
    icon: Package,
    title: t('message.home.features.beamng.title'),
    description: t('message.home.features.beamng.description'),
  },
  {
    icon: Zap,
    title: t('message.home.features.standalone.title'),
    description: t('message.home.features.standalone.description'),
  },
  {
    icon: Globe,
    title: t('message.home.features.sync.title'),
    description: t('message.home.features.sync.description'),
  },
]

const communities = [
  {
    name: t('message.home.communities.racing.name'),
    icon: Rocket,
    description: t('message.home.communities.racing.description'),
    color: 'from-red-500 to-orange-500',
  },
  {
    name: t('message.home.communities.roleplay.name'),
    icon: Gamepad2,
    description: t('message.home.communities.roleplay.description'),
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: t('message.home.communities.crash.name'),
    icon: Shield,
    description: t('message.home.communities.crash.description'),
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: t('message.home.communities.freeroam.name'),
    icon: Globe,
    description: t('message.home.communities.freeroam.description'),
    color: 'from-green-500 to-emerald-500',
  },
]

const devFeatures = [
  {
    icon: Code,
    title: t('message.home.devFeatures.lua.title'),
    description: t('message.home.devFeatures.lua.description'),
    link: 'https://docs.beammp.com/' + (locale == 'en' ? '' : locale + '/') + 'scripting/mod-reference/',
  },
  {
    icon: BookOpen,
    title: t('message.home.devFeatures.docs.title'),
    description: t('message.home.devFeatures.docs.description'),
    link: 'https://docs.beammp.com' + (locale == 'en' ? '' : locale + '/'),
  },
  {
    icon: Wrench,
    title: t('message.home.devFeatures.openSource.title'),
    description: t('message.home.devFeatures.openSource.description'),
    link: 'https://github.com/BeamMP',
  },
]

const stats = [
  { label: t('message.home.metrics.active_players'), value: onlinePlayers, suffix: '+' },
  { label: t('message.home.metrics.public_servers'), value: '500', suffix: '+' },
  { label: t('message.home.metrics.all_servers'), value: '2M', suffix: '+' },
]
const faqs = [
  {
    question: t('message.home.faq["0"].question'),
    answer: t('message.home.faq["0"].answer'),
  },
  {
    question: t('message.home.faq["1"].question'),
    answer: t('message.home.faq["1"].answer'),
  },
  {
    question: t('message.home.faq["2"].question'),
    answer: t('message.home.faq["2"].answer'),
  },
  {
    question: t('message.home.faq["3"].question'),
    answer: t('message.home.faq["3"].answer'),
  },
  {
    question: t('message.home.faq["4"].question'),
    answer: t('message.home.faq["4"].answer'),
  },
  {
    question: t('message.home.faq["5"].question'),
    answer: t('message.home.faq["5"].answer'),
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
          <h1 class="text-5xl md:text-7xl font-bold leading-tight text-white" v-html="$t('message.home.hero.title', { game: 'BeamNG.drive' })"></h1>
          <p class="text-xl md:text-2xl text-neutral-200">
            {{ $t('message.home.hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="/installer/BeamMP_Installer.zip"
              download
              class="group flex items-center gap-3 bg-linear-to-r from-beammp-orange to-red-600 hover:from-red-600 hover:to-beammp-orange px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-beammp-orange/50"
            >
              <Download class="w-6 h-6" />
              {{ $t('message.home.hero.download_now') }}
            </a>
            <a
              href="/servers"
              class="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all text-white"
            >
              <Server class="w-6 h-6" />
              {{ $t('message.home.hero.browse_servers') }}
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
          <h2 class="text-4xl font-bold mb-4">{{ $t('message.home.communities.join') }}</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ $t('message.home.communities.description') }}
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
          <h2 class="text-4xl font-bold">{{ $t('message.home.find.title') }}</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ $t('message.home.find.description') }}
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-beammp-blue/20 dark:bg-beammp-blue/30 flex items-center justify-center shrink-0 mt-0.5"
              >
                <div class="w-2 h-2 bg-beammp-blue rounded-full" />
              </div>
              <div>
                <div class="font-semibold">{{ $t('message.home.find.points.custom') }}</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ $t('message.home.find.points.custom_desc') }}
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
                <div class="font-semibold">{{ $t('message.home.find.points.moderation') }}</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ $t('message.home.find.points.moderation_desc') }}
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
                <div class="font-semibold">{{ $t('message.home.find.points.global') }}</div>
                <div class="text-sm text-neutral-600 dark:text-neutral-400">
                  {{ $t('message.home.find.points.global_desc') }}
                </div>
              </div>
            </li>
          </ul>
          <a
            href="/servers"
            class="inline-flex items-center gap-2 bg-beammp-blue hover:bg-beammp-blue/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {{ $t('message.home.find.browse_all_servers') }}
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
          <h2 class="text-4xl font-bold mb-4">{{ $t('message.home.devFeatures.title') }}</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            {{ $t('message.home.devFeatures.description') }}
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
              {{ $t('message.home.devFeatures.learn_more') }}
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
            <h3 class="text-3xl font-bold">{{ $t('message.home.devFeatures.host.title') }}</h3>
            <p class="text-neutral-300">
              {{ $t('message.home.devFeatures.host.description') }}
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
                {{ $t('message.home.devFeatures.host.windows') }}
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
                {{ $t('message.home.devFeatures.host.linux') }}
                <Download class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="space-y-8 py-8">
      <h2 class="text-4xl font-bold text-center mb-12">{{ $t('message.home.faq.title') }}</h2>
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
