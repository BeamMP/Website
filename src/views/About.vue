<script setup></script>

<template>
  <section class="max-w-6xl mx-auto px-4 py-10">
    <!-- Page Title -->
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        About BeamMP
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl">
        BeamMP brings multiplayer to BeamNG.drive. It’s built by and for the community, focusing on
        stability, performance, and an authentic driving experience shared with friends.
      </p>
    </div>

    <!-- Creator's Note -->
    <div
      class="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-6 mb-10"
    >
      <h2 class="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
        A Note from the Creator
      </h2>
      <div class="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          BeamMP started with a simple idea: I want to play BeamNG.drive with my brothers. What
          began as an experiment quickly grew into a community-driven project focused on
          implementing multiplayer, and fun. We care deeply about trying to provide the best
          experience possible, and making it easy for players to hop in and enjoy driving together.
        </p>
        <p>
          The project is open to contributors of all skill levels. Whether you write code, moderate
          a server, design scenarios, or help others get set up—your efforts are part of what makes
          BeamMP thrive. Thank you for being here and helping us build something special.
        </p>
      </div>
    </div>

    <!-- What is BeamMP -->
    <div class="grid gap-8 md:grid-cols-2 mb-10">
      <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
          What BeamMP Provides
        </h3>
        <ul class="space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>Multiplayer sessions for BeamNG.drive with server browser and filters</li>
          <li>Server-side moderation tools and configuration options</li>
          <li>Mod support with protection for paid content</li>
          <li>Active community channels (Forum, Discord) for help and collaboration</li>
        </ul>
      </div>
      <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Project Values</h3>
        <ul class="space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>Community-first: decisions guided by real player/server needs</li>
          <li>
            Reliability: prioritizing stability, sync fidelity, and performance where possible
          </li>
          <li>Openness: welcoming contributions, feedback, and transparency</li>
          <li>Safety: promoting fair play and respectful interactions</li>
        </ul>
      </div>
    </div>

    <!-- How to Get Involved -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 mb-10">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Get Involved</h3>
      <p class="text-neutral-700 dark:text-neutral-300 mb-4">
        There are many ways to participate—join discussions, report issues, contribute code, or help
        to support the project financially via
        <a
          href="https://www.patreon.com/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-500 hover:underline"
          >Patreon</a
        >.
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="https://forum.beammp.com"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >Forum</a
        >
        <a
          href="https://docs.beammp.com"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >Docs</a
        >
        <a
          href="https://github.com/BeamMP/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >GitHub</a
        >
        <a
          href="https://discord.gg/beammp"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
          >Discord</a
        >
        <a
          href="https://www.patreon.com/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          Patreon
        </a>
      </div>
    </div>

    <!-- Funding & Sustainability -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 mb-10">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
        Funding &amp; Sustainability
      </h3>
      <p class="text-neutral-700 dark:text-neutral-300 mb-4">
        BeamMP relies on community support. Donations help cover infrastructure, bandwidth, tooling,
        and development time. If you value the project and want to help it grow, please consider
        supporting us.
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="https://www.patreon.com/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          Support on Patreon
        </a>
        <a
          href="https://github.com/BeamMP/BeamMP"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
        >
          Learn more on GitHub
        </a>
      </div>
    </div>

    <!-- Credits & Acknowledgements -->
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
      <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
        Credits &amp; Acknowledgements
      </h3>
      <p class="text-neutral-700 dark:text-neutral-300">
        BeamMP is maintained by the Mod Team and an incredible group of community contributors. We’d
        also like to thank server owners, mod creators, testers, and everyone reporting issues—your
        time and passion keep the project moving forward.
      </p>
      <p class="text-neutral-700 dark:text-neutral-300 mt-4">
        Special thanks to the BeamNG.drive developers for creating such an amazing platform that
        makes projects like BeamMP possible in the first place.
      </p>
      <p class="text-neutral-700 dark:text-neutral-300 mt-4">
        Also a heartfelt thank you to the following current and former community members for their
        significant contributions to BeamMP over the years:
      </p>
      <ul class="list-disc list-inside text-neutral-700 dark:text-neutral-300 mt-2 space-y-1">
        <li>
          Jojos38 (Co-Founder) - for their work early on with designing everything to help make the
          idea become a reality
        </li>
        <li>Jetta (jetta.cat) - for the logo design and creation.</li>
        <li>Anonymous275 & Lionkor - for their work in rebuilding the project in C++.</li>
        <li>Tixx - for their considerable contributions across the project codebase.</li>
        <li>And many others!</li>
      </ul>
      <p class="text-neutral-700 dark:text-neutral-300 mt-4">
        Together, we’re building something special. Thank you for being part of the BeamMP
        community!
      </p>
    </div>
  </section>
</template>
