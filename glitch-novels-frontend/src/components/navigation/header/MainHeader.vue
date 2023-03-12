<template>
  <header
    class="z-50 flex h-20 w-full items-center justify-between border-b-2 bg-gray-bg-2 py-5 px-20"
    :class="borderStyle"
    ref="header"
  >
    <!--  Main Header  -->
    <!--  Logo  -->
    <Transition enter-active-class="animate__animated animate__fadeIn">
      <div
        class="logo-wrapper flex-initial"
        v-if="!IS_SIDEBAR_OPEN"
      >
        <img
          class="logo ml-12 max-h-9"
          ref="logo"
          src="@/assets/images/common/logo.png"
          alt="Glitch logo"
        />
      </div>
    </Transition>

    <div
      class="chapter-title mr-10 inline-block flex-1 overflow-hidden whitespace-nowrap"
      :class="{ 'ml-32': !IS_SIDEBAR_OPEN }"
    >
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
    <!--  End of Main Header  -->
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useNavigationStore } from "@/stores/navigation";
import { useEditModeStore } from "@/stores/editMode";

import TheProfile from "@/components/navigation/header/TheProfile.vue";
import ChapterTitle from "@/components/navigation/header/ChapterTitle.vue";

//  Detect if the user scrolls or not.
const header = ref(null);
const isScrolled = ref(false);

const detectHeaderScroll = () => {
  isScrolled.value = window.scrollY >= header.value.offsetHeight;
};

onMounted(() => document.addEventListener("scroll", detectHeaderScroll));
onUnmounted(() => document.removeEventListener("scroll", detectHeaderScroll));

// Set the border's style based on scrolling status, edit mode & current route.
const route = useRoute();
const routeName = computed(() => route.name);

const editStore = useEditModeStore();
const IS_EDIT_MODE_ON = computed(() => editStore.IS_EDIT_MODE_ON);

const borderStyle = computed(() => ({
  "border-transparent": (!isScrolled.value || IS_EDIT_MODE_ON.value) && routeName.value !== "reader",
  "border-gold-brand-2": (isScrolled.value && !IS_EDIT_MODE_ON.value) || routeName.value === "reader",
}));

// Add header to the list of navigation elements for tracking purposes.
const navigationStore = useNavigationStore();
const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);
onMounted(() => navigationStore.ADD_NAVIGATION_ELEMENT("header", header.value));
onUnmounted(() => navigationStore.REMOVE_NAVIGATION_ELEMENT("header"));
</script>

<style scoped>
.chapter-title {
  transition: 0.25s;
}
</style>
