<template>
  <section
    class="wrapper relative mx-auto -mb-20 max-w-[1200px] space-y-10 bg-gray-bg-1 px-20 py-10"
    ref="wrapper"
  >
    <chapter-reader
      :chapter="chapter"
      v-for="chapter in CHAPTERS"
      :key="chapter.id"
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

import ChapterReader from "@/components/reader/ChapterReader.vue";

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const wrapper = ref(null);

// Handle auto-loading when reaching the end of the page.
const nextIndicator = ref(null);
let nextIntersectionObserver = null;

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(45);

  // Event listeners for scrolls up past the top of the page.
  document.addEventListener("wheel", handleWheelTopEvent);
  document.addEventListener("keydown", handleArrowUpEvent);

  const options = {
    threshold: 0.1,
  };

  // Observe the nextIndicator element, and load the next chapters if users reach it.
  nextIntersectionObserver = new IntersectionObserver(loadNextChapters, options);
  nextIntersectionObserver.observe(nextIndicator.value);
});

onUnmounted(() => {
  // Remove event listeners & unobserved nextIndicator element.
  document.removeEventListener("wheel", handleWheelTopEvent);
  document.removeEventListener("keydown", handleArrowUpEvent);
  nextIntersectionObserver.disconnect();
});

// Load a new chapter when scrolling past the top of the page.
const HAS_PREVIOUS_CHAPTER = computed(() => chaptersStore.HAS_PREVIOUS_CHAPTER);
const handleWheelTopEvent = async (event) => {
  // Check if the user scrolls up and the current position reaches the top of the page.
  if (
    event.deltaY < 0 && //
    wrapper.value.getBoundingClientRect().top > 0 &&
    HAS_PREVIOUS_CHAPTER.value
  ) {
    await handleMoveTopEvents();
  }
};

const handleArrowUpEvent = async (event) => {
  // Check if the user press the arrow up key and the current position reaches the top of the page,
  if (
    event.keyCode === 38 && //
    wrapper.value.getBoundingClientRect().top > 0 &&
    HAS_PREVIOUS_CHAPTER.value
  ) {
    await handleMoveTopEvents();
  }
};

// Fetch & display a new chapter, then scrolls up a small distance to signify to the user that a new chapter has been
// loaded.
const handleMoveTopEvents = async () => {
  // Save current document's height. Necessary for calculate scrolling position.
  const body = document.documentElement;
  const initialHeight = body.scrollHeight;

  // Add the previous chapter to the list.
  await chaptersStore.ADD_PREVIOUS_CHAPTER();

  // Calculate the new chapter height.
  const previousChapterHeight = body.scrollHeight - initialHeight;

  // Scrolls up a small distance to signify to the user that a new chapter has been loaded.
  body.scrollTop = previousChapterHeight;
  window.scrollTo({
    top: previousChapterHeight - 300,
    behavior: "smooth",
  });
};

// Handle auto-load next chapters when near the end of the pages.
const loadNextChapters = async () => {
  while (shouldLoadMoreNextChapter()) {
    await chaptersStore.ADD_NEXT_CHAPTER();
  }
};

// Determine if should fetch new chapters or not
const HAS_NEXT_CHAPTER = computed(() => chaptersStore.HAS_NEXT_CHAPTER);
const shouldLoadMoreNextChapter = () => {
  // If the distance between the current position and the end of the page is smaller than the nextIndicator height +
  // padding height, then add new chapters. If not, then stop. Doing this will make the nextIndicator element pushed
  // down far enough so that the next time user scrolls down near the end of the page, the intersection observer
  // callback will be called again.
  const wrapperHeightFromViewportToBottom = wrapper.value.getBoundingClientRect().bottom;
  const nextIndicatorHeight = nextIndicator.value.scrollHeight;
  const paddingHeight = 200;

  return (
    wrapperHeightFromViewportToBottom < window.innerHeight + nextIndicatorHeight + paddingHeight &&
    HAS_NEXT_CHAPTER.value
  );
};
</script>

<style scoped></style>
