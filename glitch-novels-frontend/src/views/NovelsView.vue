<template>
  <div ref="novelsView">
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      <span> Advanced Search </span>
    </h1>

    <section
      ref="novelList"
      class="mt-8"
      v-if="isViewMounted"
    >
      <novel-list :novels="CURRENT_NOVELS" />
    </section>

    <section class="mt-8">
      <the-pagination
        :total-pages="TOTAL_PAGES"
        :current-page="CURRENT_PAGE"
        @changePage="changePage"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref } from "vue";
import { useNovelsStore } from "@/stores/novels";
import { useScrollElement } from "@/composable/animations/useScrollElement";

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
</script>
