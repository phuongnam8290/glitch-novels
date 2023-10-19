<template>
  <div>
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      <span> Advanced Search </span>
    </h1>

    <section class="mt-8">
      <div class="advanced-search-controls flex items-center gap-5">
        <SearchTitleInput />
        <FilterButton />
      </div>
    </section>

    <SearchResultsEmpty v-if="IS_SEARCH_RESULTS_EMPTY" />
    <SearchResultsList v-else />
  </div>
</template>

<script setup>
import SearchTitleInput from "@/components/advanced-search/SearchTitleInput.vue";
import FilterButton from "@/components/advanced-search/FilterButton.vue";
import SearchResultsList from "@/components/advanced-search/SearchResultsList.vue";
import SearchResultsEmpty from "@/components/advanced-search/SearchResultsEmpty.vue";

import { storeToRefs } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch";

const advancedSearchStore = useAdvancedSearchStore();
const { IS_SEARCH_RESULTS_EMPTY } = storeToRefs(advancedSearchStore);
</script>

<style scoped></style>
