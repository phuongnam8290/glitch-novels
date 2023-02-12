<template>
  <header
    class="z-50 flex h-20 w-full items-center justify-between bg-gray-bg-2 px-20 py-5"
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
      class="h-fit w-[30rem] border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
      style="font-family: 'Metropolis', FontAwesome, serif"
      type="text"
      placeholder="&#xF002; Search for anything"
    />
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useMoveRight } from "@/composable/animations/move-right";

// Slide header to right when sidebar open
const header = ref(null);
useMoveRight(header);

// Show/hide the header border base on its position.
const toggleHeaderDivider = () => {
  // If scrolling more than the header's height, show the border.
  if (window.scrollY >= header.value.offsetHeight) {
    header.value.classList.add("border-b-2", "border-gold-brand-2");
  } else {
    header.value.classList.remove("border-b-2", "border-gold-brand-2");
  }
};

onMounted(() => {
  document.addEventListener("scroll", toggleHeaderDivider);
});

onUnmounted(() => {
  document.removeEventListener("scroll", toggleHeaderDivider);
});
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
