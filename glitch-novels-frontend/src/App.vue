<template>
  <div
    class="wrapper relative left-0 min-h-screen w-full"
    ref="wrapper"
  >
    <the-header class="sticky top-0 left-0" />
    <the-sidebar class="fixed top-0 left-[-13.75rem]" />

    <main class="m-20">
      <router-view> </router-view>
    </main>

    <the-footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMoveRight } from "@/composable/animations/useMoveRight";

import TheSidebar from "@/components/navigation/TheSidebar.vue";
import TheHeader from "@/components/navigation/header/TheHeader.vue";
import TheFooter from "@/components/navigation/TheFooter.vue";

// Move the content to the right if the sidebar opens.
const wrapper = ref(null);
useMoveRight(wrapper);
</script>

<style scoped>
.wrapper {
  transition: all 0.25s ease-in-out;
}
</style>
