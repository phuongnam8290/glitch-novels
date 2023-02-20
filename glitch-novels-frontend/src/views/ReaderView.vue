<template>
  <section class="flex">
    <div
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
    </div>

    <aside>
      <div
        class="control-bar fixed top-[7.5rem] right-20 w-[50px] bg-blue-700"
        @click="handleAsideClick"
      >
      </div>

      <div class="toc fixed top-[6.25rem] right-40 bg-red-700"></div>
    </aside>
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

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const wrapper = ref(null);
setParentRefForPreviousChpater(wrapper);
setParentRefForNextChapters(wrapper);
setParentRefForDetectCurrentChapter(wrapper);

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

const handleAsideClick = (event) => {
  event.currentTarget.parentElement.classList.toggle("open");
};
</script>

<style scoped>
aside {
  width: 0;
  transition: all 0.25s ease-in-out;
}

aside.open {
  width: calc(100vw - 10rem - 1200px);
}

aside .toc {
  width: 0;
  height: calc(100vh - 6.25rem - 1.25rem);
  transition: all 0.25s ease-in-out;
}

aside.open .toc {
  width: calc(100vw - 10rem - 1200px - 8rem);
}

.control-bar {
  height: calc(100vh - 7.5rem - 2.5rem);
  transition: all 0.25s ease-in-out;
}
</style>
