<template>
  <section class="flex">
    <div
      class="chapter-list relative mx-auto -my-20 w-[1200px] space-y-10 bg-gray-bg-1 px-20 py-10"
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChaptersStore } from "@/stores/chapter";
import { useGetPreviousChapter } from "@/composable/reader/useGetPreviousChapter";
import { useGetNextChapter } from "@/composable/reader/useGetNextChapters";
import { useMoveToNeighboringChapter } from "@/composable/reader/useMoveToNeighboringChapter";

import ChapterReader from "@/components/reader/ChapterReader.vue";
import ControlSideBar from "@/components/reader/controls/ControlSideBar.vue";

const chaptersStore = useChaptersStore();
const route = useRoute();
const routers = useRouter();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

// Signify to the composables that the data is loaded or not.
const isDataLoaded = ref(false);

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(route.params.id);
  isDataLoaded.value = true;
});

const chapterId = computed(() => route.params.id);
watch(chapterId, () => {
  // Force reload when the chapter id changed.
  routers.go();
});

const chapterList = ref(null);
const nextIndicator = ref(null);

useGetPreviousChapter(chapterList);
useGetNextChapter(chapterList, nextIndicator, isDataLoaded);
useMoveToNeighboringChapter(chapterList);
</script>

<style scoped>
.chapter-list {
  min-height: calc(100vh - 9rem);
}
</style>
