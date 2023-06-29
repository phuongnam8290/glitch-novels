<template>
  <input
    class="search-input w-full border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
    style="font-family: 'Metropolis', FontAwesome, serif"
    type="text"
    placeholder="&#xF002; Search for anything"
    v-model.trim="searchQuery"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();
const { searchQuery } = storeToRefs(searchStore);
</script>

<style scoped></style>
