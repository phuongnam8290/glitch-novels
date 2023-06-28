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
import { useRateLimiting } from "@/composable/utils/rateLimiter";
import { search } from "@/api/search";
import { ref, watch } from "vue";

const emit = defineEmits(["emptySearchQuery", "hasValueSearchQuery", "fetchingResults", "receivedResults"]);

// Get search query from input & make request to back-end
const searchQuery = ref("");
const searchResults = ref([]);

const getSearchResults = async (searchQuery) => {
  const response = await search(searchQuery);
  return response.data;
};

// Debouncing the requests to back-end
const { debounce } = useRateLimiting();
const debouncedGetSearchResults = debounce(getSearchResults, 500);

watch(searchQuery, async (value) => {
  if (value.length === 0) {
    emit("emptySearchQuery");
    return;
  }

  try {
    emit("hasValueSearchQuery");
    emit("fetchingResults");
    searchResults.value = await debouncedGetSearchResults(value);
  } catch (error) {
    //TODO: Show error message.
  } finally {
    emit("receivedResults", searchResults);
  }
});
</script>

<style scoped></style>
