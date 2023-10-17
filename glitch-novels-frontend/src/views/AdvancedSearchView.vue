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

    <!--    TODO: Use single NovelList component for both NovelsView & AdvancedSearchView. Implement after has a
dedicate view for create/delete novels-->
    <section
      ref="novelList"
      class="mt-8"
    >
      <div class="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <RegularNovelCard
          v-for="novel in CURRENT_RESULTS"
          :key="novel.id"
          :novel="novel"
        />
      </div>
    </section>

    <section class="mt-8">
      <ThePagination
        :total-pages="TOTAL_PAGES"
        :current-page="CURRENT_PAGE"
        @changePage="changePage"
      />
    </section>
  </div>
</template>

<script setup>
import SearchTitleInput from "@/components/advanced-search/SearchTitleInput.vue";
import FilterButton from "@/components/advanced-search/FilterButton.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";
import RegularNovelCard from "@/components/novels/cards/RegularNovelCard.vue";

import { computed, onMounted, ref } from "vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch";
import { useScrollElement } from "@/composable/animations/scrollElement";

const advancedSearchStore = useAdvancedSearchStore();
onMounted(() => {
  //TODO: Fetch search results for the first time or show all if search criteria is empty
});

const CURRENT_RESULTS = computed(() => advancedSearchStore.CURRENT_RESULTS);
const TOTAL_PAGES = computed(() => advancedSearchStore.TOTAL_PAGES);
const CURRENT_PAGE = computed(() => advancedSearchStore.CURRENT_PAGE);

// Handle change page event.
const novelList = ref(null);
const { scrollElement } = useScrollElement();

const changePage = async (page) => {
  advancedSearchStore.CHANGE_PAGE(page);

  // Scroll to top after load new batch of novels.
  await scrollElement(novelList);
};
</script>

<style scoped></style>
