<template>
  <header
    class="z-50 flex h-20 w-full items-center justify-between bg-gray-bg-2 px-20 py-5"
    :class="setReaderDivider"
    ref="header"
  >
    <!--  Logo  -->
    <div class="logo-wrapper">
      <img
        class="logo ml-12 max-h-9"
        ref="logo"
        src="@/assets/images/common/logo.png"
        alt="Glitch logo"
      />
    </div>

    <chapter-title v-if="route.name === 'reader'" />

    <!--  Search bar  -->
    <div class="search-wrapper">
      <input
        class="ml-auto block h-fit w-[30rem] border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
        style="font-family: 'Metropolis', FontAwesome, serif"
        type="text"
        placeholder="&#xF002; Search for anything"
      />
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useMoveRight } from "@/composable/animations/move-right";

import ChapterTitle from "@/components/navigation/ChapterTitle.vue";

const route = useRoute();
const routeName = computed(() => route.name);

// Slide header to right when sidebar open
const header = ref(null);
useMoveRight(header);

// Show/hide the header border base on its position.
const toggleHeaderDivider = () => {
  // If scrolling more than the header's height, show the border.
  if (window.scrollY >= header.value.offsetHeight) {
    header.value.classList.add("border-b-2", "border-gold-brand-2");
  }
  // If at the top of the page and not in reader page, hide border
  else if (routeName.value !== "reader") {
    header.value.classList.remove("border-b-2", "border-gold-brand-2");
  }
};

// Set border style when in reader page.
const setReaderDivider = computed(() => ({
  "border-b-2": routeName.value === "reader",
  "border-gold-brand-2": routeName.value === "reader",
}));

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

header > * {
  flex: 1;
}
</style>
