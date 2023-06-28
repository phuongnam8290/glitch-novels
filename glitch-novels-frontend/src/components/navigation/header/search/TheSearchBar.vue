<template>
  <div
    class="search-bar relative w-[30rem]"
    ref="searchBar"
    @click="handleSearchBarClick"
  >
    <SearchInput
      @empty-search-query="isQueryEmpty = true"
      @has-value-search-query="isQueryEmpty = false"
      @fetching-results="isFetching = true"
      @received-results="receivedSearchResults"
    />
    <div
      class="search-results-wrapper absolute right-0 mt-3 w-full bg-gray-bg-1 p-3"
      :class="{ hide: !showSearchResults }"
    >
      <a
        class="pl-1"
        v-if="isQueryEmpty"
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
        v-else-if="[...searchResults.novels, ...searchResults.authors].length === 0"
      >
        No results found.
      </a>
      <SearchResults
        v-else
        :search-results="searchResults"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import { useClickOutside } from "@/composable/utils/clickOutside";

import SearchInput from "@/components/navigation/header/search/SearchInput.vue";
import SearchResults from "@/components/navigation/header/search/SearchResults.vue";

const searchBar = ref(null);

// Change the width of the search bar when clicking inside/outside.
const expandWidth = () => {
  searchBar.value.classList.remove("w-[30rem]");
  searchBar.value.classList.add("w-[50rem]");
};
const contractWidth = () => {
  searchBar.value.classList.add("w-[30rem]");
  searchBar.value.classList.remove("w-[50rem]");
};

// Show search results when clicking the search bar.
const showSearchResults = ref(false);

const handleSearchBarClick = () => {
  expandWidth();
  showSearchResults.value = true;
};

// Hide search results when clicking outside the search bar.
const { enableClickOutside, disableClickOutside } = useClickOutside(searchBar, () => {
  contractWidth();
  showSearchResults.value = false;
});
onMounted(() => enableClickOutside());
onUnmounted(() => disableClickOutside());

// Variables used to synchronize results get from SearchInput
const isQueryEmpty = ref(true);
const isFetching = ref(false);
let searchResults = {
  novels: [],
  authors: [],
};
const receivedSearchResults = (results) => {
  isFetching.value = false;
  searchResults = results;
};
</script>

<style scoped>
.search-bar {
  transition: 0.25s all ease-in-out;
}

.search-results-wrapper {
  transition: 0.25s all ease-in-out;
  transform-origin: top right;
}

.search-results-wrapper.hide {
  transform: scale(0);
}
</style>
