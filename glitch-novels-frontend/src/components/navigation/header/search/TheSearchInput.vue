<template>
  <input
    class="search-input w-full"
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
