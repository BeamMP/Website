<template>
  <header class="main-content" :style="{ 'background-position': 'center center, center 0px' }">
    <div class="introduction" style="margin-top: 0px;">
      <div class="container mx-auto">
        <div class="flex items-center justify-center">
          <div class="lg:w-8/12 md:w-8/12 sm:w-8/12 xs:w-full">
            <p class="lead">
              <b>BeamMP</b> Bringing Multiplayer to BeamNG.drive!<br>
              With a smooth and enjoyable experience.
            </p>
          </div>
          <div id="button" class="lg:w-4/12 md:w-4/12 sm:w-4/12 xs:w-full hidden-xs buttons-wrapper">
            <div class="buttons mt-3">
              <button @click="downloadInstaller" class="download-client js-show-story bg-beammp-green" href="beamMP.zip" download="">
                <img class="os-icon" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/windows8/windows8-original.svg" alt="windows-logo">
                <span class="text">Download Client</span>
                <span class="description text-zinc-100"> BeamMP_Installer.zip</span>
              </button>
            </div>
            <div class="buttons mt-3">
              <form action="https://github.com/BeamMP/BeamMP-Server/releases/latest/download/BeamMP-Server.exe">
                <button class="download-client js-show-story bg-beammp-orange" style="background: radial-gradient(circle,rgb(255 179 38 / 80%),rgb(255 176 0 / 65%)) center/100%;">
                  <img class="os-icon" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/windows8/windows8-original.svg" alt="windows-logo">
                  <span class="text">Download Server</span>
                  <span class="description text-zinc-800"> BeamMP-Server.exe</span>
                </button>
              </form>
            </div>
            <div class="buttons mt-3">
              <form action="https://github.com/BeamMP/BeamMP-Server/releases/latest">
                <button class="download-client js-show-story bg-beammp-orange" style="background: radial-gradient(circle,rgb(255 179 38 / 80%),rgb(255 176 0 / 65%)) center/100%;">
                  <img class="os-icon" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-plain.svg" alt="linux-logo">
                  <span class="text">Download Server</span>
                  <span class="description text-zinc-800">Linux builds</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    downloadInstaller() {
      // Implement your download logic here
      // You can use the window.location.href or any other method
    }
  }
}
</script>

<style scoped>
/* Add your Tailwind CSS styles here */
</style>
