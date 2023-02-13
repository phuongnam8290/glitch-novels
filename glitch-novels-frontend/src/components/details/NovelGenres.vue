<template>
  <collapsable-section
    :collapsed-height="genresCollapsedHeight"
    :expand-text="genresExpandText"
  >
    <template #title>
      <h2 class="section-text"> Genres </h2>
    </template>

    <template #content>
      <ul
        class="flex flex-wrap gap-4"
        ref="genreList"
      >
        <li
          v-for="genre in genres"
          :key="genre"
        >
          <the-tag> {{ genre }} </the-tag>
        </li>
      </ul>
    </template>
  </collapsable-section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { countVerticalOverflowedChildren } from "@/utils/countHiddenChildren";

import CollapsableSection from "@/components/common/CollapsableSection.vue";
import TheTag from "@/components/common/tag/TheTag.vue";

const genres = ref(["Action", "Adventure", "Drama", "Fantasy", "Mystery", "Shounen", "Supernatural"]);

const genreList = ref(null);
const genresExpandText = ref("");
const genresCollapsedHeight = 85;

onMounted(() => {
  genresExpandText.value = `Show ${countVerticalOverflowedChildren(
    genreList.value,
    genresCollapsedHeight
  )} more genres`;
});
</script>

<style scoped></style>
