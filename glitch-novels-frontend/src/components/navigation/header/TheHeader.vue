<template>
  <header
    class="z-50 w-full bg-gray-bg-2"
    :class="setReaderDivider"
    ref="header"
  >
    <!--  Main Header  -->
    <div class="main-header flex h-20 items-center justify-between py-5 px-20">
      <!--  Logo  -->
      <div class="logo-wrapper flex-initial">
        <img
          class="logo ml-12 max-h-9"
          ref="logo"
          src="@/assets/images/common/logo.png"
          alt="Glitch logo"
        />
      </div>

      <div class="ml-32 mr-10 inline-block flex-1 overflow-hidden whitespace-nowrap">
        <chapter-title v-if="route.name === 'reader'" />
      </div>

      <!--  Search bar  -->
      <div class="search-wrapper flex-initial">
        <input
          class="ml-auto block h-fit w-[30rem] border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
          style="font-family: 'Metropolis', FontAwesome, serif"
          type="text"
          placeholder="&#xF002; Search for anything"
        />
      </div>

      <the-profile class="ml-10 flex-initial" />
    </div>
    <!--  End of Main Header  -->
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useNavigationStore } from "@/stores/navigation";
import { useMoveRight } from "@/composable/animations/move-right";

import TheProfile from "@/components/navigation/header/TheProfile.vue";
import ChapterTitle from "@/components/navigation/header/ChapterTitle.vue";

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
onMounted(() => document.addEventListener("scroll", toggleHeaderDivider));
onUnmounted(() => document.removeEventListener("scroll", toggleHeaderDivider));

// Set border style when in reader page.
const setReaderDivider = computed(() => ({
  "border-b-2": routeName.value === "reader",
  "border-gold-brand-2": routeName.value === "reader",
}));

// Add header to the list of navigation elements for tracking purposes.
const navigationStore = useNavigationStore();
onMounted(() => navigationStore.ADD_NAVIGATION_ELEMENT("header", header.value));
onUnmounted(() => navigationStore.REMOVE_NAVIGATION_ELEMENT("header"));
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
