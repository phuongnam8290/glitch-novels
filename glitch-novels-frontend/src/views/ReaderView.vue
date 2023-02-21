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
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useChaptersStore } from "@/stores/chapter";

import {
  setParentRef as setParentRefForPreviousChpater,
  loadPreviousChapterByMouseWheel,
  loadPreviousChapterByArrowUpKey,
} from "@/composable/reader/getPreviousChapter";

import {
  setParentRef as setParentRefForNextChapters,
  setNextIndicatorRef,
  loadNextChapters,
} from "@/composable/reader/getNextChapters";

import {
  setParentRef as setParentRefForDetectCurrentChapter,
  setNewCurrentChapter,
} from "@/composable/reader/detectCurrentChapter";

import ChapterReader from "@/components/reader/ChapterReader.vue";
import ControlSideBar from "@/components/reader/controls/ControlSideBar.vue";

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const chapterList = ref(null);
setParentRefForPreviousChpater(chapterList);
setParentRefForNextChapters(chapterList);
setParentRefForDetectCurrentChapter(chapterList);

// Handle auto-loading when reaching the end of the page.
const nextIndicator = ref(null);
setNextIndicatorRef(nextIndicator);

let nextIntersectionObserver = null;

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(15);

  // Event listeners for scrolls up past the top of the page.
  document.addEventListener("wheel", loadPreviousChapterByMouseWheel);
  document.addEventListener("keydown", loadPreviousChapterByArrowUpKey);

  // Observe the nextIndicator element, and load the next chapters if users reach it.
  nextIntersectionObserver = new IntersectionObserver(loadNextChapters, { threshold: 0.1 });
  nextIntersectionObserver.observe(nextIndicator.value);

  // Detect current chapter
  document.addEventListener("scroll", setNewCurrentChapter);
});

onUnmounted(() => {
  // Remove event listeners & unobserved nextIndicator element.
  document.removeEventListener("wheel", loadPreviousChapterByMouseWheel);
  document.removeEventListener("keydown", loadPreviousChapterByArrowUpKey);
  nextIntersectionObserver.disconnect();

  // Remove the event listener to detect the current chapter
  document.removeEventListener("scroll", setNewCurrentChapter);
});
</script>

<style scoped></style>
