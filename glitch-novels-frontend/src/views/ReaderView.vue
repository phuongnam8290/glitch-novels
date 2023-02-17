<template>
  <div
    class="container relative mx-auto -mb-20 bg-gray-bg-1"
    ref="test"
    @wheel="handleMouseWheel"
  >
    <div
      class="chapter"
      v-for="chapter in CHAPTERS"
      :key="chapter.id"
    >
      <div v-html="chapter.content"></div>
    </div>
    <!--    <div-->
    <!--      class="h-[100px] bg-green-700"-->
    <!--      v-for="n in prevChapters"-->
    <!--      :key="n"-->
    <!--    >-->
    <!--      {{ n }}-->
    <!--    </div>-->
    <!--    <div class="h-[100px] bg-amber-400"> </div>-->
    <!--    <div-->
    <!--      class="h-[100px] bg-blue-700"-->
    <!--      v-for="n in nextChapters"-->
    <!--      :key="n"-->
    <!--    >-->
    <!--      {{ n }}-->
    <!--    </div>-->
    <div
      class="next-indicator absolute left-0 bottom-0 h-[300px]"
      ref="nextIndicator"
    ></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useChaptersStore } from "@/stores/chapter";

const test = ref(null);
// const prevChapters = ref([]);
// const nextChapters = ref([]);
const chaptersStore = useChaptersStore();
const CHAPTERS = computed(() => chaptersStore.CHAPTERS);

const nextIndicator = ref(null);
let intersectionObserver = null;

const loadNextChapters = async () => {
  while (test.value.getBoundingClientRect().bottom < window.innerHeight * 1.5 && chaptersStore.HAS_NEXT_CHAPTER) {
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
    test.value.getBoundingClientRect().top > 0 &&
    chaptersStore.HAS_PREVIOUS_CHAPTER
  ) {
    const body = document.documentElement;
    const initialHeight = body.scrollHeight;

    await renderPrevChapters();
    // await nextTick(() => {
    body.scrollTop = body.scrollHeight - initialHeight;
    // });
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
