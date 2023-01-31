<template>
  <the-navigation />

  <div
    class="view absolute top-20 right-0 w-full"
    ref="view"
  >
    <router-view> </router-view>
  </div>
  <div class="h-screen"></div>
  <div class="h-screen"></div>
</template>

<script setup>
import { ref } from "vue";
import useMoveRight from "@/composable/useMoveRight";

import TheNavigation from "@/components/common/navigation/TheNavigation.vue";

const view = ref(null);
useMoveRight(view);
</script>

<style scoped>
.view {
  transition: all 0.25s ease-in-out;
}
</style>
