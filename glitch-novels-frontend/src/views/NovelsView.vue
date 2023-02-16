<template>
  <h1 class="section-header mt-16 flex items-center">
    <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
    Advanced Search
  </h1>

  <section ref="novelList">
    <novel-list :novels="CURRENT_NOVELS" />
  </section>

  <section>
    <the-pagination
      :total-pages="TOTAL_PAGES"
      :current-page="CURRENT_PAGE"
      @changePage="changePage"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useNovelsStore } from "@/stores/novels";

import { useScrollTopElement } from "@/composable/animations/scrollElement";

// eslint-disable-next-line no-unused-vars
import NovelList from "@/components/novels/NovelList.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const novelsStore = useNovelsStore();
onMounted(novelsStore.FETCH_NOVELS);

const CURRENT_NOVELS = computed(() => novelsStore.CURRENT_NOVELS);
const TOTAL_PAGES = computed(() => novelsStore.TOTAL_PAGES);
const CURRENT_PAGE = computed(() => novelsStore.CURRENT_PAGE);

// Handle change page event.
const novelList = ref(null);

const changePage = async (page) => {
  novelsStore.CHANGE_PAGE(page);

  // Scroll to top after load new batch of novels.
  await useScrollTopElement(novelList);
};
</script>
