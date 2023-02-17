<template>
  <section
    class="wrapper relative mx-auto -mb-20 w-[70%] bg-gray-bg-1 px-20 pt-10"
    ref="wrapper"
    @wheel="handleMouseWheel"
  >
    <chapter-reader
      :chapter="chapter"
      v-for="chapter in CHAPTERS"
      :key="chapter.id"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useChaptersStore } from "@/stores/chapter";

import ChapterReader from "@/components/reader/ChapterReader.vue";

const wrapper = ref(null);

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const nextIndicator = ref(null);
let intersectionObserver = null;

const loadNextChapters = async () => {
  while (wrapper.value.getBoundingClientRect().bottom < window.innerHeight * 1.5 && chaptersStore.HAS_NEXT_CHAPTER) {
    await renderNextChapters();
  }
};

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(15);

  const options = {
    threshold: 0.1,
  };
  intersectionObserver = new IntersectionObserver(loadNextChapters, options);
  intersectionObserver.observe(nextIndicator.value);

  document.documentElement.addEventListener("wheel", handleMouseWheel);
});

onUnmounted(() => {
  document.documentElement.removeEventListener("wheel", handleMouseWheel);
});

let isThrottle = false;
const handleMouseWheel = async (event) => {
  if (isThrottle) {
    return;
  }

  isThrottle = true;
  setTimeout(() => {
    isThrottle = false;
  }, 500);

  if (
    event.deltaY < 0 && //
    wrapper.value.getBoundingClientRect().top > 0 &&
    chaptersStore.HAS_PREVIOUS_CHAPTER
  ) {
    const body = document.documentElement;
    const initialHeight = body.scrollHeight;

    await renderPrevChapters();
    body.scrollTop = body.scrollHeight - initialHeight;
  }
};

const renderPrevChapters = async () => {
  await chaptersStore.FETCH_PREV_CHAPTER();
};

const renderNextChapters = async () => {
  await chaptersStore.FETCH_NEXT_CHAPTER();
};
</script>

<style scoped></style>
