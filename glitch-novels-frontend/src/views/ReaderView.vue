<template>
  <section
    class="wrapper relative mx-auto -mb-20 max-w-[1200px] space-y-10 bg-gray-bg-1 px-20 py-10"
    ref="wrapper"
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

import ChapterReader from "@/components/reader/ChapterReader.vue";

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const wrapper = ref(null);
setParentRefForPreviousChpater(wrapper);
setParentRefForNextChapters(wrapper);

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

const CURRENT_CHAPTER = computed(() => chaptersStore.CURRENT_CHAPTER);
const currentChapterElement = computed(() => {
  const id = `id-${CURRENT_CHAPTER.value.id}`;
  return wrapper.value.querySelector(`#${id}`);
});

// If the current chapter gets outside bound (about up or down 40% viewport), set the new current chapter based on the
// old one's direction.
const setNewCurrentChapter = () => {
  const viewportHeight = window.innerHeight;
  const padding = viewportHeight * 0.4;
  const boundingClientRect = currentChapterElement.value.getBoundingClientRect();

  // If the old chapter moves up 40% of the viewport, then the new current chapter will be the one below it.
  if (boundingClientRect.bottom < padding) {
    chaptersStore.SET_CURRENT_CHAPTER("up");
    return;
  }

  // If the old chapter moves down 40% of the viewport, then the new current chapter will be the one above it.
  if (boundingClientRect.top > viewportHeight - padding) {
    chaptersStore.SET_CURRENT_CHAPTER("down");
  }
};
</script>

<style scoped></style>
