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
    link:
      'https://docs.beammp.com/' +
      // eslint-disable-next-line no-undef
      (locale == 'en' ? '' : locale + '/') +
      'scripting/mod-reference/',
  },
  {
    icon: BookOpen,
    title: t('message.home.devFeatures.docs.title'),
    description: t('message.home.devFeatures.docs.description'),
    // eslint-disable-next-line no-undef
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
          src="/landing-1.jpg"
          alt="BeamMP Gameplay"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-linear-to-b from-black/30 dark:from-black/70 via-black/40 dark:via-black/60 to-neutral-0 dark:to-neutral-950"
        />
        <!--<div class="absolute inset-0 bg-linear-to-r from-beammp-blue/20 to-beammp-orange/20" />-->
      </div>

      <!-- Hero Content -->
      <div class="relative max-w-6xl mx-auto px-4 py-32 md:py-40">
        <div class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1
            class="text-5xl md:text-7xl font-bold leading-tight text-white"
            v-html="$t('message.home.hero.title', { game: 'BeamNG.drive' })"
          />
          <p class="text-xl md:text-2xl text-neutral-200">
            {{ $t('message.home.hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="/installer/BeamMP_Installer.zip"
              download
              class="group flex items-center gap-3 bg-linear-to-r from-beammp-orange to-red-600 hover:from-red-600 hover:to-beammp-orange px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-beammp-orange/50 text-white"
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
        <h2 class="text-4xl font-bold text-center mb-12">
          {{ $t('message.home.why_choose_beammp') }}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            :style="{ animationDelay: `${index * 100}ms` }"
            class="group bg-white/70 border border-neutral-200 rounded-xl p-6 hover:border-beammp-blue hover:shadow-xl transition-all animate-fade-in-up dark:bg-neutral-900/50 dark:border-neutral-800 dark:hover:border-beammp-orange"
          >
            <component
              :is="feature.icon"
              class="w-10 h-10 text-beammp-orange mb-4 group-hover:scale-110 transition-transform dark:text-beammp-orange"
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

        <!-- Hosting Section -->
        <div class="mt-12 space-y-8">
          <!-- Hosting Partners -->
          <div
            class="bg-linear-to-br from-beammp-orange to-beammp-orange/80 dark:from-beammp-orange/90 dark:to-beammp-orange/70 rounded-xl p-8 md:p-12 shadow-lg"
          >
            <div class="max-w-3xl mx-auto text-center space-y-6">
              <h3 class="text-3xl font-bold text-white">
                {{ $t('message.home.devFeatures.host.title') }}
              </h3>
              <p class="text-white/95 dark:text-white/90">
                {{ $t('message.home.devFeatures.host.partners.description') }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <RouterLink
                  :to="`/${$i18n.locale}/partners`"
                  class="flex items-center justify-center gap-3 bg-white text-beammp-orange hover:bg-neutral-50 dark:bg-white dark:hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {{ $t('message.home.devFeatures.host.partners.view_partners') }}
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Self-Hosting Option -->
          <div
            class="bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950 rounded-xl p-8 md:p-12 border border-neutral-300 dark:border-neutral-700 shadow-md"
          >
            <div class="max-w-3xl mx-auto text-center space-y-6">
              <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">
                {{ $t('message.home.devFeatures.host.self_host.title') }}
              </h3>
              <p class="text-neutral-700 dark:text-neutral-300">
                {{ $t('message.home.devFeatures.host.description') }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="https://github.com/BeamMP/BeamMP-Server/releases/latest/download/BeamMP-Server.exe"
                  class="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white border border-neutral-600 dark:border-neutral-600 px-6 py-3 rounded-lg font-semibold transition-all"
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
                  class="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white border border-neutral-600 dark:border-neutral-600 px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z"
                    />
                  </svg>
                  {{ $t('message.home.devFeatures.host.linux') }}
                  <Download class="w-5 h-5" />
                </a>
              </div>
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
