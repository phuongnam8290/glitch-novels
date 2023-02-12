<template>
  <h1 class="section-header mt-16 flex items-center">
    <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
    Advanced Search
  </h1>

  <section>
    <title-list :titles="CURRENT_TITLES" />
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
import { computed, onMounted } from "vue";
import { useTitlesStore } from "@/stores/titles";

import TitleList from "@/components/titles/TitleList.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const titlesStore = useTitlesStore();
onMounted(titlesStore.FETCH_TITLES);

const CURRENT_TITLES = computed(() => titlesStore.CURRENT_TITLES);
const TOTAL_PAGES = computed(() => titlesStore.TOTAL_PAGES);
const CURRENT_PAGE = computed(() => titlesStore.CURRENT_PAGE);

// Handle change page event.
const changePage = (page) => {
  titlesStore.CHANGE_PAGE(page);

  // Scroll to top after load new batch of titles.
  window.scrollTo({
    top: 150,
    behavior: "smooth",
  });
};
</script>
