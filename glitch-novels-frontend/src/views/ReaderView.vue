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
      class="prev-indicator absolute left-0 -top-10 h-[50px]"
      ref="prevIndicator"
    ></div>
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
const prevIndicator = ref(null);
const nextIndicator = ref(null);

let nextIntersectionObserver = null;
let prevIntersectionObserver = null;

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(45);

  const options = {
    threshold: 0.1,
  };

  selfDestructWheelEvent();

  nextIntersectionObserver = new IntersectionObserver(loadNextChapters, options);
  nextIntersectionObserver.observe(nextIndicator.value);
});

onUnmounted(() => {
  prevIntersectionObserver.disconnect();
  nextIntersectionObserver.disconnect();
});

let firstTime = true;
const loadPreviousChapters = async (entries) => {
  if (firstTime) {
    firstTime = false;
    return;
  }
  if (!entries[0].isIntersecting) {
    return;
  }

  const initialHeight = wrapper.value.scrollHeight;
  while (shouldLoadMorePreviousChapter(initialHeight)) {
    await chaptersStore.ADD_PREVIOUS_CHAPTER();
    const currentHeight = wrapper.value.scrollHeight;
    document.documentElement.scrollTop = currentHeight - initialHeight + 5 * 16;
  }
};

const HAS_PREVIOUS_CHAPTER = computed(() => chaptersStore.HAS_PREVIOUS_CHAPTER);
const shouldLoadMorePreviousChapter = (initialHeight) => {
  const currentHeight = wrapper.value.scrollHeight;
  return currentHeight - initialHeight < 500 && HAS_PREVIOUS_CHAPTER.value;
};

const selfDestructWheelEvent = () => {
  const handleWheelEvent = async (event) => {
    if (
      event.deltaY < 0 && //
      wrapper.value.getBoundingClientRect().top > 0 &&
      HAS_PREVIOUS_CHAPTER.value
    ) {
      const body = document.documentElement;
      const initialHeight = body.scrollHeight;

      await chaptersStore.ADD_PREVIOUS_CHAPTER();
      body.scrollTop = body.scrollHeight - initialHeight;

      document.removeEventListener("wheel", handleWheelEvent);

      prevIntersectionObserver = new IntersectionObserver(loadPreviousChapters, { threshold: 0.1 });
      prevIntersectionObserver.observe(prevIndicator.value);
    }
  };

  document.addEventListener("wheel", handleWheelEvent);
};

const loadNextChapters = async () => {
  while (shouldLoadMoreNextChapter()) {
    await chaptersStore.ADD_NEXT_CHAPTER();
  }
};

const HAS_NEXT_CHAPTER = computed(() => chaptersStore.HAS_NEXT_CHAPTER);
const shouldLoadMoreNextChapter = () => {
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
