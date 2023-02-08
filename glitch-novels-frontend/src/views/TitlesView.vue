<template>
  <header class="my-16 mx-20">
    <h1 class="section-header flex items-center">
      <span class="mr-4"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></span>
      Advanced Search
    </h1>
  </header>

  <section class="mx-20 my-16 space-y-10">
    <title-list :titles="ALL_TITLES" />
  </section>

  <section class="mx-20 my-16 space-y-10">
    <the-pagination />
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTitlesStore } from "@/stores/titles";

import TitleList from "@/components/titles/TitleList.vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const titlesStore = useTitlesStore();
onMounted(titlesStore.FETCH_TITLES);

const ALL_TITLES = computed(() => titlesStore.ALL_TITLES);
</script>
