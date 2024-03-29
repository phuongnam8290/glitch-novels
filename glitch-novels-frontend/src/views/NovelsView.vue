<template>
  <div ref="novelsView">
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-books"></i></span>
      <span> Novels </span>
    </h1>

    <section
      ref="novelList"
      class="mt-8"
      v-if="isViewMounted"
    >
      <NovelList :novels="CURRENT_NOVELS" />
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
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import { useNovelsStore } from "@/stores/novels";
import { useEventBus } from "@/composable/utils/eventBus";
import { useScrollElement } from "@/composable/animations/scrollElement";

import NovelList from "@/components/novels/NovelList.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const novelsStore = useNovelsStore();
onMounted(novelsStore.FETCH_NOVELS);

const CURRENT_NOVELS = computed(() => novelsStore.CURRENT_NOVELS);
const TOTAL_PAGES = computed(() => novelsStore.TOTAL_PAGES);
const CURRENT_PAGE = computed(() => novelsStore.CURRENT_PAGE);

// Handle change page event.
const novelList = ref(null);
const { scrollElement } = useScrollElement();

const changePage = async (page) => {
  novelsStore.CHANGE_PAGE(page);

  // Scroll to top after load new batch of novels.
  await scrollElement(novelList);
};

// Provide this view's template ref to child components.
const novelsView = ref(null);
provide("novels-view", novelsView);

// To ensure that template ref is not null when provided to child components, defer child component render after this
// view has been mounted.
const isViewMounted = ref(false);
onMounted(() => {
  isViewMounted.value = true;
});

// Reload the current page, and keep the scrolling position. Use when there are changes in the list of novels (e.g
// delete, add...)
const reloadPage = async () => {
  const oldCurrentPage = CURRENT_PAGE.value;
  await novelsStore.FETCH_NOVELS();

  // In case of delete last novels, the last page may become empty. So we need to change to last page.
  if (oldCurrentPage > TOTAL_PAGES.value) {
    novelsStore.CHANGE_PAGE(TOTAL_PAGES.value);
  }

  // Scroll to the end of the list of novels.
  await scrollElement(novelList, {}, { behavior: "instant", block: "end" });
};

// Listen to the "reloadPage" global event to reload the current page when necessary.
const eventBus = useEventBus();
onMounted(() => eventBus.on("reloadPage", async () => await reloadPage()));
onUnmounted(() => eventBus.off("reloadPage"));
</script>
