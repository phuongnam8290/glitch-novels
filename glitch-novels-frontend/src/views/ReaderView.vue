<template>
  <section class="flex !py-0">
    <div class="reader flex-grow">
      <div
        class="chapter-list mx-auto min-h-full max-w-[1280px] space-y-10 bg-gray-bg-1 px-20 py-10"
        ref="chapterList"
      >
        <chapter-reader
          class="chapter-reader"
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
    </div>

    <control-side-bar
      class="control-side-bar sticky top-[5rem] flex"
      @wheel.stop
    />
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
/* 5rem for header */
section {
  min-height: calc(100vh - 5rem);
}

/* Make sure that each chapter has the length of full screen. 5rem for header, 5rem for space-y from both sides or
margin-top/bottom from the container */
.chapter-reader {
  min-height: calc(100vh - 5rem - 5rem);
}

/* 5rem for header */
.control-side-bar {
  height: calc(100vh - 5rem);
}
</style>
