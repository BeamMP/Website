<script setup></script>

<template>
  <section class="max-w-6xl mx-auto px-4 py-10">
    <!-- Page Title -->
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {{ $t('message.about.title') }}
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl">
        {{ $t('message.about.description') }}
      </p>
    </div>

    <!-- Creator's Note -->
    <div
      class="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-6 mb-10"
    >
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
        {{ $t('message.about.note.title') }}
      </h2>
      <div class="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          {{ $t('message.about.note.content') }}
        </p>
      </div>
    </div>

    <!-- What is BeamMP -->
    <div class="grid gap-8 md:grid-cols-2 mb-10">
      <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          {{ $t('message.about.provides.title') }}
        </h3>
        <ul class="space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>{{ $t('message.about.provides.points.0') }}</li>
          <li>{{ $t('message.about.provides.points.1') }}</li>
          <li>{{ $t('message.about.provides.points.2') }}</li>
          <li>{{ $t('message.about.provides.points.3') }}</li>
        </ul>
      </div>
      <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          {{ $t('message.about.project.title') }}
        </h3>
        <ul class="space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>{{ $t('message.about.project.points.0') }}</li>
          <li>{{ $t('message.about.project.points.1') }}</li>
          <li>{{ $t('message.about.project.points.2') }}</li>
          <li>{{ $t('message.about.project.points.3') }}</li>
        </ul>
      </div>
    </div>

    <!-- How to Get Involved -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 mb-10">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
        {{ $t('message.about.get_involved.title') }}
      </h3>
      <p class="text-neutral-700 dark:text-neutral-300 mb-4">
        {{ $t('message.about.get_involved.description') }}
        <a
          href="https://www.patreon.com/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-500 hover:underline"
          >{{ $t('message.about.get_involved.patreon') }}</a
        >.
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="https://forum.beammp.com"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >{{ $t('message.about.get_involved.forum') }}</a
        >
        <a
          href="https://docs.beammp.com"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >{{ $t('message.about.get_involved.docs') }}</a
        >
        <a
          href="https://github.com/BeamMP/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >{{ $t('message.about.get_involved.github') }}</a
        >
        <a
          href="https://discord.gg/beammp"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >{{ $t('message.about.get_involved.discord') }}</a
        >
        <a
          href="https://www.patreon.com/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          {{ $t('message.about.get_involved.patreon') }}
        </a>
      </div>
    </div>

    <!-- Funding & Sustainability -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 mb-10">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
        {{ $t('message.about.funding.title') }}
      </h3>
      <p class="text-neutral-700 dark:text-neutral-300 mb-4">
        {{ $t('message.about.funding.description') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="https://www.patreon.com/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          {{ $t('message.about.funding.patreon') }}
        </a>
        <a
          href="https://github.com/BeamMP/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
        >
          {{ $t('message.about.funding.learn') }}
        </a>
      </div>
    </div>

    <!-- Credits & Acknowledgements -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
        {{ $t('message.about.credits.title') }}
      </h3>
      <p class="text-neutral-700 dark:text-neutral-300">
        {{ $t('message.about.credits.description') }}
      </p>
      <p class="text-neutral-700 dark:text-neutral-300 mt-4">
        {{ $t('message.about.credits.desc_2') }}
      </p>
      <p class="text-neutral-700 dark:text-neutral-300 mt-4">
        {{ $t('message.about.credits.desc_3') }}
      </p>
      <ul class="list-disc list-inside text-neutral-700 dark:text-neutral-300 mt-2 space-y-1">
        <li>{{ $t('message.about.credits.mentions.0') }}</li>
        <li>{{ $t('message.about.credits.mentions.1') }}</li>
        <li>{{ $t('message.about.credits.mentions.2') }}</li>
        <li>{{ $t('message.about.credits.mentions.3') }}</li>
        <li>{{ $t('message.about.credits.mentions.4') }}</li>
      </ul>
      <p class="text-neutral-700 dark:text-neutral-300 mt-4">
        {{ $t('message.about.credits.thank_you') }}
      </p>
    </div>
  </section>
</template>
