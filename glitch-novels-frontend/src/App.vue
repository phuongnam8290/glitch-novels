<template>
  <div
    class="wrapper relative left-0 flex min-h-screen w-full flex-col justify-between"
    ref="wrapper"
  >
    <the-navigation />

    <main class="m-20">
      <router-view> </router-view>
    </main>

    <the-footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMoveRight } from "@/composable/animations/move-right";

import TheNavigation from "@/components/navigation/TheNavigation.vue";
import TheFooter from "@/components/navigation/TheFooter.vue";

const wrapper = ref(null);

useMoveRight(wrapper);
</script>

<style scoped>
.wrapper {
  transition: all 0.25s ease-in-out;
}
</style>
