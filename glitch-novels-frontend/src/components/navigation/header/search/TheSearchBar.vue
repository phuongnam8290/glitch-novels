<template>
  <div
    class="search-bar relative w-[30rem]"
    ref="searchBar"
    @click="handleSearchBarClick"
  >
    <TheSearchInput />

    <div
      class="search-results-wrapper absolute right-0 mt-3 w-full bg-gray-bg-1 p-3"
      :class="{ hide: !showSearchResults }"
    >
      <TheSearchResults />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import { useClickOutside } from "@/composable/utils/clickOutside";

import TheSearchInput from "@/components/navigation/header/search/TheSearchInput.vue";
import TheSearchResults from "@/components/navigation/header/search/TheSearchResults.vue";

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
