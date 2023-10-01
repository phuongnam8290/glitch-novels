<template>
  <input
    class="search-input flex-grow"
    style="font-family: 'Metropolis', FontAwesome, serif"
    type="text"
    placeholder="&#xF002; Start typing to search..."
    v-model.trim="searchQuery"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch";
import { useRateLimiting } from "@/composable/utils/rateLimiter";

const advancedSearchStore = useAdvancedSearchStore();
const { searchCriteria } = storeToRefs(advancedSearchStore);

const searchQuery = ref("");

// Add debounce to SearchTitleInput to limit the times the search criteria are updated. Hence, limit the number of
// calls to the backend.
const { debounce } = useRateLimiting();
const debounceUpdateSearchCriteria = debounce((title) => (searchCriteria.value.title = title), 500);

watch(searchQuery, (newSearchQuery) => debounceUpdateSearchCriteria(newSearchQuery));
</script>

<style scoped>
input[type="text"] {
  @apply bg-gray-bg-1/80;
}

input[type="text"]::placeholder {
  @apply text-white-ink-1;
}
</style>
