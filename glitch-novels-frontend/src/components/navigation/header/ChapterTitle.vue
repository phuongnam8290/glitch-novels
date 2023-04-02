<template>
  <nav
    class="chapter-link inline-block w-full truncate"
    v-if="CURRENT_CHAPTER"
    @mouseenter="startMarquee($event.currentTarget)"
    @mouseleave="stopMarquee($event.currentTarget)"
  >
    <span>
      <a
        href=""
        class="title-text"
      >
        {{ CURRENT_CHAPTER.novel.title }}
      </a>
      <span class="chapter-title-divider mx-2">|</span>
      <a
        href=""
        class="chapter-title"
      >
        Chapter {{ CURRENT_CHAPTER.number }} - {{ CURRENT_CHAPTER.title }}</a
      >
    </span>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useChaptersStore } from "@/stores/chapter";
import { useMarquee } from "@/composable/animations/marquee";

const chaptersStore = useChaptersStore();
const CURRENT_CHAPTER = computed(() => chaptersStore.CURRENT_CHAPTER);

const { startMarquee, stopMarquee } = useMarquee();
</script>

<style scoped>
.chapter-title-divider {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
