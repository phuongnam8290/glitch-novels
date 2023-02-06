<template>
  <header
    class="z-40 flex h-20 w-full items-center justify-between bg-gray-bg-1 px-20 py-5"
    ref="header"
  >
    <!--  Logo  -->
    <img
      class="logo ml-12 max-h-9"
      ref="logo"
      src="@/assets/images/common/logo.png"
      alt="Glitch logo"
    />

    <!--  Search bar  -->
    <input
      class="h-fit w-[30rem] border border-white-ink-1 bg-gray-bg-1 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
      style="font-family: 'Metropolis', FontAwesome, serif"
      type="text"
      placeholder="&#xF002; Search for anything"
    />
  </header>
</template>

<script setup>
// import { useNavigationStore } from "@/stores/navigation";
import { ref } from "vue";
import { useMoveRight } from "@/composable/animations/move-right";

// Slide header to right when sidebar open
const header = ref(null);
useMoveRight(header);
</script>

<style scoped>
/* Header style */
header {
  transition: all 0.25s ease-in-out;
}

header .logo {
  transition: all 0.25s ease-in-out;
}

/* Header style when sidebar open */
header.moveRight .logo {
  margin-left: 0;
  opacity: 0;
  visibility: hidden;
}
</style>
