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
const nextIndicator = ref(null);

let nextIntersectionObserver = null;

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(45);

  const options = {
    threshold: 0.1,
  };

  document.addEventListener("wheel", handleWheelTopEvent);
  document.addEventListener("keydown", handleArrowUpEvent);

  nextIntersectionObserver = new IntersectionObserver(loadNextChapters, options);
  nextIntersectionObserver.observe(nextIndicator.value);
});

onUnmounted(() => {
  document.removeEventListener("wheel", handleWheelTopEvent);
  document.removeEventListener("keydown", handleArrowUpEvent);
  nextIntersectionObserver.disconnect();
});

const HAS_PREVIOUS_CHAPTER = computed(() => chaptersStore.HAS_PREVIOUS_CHAPTER);

const handleWheelTopEvent = async (event) => {
  if (
    event.deltaY < 0 && //
    wrapper.value.getBoundingClientRect().top > 0 &&
    HAS_PREVIOUS_CHAPTER.value
  ) {
    await handleMoveTopEwents();
  }
};

const handleArrowUpEvent = async (event) => {
  if (
    event.keyCode === 38 && //
    wrapper.value.getBoundingClientRect().top > 0 &&
    HAS_PREVIOUS_CHAPTER.value
  ) {
    await handleMoveTopEwents();
  }
};

const handleMoveTopEwents = async () => {
  const body = document.documentElement;
  const initialHeight = body.scrollHeight;

  await chaptersStore.ADD_PREVIOUS_CHAPTER();
  const previousChapterHeight = body.scrollHeight - initialHeight;

  body.scrollTop = previousChapterHeight;
  window.scrollTo({
    top: previousChapterHeight - 300,
    behavior: "smooth",
  });
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
