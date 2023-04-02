<template>
  <header
    class="z-50 flex h-20 items-center border-b-2 bg-gray-bg-2 py-5 px-20"
    :class="borderStyle"
    ref="header"
  >
    <div class="logo-wrapper flex flex-shrink-0">
      <div id="sidebar-toggle-button"> </div>
      <Transition enter-active-class="animate__animated animate__fadeIn">
        <img
          class="logo ml-4 max-h-9"
          ref="logo"
          src="@/assets/images/common/logo.png"
          alt="Glitch logo"
          v-if="!IS_SIDEBAR_OPEN"
        />
      </Transition>
    </div>

    <div
      class="chapter-title mr-10 inline-block flex-auto overflow-hidden whitespace-nowrap"
      :class="{ 'ml-32': !IS_SIDEBAR_OPEN }"
    >
      <chapter-title v-if="route.name === 'reader'" />
    </div>

    <!--  Search bar  -->
    <div class="search-wrapper flex flex-shrink-0">
      <input
        class="ml-auto block h-fit w-[30rem] border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
        style="font-family: 'Metropolis', FontAwesome, serif"
        type="text"
        placeholder="&#xF002; Search for anything"
      />
      <the-profile class="ml-10" />
    </div>

    <!--  End of Main Header  -->
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useNavigationStore } from "@/stores/navigation";
import { useEditModeStore } from "@/stores/editMode";
import { useEventBus } from "@/composable/utils/useEventBus";

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

const navigationStore = useNavigationStore();
const IS_SIDEBAR_OPEN = computed(() => navigationStore.IS_SIDEBAR_OPEN);

// Emit event signifies that this component has been mounted.
const { eventBus } = useEventBus();
onMounted(() => eventBus.emit("mainHeaderMounted"));
</script>

<style scoped>
header,
.chapter-title {
  transition: 0.25s;
}
</style>
