<template>
  <section
    class="wrapper relative mx-auto -mb-20 max-w-[1200px] space-y-10 bg-gray-bg-1 px-20 py-10"
    ref="wrapper"
    @wheel="handleMouseWheel"
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

const wrapper = ref(null);

const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const nextIndicator = ref(null);
let intersectionObserver = null;

onMounted(async () => {
  await chaptersStore.FETCH_CURRENT_CHAPTER(15);

  const options = {
    threshold: 0.1,
  };
  intersectionObserver = new IntersectionObserver(loadNextChapters, options);
  intersectionObserver.observe(nextIndicator.value);

  document.documentElement.addEventListener("wheel", handleMouseWheel);
});

const loadNextChapters = async () => {
  while (loadMoreChapter()) {
    await chaptersStore.ADD_NEXT_CHAPTER();
  }
};

const HAS_NEXT_CHAPTER = computed(() => chaptersStore.HAS_NEXT_CHAPTER);
const loadMoreChapter = () => {
  const wrapperHeightFromViewportToBottom = wrapper.value.getBoundingClientRect().bottom;
  const nextIndicatorHeight = nextIndicator.value.scrollHeight;
  const paddingHeight = 200;

  return (
    wrapperHeightFromViewportToBottom < window.innerHeight + nextIndicatorHeight + paddingHeight &&
    HAS_NEXT_CHAPTER.value
  );
};

onUnmounted(() => {
  document.documentElement.removeEventListener("wheel", handleMouseWheel);
});

let isThrottle = false;
const HAS_PREVIOOUS_CHAPTER = computed(() => chaptersStore.HAS_PREVIOUS_CHAPTER);
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
    HAS_PREVIOOUS_CHAPTER
  ) {
    const body = document.documentElement;
    const initialHeight = body.scrollHeight;

    await chaptersStore.ADD_PREVIOUS_CHAPTER();
    body.scrollTop = body.scrollHeight - initialHeight;
  }
};
</script>

<style scoped></style>
