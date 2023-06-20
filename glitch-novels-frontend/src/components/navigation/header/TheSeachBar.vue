<template>
  <div
    class="search-bar relative w-[30rem]"
    ref="searchBar"
    @click="expandWidth"
  >
    <input
      class="w-full border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
      style="font-family: 'Metropolis', FontAwesome, serif"
      type="text"
      placeholder="&#xF002; Search for anything"
    />
    <ul class="search-results custom-scrollbar absolute top-full left-0 max-h-[75vh] w-full overflow-auto bg-gray-bg-1">
      <li class="search-result">
        <div class="search-result-wrapper grid">
          <div class="novel-cover">
            <img
              src="https://res.cloudinary.com/dy9vrfexa/image/upload/v1675824420/glitch-novels/covers/05_ijbu2i.png"
              alt="novel-cover"
              class="h-full object-cover"
            />
          </div>
          <h1 class="novel-title overflow-hidden">
            <a
              href="#"
              class="title-text inline-block w-full truncate"
              @mouseenter="startMarquee($event.currentTarget)"
              @mouseleave="stopMarquee($event.currentTarget)"
            >
              <span>Solo Leveling</span>
            </a>
          </h1>
          <h2 class="novel-author overflow-hidden">
            <a
              href="#"
              class="subtitle-text inline-block w-full truncate"
              @mouseenter="startMarquee($event.currentTarget)"
              @mouseleave="stopMarquee($event.currentTarget)"
            >
              <span>Chugong</span>
            </a>
          </h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import { useClickOutside } from "@/composable/utils/clickOutside";
import { useMarquee } from "@/composable/animations/marquee";

const searchBar = ref(null);

// Change the width of the search bar when clicking inside/outside.
const expandWidth = () => {
  searchBar.value.classList.remove("w-[30rem]");
  searchBar.value.classList.add("w-[50rem]");
};
const contractWidth = () => {
  searchBar.value.classList.add("w-[30rem]");
  searchBar.value.classList.remove("w-[50rem]");
};
const { enableClickOutside, disableClickOutside } = useClickOutside(searchBar, contractWidth);
onMounted(() => enableClickOutside());
onUnmounted(() => disableClickOutside());

// Start/stop marquee effect for title & author texts.
const { startMarquee, stopMarquee } = useMarquee();
</script>

<style scoped>
.search-bar {
  transition: 0.5s all;
}

.search-results {
  scrollbar-gutter: auto;
}

.search-result {
  @apply px-4 py-2;
}

.search-result:hover {
  @apply bg-gray-selected-bg;
}

.search-result-wrapper {
  grid-template-columns: 50px 1fr;
  grid-template-rows: repeat(2, 40px);
  grid-column-gap: 10px;
  grid-template-areas:
    "novel-cover novel-title"
    "novel-cover novel-author";
}

.novel-cover {
  grid-area: novel-cover;
}

.novel-title {
  grid-area: novel-title;
  align-self: end;
}

.novel-author {
  grid-area: novel-author;
  align-self: start;
}
</style>
