<template>
  <nav
    class="chapter-link flex items-center"
    v-if="CURRENT_CHAPTER"
  >
    <a
      href=""
      class="title-text"
    >
      {{ CURRENT_CHAPTER.novel.title }}
    </a>
    <span class="mx-2">|</span>
    <a href=""> Chapter {{ CURRENT_CHAPTER.number }} - {{ CURRENT_CHAPTER.title }}</a>
  </nav>
</template>

<script setup>
import { useChaptersStore } from "@/stores/chapter";
import { computed } from "vue";

const chaptersStore = useChaptersStore();
const CURRENT_CHAPTER = computed(() => chaptersStore.CURRENT_CHAPTER);
</script>

<style scoped>
.chapter-link span {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
