<script setup>
import { ExternalLink, Users, Trophy, Gamepad2, Shield, MapPin } from 'lucide-vue-next'

const communities = [
  {
    name: 'BeamMP Racing League',
    description:
      'Competitive racing with weekly tournaments, leaderboards, and professional organization. Join racers from around the world in sanctioned events.',
    image: '/beammpservers.png', // Placeholder - replace with actual community images
    category: 'Racing',
    icon: Trophy,
    stats: {
      members: '2,500+',
      servers: '12',
      region: 'Global',
    },
    features: ['Weekly tournaments', 'ELO ranking system', 'Custom race tracks', 'Prize pools'],
    links: {
      website: 'https://forum.beammp.com',
      discord: 'https://discord.gg/beammp',
    },
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'CityRP Network',
    description:
      'Immersive roleplay servers featuring police, emergency services, and civilian roles. Experience realistic city life with custom jobs and economy.',
    image: '/beammpservers.png',
    category: 'Roleplay',
    icon: Gamepad2,
    stats: {
      members: '5,000+',
      servers: '8',
      region: 'NA & EU',
    },
    features: [
      'Custom economy system',
      'Police & EMS roles',
      'Business ownership',
      'Active moderation',
    ],
    links: {
      website: 'https://forum.beammp.com',
      discord: 'https://discord.gg/beammp',
    },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Destruction Derby Hub',
    description:
      'Pure chaos and destruction! Join epic demolition derbies, crash competitions, and vehicle destruction events with custom arenas.',
    image: '/beammpservers.png',
    category: 'Derby',
    icon: Shield,
    stats: {
      members: '1,800+',
      servers: '6',
      region: 'Global',
    },
    features: ['Custom derby arenas', 'Damage scoring system', 'Weekly events', 'Vehicle variety'],
    links: {
      website: 'https://forum.beammp.com',
      discord: 'https://discord.gg/beammp',
    },
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Free Roam Paradise',
    description:
      'Casual multiplayer cruising and exploration. Meet new friends, show off your vehicles, and explore maps together in a relaxed environment.',
    image: '/beammpservers.png',
    category: 'Free Roam',
    icon: MapPin,
    stats: {
      members: '3,200+',
      servers: '15',
      region: 'Worldwide',
    },
    features: ['No pressure gameplay', 'Custom vehicle packs', 'Social events', 'Map exploration'],
    links: {
      website: 'https://forum.beammp.com',
      discord: 'https://discord.gg/beammp',
    },
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Drift United',
    description:
      'Dedicated drifting community with custom drift tracks, tandem sessions, and competitions. Perfect your technique with experienced drifters.',
    image: '/beammpservers.png',
    category: 'Drifting',
    icon: Trophy,
    stats: {
      members: '1,500+',
      servers: '5',
      region: 'Global',
    },
    features: ['Drift competitions', 'Tandem sessions', 'Scoring system', 'Drift tutorials'],
    links: {
      website: 'https://forum.beammp.com',
      discord: 'https://discord.gg/beammp',
    },
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Offroad Expeditions',
    description:
      'Adventure offroad with trail runs, rock crawling, and expedition challenges. Explore rugged terrain with fellow offroad enthusiasts.',
    image: '/beammpservers.png',
    category: 'Offroad',
    icon: MapPin,
    stats: {
      members: '900+',
      servers: '4',
      region: 'NA & EU',
    },
    features: ['Trail expeditions', 'Rock crawling', 'Custom terrain', 'Vehicle builds'],
    links: {
      website: 'https://forum.beammp.com',
      discord: 'https://discord.gg/beammp',
    },
    color: 'from-amber-600 to-yellow-600',
  },
]
</script>

<template>
  <div class="space-y-16">
    <!-- Page Header -->
    <section class="text-center space-y-4">
      <h1 class="text-5xl md:text-6xl font-bold">
        <span class="text-beammp-orange">BeamMP</span> Communities
      </h1>
      <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
        Discover thriving communities built around BeamMP. From competitive racing leagues to casual
        free roam sessions, find your perfect group to play with.
      </p>
    </section>

    <!-- Communities Grid -->
    <section class="space-y-8">
      <div
        v-for="(community, index) in communities"
        :key="index"
        :style="{ animationDelay: `${index * 100}ms` }"
        class="group bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all animate-fade-in-up"
      >
        <div class="grid md:grid-cols-5 gap-6">
          <!-- Community Image -->
          <div class="md:col-span-2 relative overflow-hidden">
            <div :class="`absolute inset-0 bg-linear-to-br ${community.color} opacity-20`" />
            <img
              :src="community.image"
              :alt="community.name"
              class="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-4 left-4">
              <span
                class="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ community.category }}
              </span>
            </div>
          </div>

          <!-- Community Info -->
          <div class="md:col-span-3 p-6 md:p-8 space-y-6">
            <!-- Header -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <component :is="community.icon" class="w-10 h-10 text-beammp-orange shrink-0" />
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold">{{ community.name }}</h2>
                  <p class="text-neutral-600 dark:text-neutral-400 mt-1">
                    {{ community.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                <Users class="w-5 h-5 mx-auto mb-1 text-beammp-blue dark:text-blue-400" />
                <div class="font-bold">{{ community.stats.members }}</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">Members</div>
              </div>
              <div class="text-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                <component :is="Shield" class="w-5 h-5 mx-auto mb-1 text-beammp-orange" />
                <div class="font-bold">{{ community.stats.servers }}</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">Servers</div>
              </div>
              <div class="text-center p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                <MapPin class="w-5 h-5 mx-auto mb-1 text-beammp-green dark:text-green-400" />
                <div class="font-bold">{{ community.stats.region }}</div>
                <div class="text-xs text-neutral-600 dark:text-neutral-400">Region</div>
              </div>
            </div>

            <!-- Features -->
            <div>
              <h3
                class="font-semibold mb-3 text-sm uppercase tracking-wide text-neutral-600 dark:text-neutral-400"
              >
                Features
              </h3>
              <ul class="grid grid-cols-2 gap-2">
                <li
                  v-for="(feature, idx) in community.features"
                  :key="idx"
                  class="flex items-center gap-2 text-sm"
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-beammp-orange" />
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Links -->
            <div class="flex gap-3 pt-2">
              <a
                v-if="community.links.website"
                :href="community.links.website"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 bg-beammp-blue hover:bg-beammp-blue/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Visit Website
                <ExternalLink class="w-4 h-4" />
              </a>
              <a
                v-if="community.links.discord"
                :href="community.links.discord"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                  />
                </svg>
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="text-center py-16 bg-neutral-50 dark:bg-neutral-900/30 -mx-4 px-4 rounded-xl">
      <div class="max-w-2xl mx-auto space-y-6">
        <h2 class="text-3xl md:text-4xl font-bold">Want to Start Your Own Community?</h2>
        <p class="text-lg text-neutral-600 dark:text-neutral-400">
          Host your own BeamMP server and build a community around your favorite game modes
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="https://docs.beammp.com/server/create-a-server/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-beammp-orange hover:bg-beammp-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <component :is="Shield" class="w-5 h-5" />
            Server Setup Guide
          </a>
          <a
            href="https://discord.gg/beammp"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Users class="w-5 h-5" />
            Join Our Discord
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out backwards;
}
</style>
