<template>
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
</template>

<script setup>
import ThePagination from "@/components/common/pagination/ThePagination.vue";
import RegularNovelCard from "@/components/novels/cards/RegularNovelCard.vue";

import { computed, ref } from "vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch";
import { useScrollElement } from "@/composable/animations/scrollElement";

const advancedSearchStore = useAdvancedSearchStore();
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
