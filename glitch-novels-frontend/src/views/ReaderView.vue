<template>
  <section class="flex">
    <div
      class="chapter-list relative mx-auto -mb-20 max-w-[1200px] space-y-10 bg-gray-bg-1 px-20 py-10"
      ref="chapterList"
    >
      <chapter-reader
        :chapter="chapter"
        v-for="chapter in CHAPTERS"
        :key="chapter.id"
        :id="`id-${chapter.id}`"
      />

      <div
        class="next-indicator absolute left-0 bottom-0 h-[300px]"
        ref="nextIndicator"
      ></div>
    </div>
    <control-side-bar />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useChaptersStore } from "@/stores/chapter";
import { useGetPreviousChapter } from "@/composable/reader/useGetPreviousChapter";
import { useGetNextChapter } from "@/composable/reader/useGetNextChapters";

import ChapterReader from "@/components/reader/ChapterReader.vue";
import ControlSideBar from "@/components/reader/controls/ControlSideBar.vue";

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const chapterList = ref(null);

// Handle auto-loading when reaching the end of the page.
const nextIndicator = ref(null);

useGetPreviousChapter(chapterList);
useGetNextChapter(chapterList, nextIndicator);

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(15);
});
</script>

<style scoped></style>
