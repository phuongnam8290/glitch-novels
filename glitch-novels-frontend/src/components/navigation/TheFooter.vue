<template>
  <footer
    class="h-16 w-full bg-gray-bg-2 px-20"
    v-if="routeName !== 'reader'"
  >
    <div class="hidden h-full items-center sm:flex">
      <img
        class="w-9"
        src="../../assets/images/common/logo-small.png"
        alt="logo"
      />
      <div class="mx-4 flex-grow border border-t-white-ink-1"></div>
      <div class="whitespace-nowrap"> Copyright © 2012-2023 Glitch Network. </div>
    </div>
    <div class="flex h-full w-full items-center justify-around whitespace-nowrap sm:hidden">
      <span> © 2012-2023 Glitch Network </span>
    </div>
  </footer>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

// Only show the footer if the current view is not reader.
const route = useRoute();
const routeName = computed(() => route.name);
</script>

<style scoped></style>
