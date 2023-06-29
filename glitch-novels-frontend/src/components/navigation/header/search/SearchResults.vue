<template>
  <a
    class="pl-1"
    v-if="searchQuery.length === 0"
  >
    Please enter a search query...
  </a>
  <div
    v-else-if="isFetching === true"
    class="flex justify-center"
  >
    <img
      src="/src/assets/images/common/loading.svg"
      alt="loading"
      class="h-48 w-48"
    />
  </div>
  <a
    class="pl-1"
    v-else-if="[...(searchResults.novels ?? []), ...(searchResults.authors ?? [])].length === 0"
  >
    No results found.
  </a>
  <div
    class="search-results custom-scrollbar max-h-[75vh] overflow-auto"
    v-else
  >
    <section v-if="searchResults.novels.length > 0">
      <header class="section-text m-2 mr-4 flex items-center justify-between">
        <span>Novels</span>
        <a href="#">
          <i class="fa-regular fa-light fa-arrow-right"></i>
        </a>
      </header>
      <ul class="search-results-novel">
        <SearchResultNovel
          :novel="novel"
          v-for="novel in searchResults.novels"
          :key="novel.id"
        />
      </ul>
    </section>

    <section v-if="searchResults.authors.length > 0">
      <header class="section-text m-2 mr-4 flex items-center justify-between">
        <span>Authors</span>
        <a href="#">
          <i class="fa-regular fa-light fa-arrow-right"></i>
        </a>
      </header>
      <ul class="search-results-author">
        <SearchResultAuthor
          :author="author"
          v-for="author in searchResults.authors"
          :key="author.id"
        />
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { search } from "@/api/search";
import { useRateLimiting } from "@/composable/utils/rateLimiter";
import { useSearchStore } from "@/stores/search";

import SearchResultNovel from "@/components/navigation/header/search/SearchResultNovel.vue";
import SearchResultAuthor from "@/components/navigation/header/search/SearchResultAuthor.vue";

// Get search query from store
const searchStore = useSearchStore();
const { searchQuery } = storeToRefs(searchStore);

// Send search request to backend
const getSearchResults = async (searchQuery) => {
  const response = await search(searchQuery);
  return response.data;
};

// Debouncing the requests to back-end
const { debounce } = useRateLimiting();
const debouncedGetSearchResults = debounce(getSearchResults, 500);

const isFetching = ref(false);
const searchResults = ref(null);

// Watch for changes in the search query and process accordingly.
watch(searchQuery, async (value) => {
  if (value.length === 0) {
    return;
  }

  try {
    isFetching.value = true;
    searchResults.value = await debouncedGetSearchResults(value);
  } catch (error) {
    //TODO: Show error message.
  } finally {
    isFetching.value = false;
  }
});
</script>

<style scoped>
.search-results {
  scrollbar-gutter: auto;
  overscroll-behavior: contain;
}
</style>
