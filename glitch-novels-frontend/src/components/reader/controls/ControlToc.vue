<template v-if="CURRENT_CHAPTER !== null">
  <div
    class="toc space-y-4 p-4"
    @wheel.stop
  >
    <h2 class="section-text flex justify-between">
      <span> Table of Contents </span>
      <button
        class="font-normal"
        @click="$emit('close')"
      >
        <i class="fa-light fa-xmark fa-xl"></i>
      </button>
    </h2>
    <ul
      class="custom-scrollbar toc-body pr-2"
      ref="tocBody"
      v-if="chapters.length !== 0"
    >
      <li
        class="overflow-x-hidden border-b border-gray-bg-1 py-4 last:border-b-0"
        v-for="chapter in chapters"
        :key="chapter.id"
        :id="`toc-chapter-${chapter.id}`"
        :class="setCurrentToCChapter(chapter.id)"
      >
        <router-link
          :to="{ name: 'reader', params: { id: chapter.id } }"
          class="inline-block w-full truncate"
          @mouseenter="startMarquee($event.currentTarget)"
          @mouseleave="stopMarquee($event.currentTarget)"
        >
          <span>Chapter {{ chapter.number }} - {{ chapter.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useChaptersStore } from "@/stores/chapter";
import { useMarquee } from "@/composable/animations/useMarquee";
import axios from "axios";

defineEmits(["close"]);

const chaptersStore = useChaptersStore();
const CURRENT_CHAPTER = computed(() => chaptersStore.CURRENT_CHAPTER);
const chapters = ref([]);
const tocBody = ref(null);

onMounted(async () => {
  const novelId = CURRENT_CHAPTER.value.novel.id;
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const response = await axios.get(`${baseUrl}/novel/${novelId}`);
  chapters.value = response.data.chapters;

  // Scroll to top the new current chapter when the chapter changed.
  watch(CURRENT_CHAPTER, (chapter) => {
    const currentChapterElement = tocBody.value.querySelector(`#toc-chapter-${chapter.id}`);
    currentChapterElement.scrollIntoView();
  });
});

const setCurrentToCChapter = (id) => ({ ["toc-current-chapter"]: CURRENT_CHAPTER.value.id === id });
const { startMarquee, stopMarquee } = useMarquee();
</script>

<style scoped>
.toc-body {
  height: calc(100vh - 6.25rem - 1.25rem - 1.5 * 1.3 * 1rem - 3rem);
  padding-right: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.toc-current-chapter {
  font-weight: bold;
  color: theme("colors[gold-brand-1]");
}
</style>
