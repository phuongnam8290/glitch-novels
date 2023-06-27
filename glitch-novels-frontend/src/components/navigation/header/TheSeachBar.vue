<template>
  <div
    class="search-bar relative w-[30rem]"
    ref="searchBar"
  >
    <input
      class="search-input w-full border border-white-ink-1 bg-gray-bg-2 px-4 py-1.5 text-white-ink-1 focus:border-gold-brand-1 focus:outline-0"
      style="font-family: 'Metropolis', FontAwesome, serif"
      type="text"
      placeholder="&#xF002; Search for anything"
      v-model.trim="searchQuery"
      @click="handleSearchInputClick"
    />
    <div
      class="search-results-wrapper absolute right-0 mt-3 w-full bg-gray-bg-1 p-3"
      :class="{ hide: !showSearchResults }"
    >
      <span
        class="pl-1"
        v-if="searchQuery.length === 0"
      >
        Please enter a search query...
      </span>
      <span
        class="pl-1"
        v-else-if="searchResults.length === 0"
      >
        No results found.
      </span>
      <div
        class="search-results custom-scrollbar max-h-[75vh] overflow-auto"
        v-else
      >
        <div class="section-text m-2 mr-4 flex items-center justify-between">
          <span>Novels</span>
          <a href="#">
            <i class="fa-regular fa-light fa-arrow-right"></i>
          </a>
        </div>
        <ul class="search-results-novel">
          <li
            class="search-result grid p-4"
            v-for="searchResult in searchResults"
            :key="searchResult.id"
          >
            <div class="novel-cover">
              <img
                :src="searchResult.coverUrl"
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
                <span>{{ searchResult.title }}</span>
              </a>
            </h1>
            <h2 class="novel-author overflow-hidden">
              <a
                href="#"
                class="subtitle-text inline-block w-full truncate"
                @mouseenter="startMarquee($event.currentTarget)"
                @mouseleave="stopMarquee($event.currentTarget)"
              >
                <span>{{ searchResult.author.name }}</span>
              </a>
            </h2>

            <ScrollableTags
              class="novel-tags mt-2 overflow-hidden"
              v-if="[...searchResult.genres, ...searchResult.tags].length > 0"
              :tags="[...searchResult.genres, ...searchResult.tags]"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

import { useClickOutside } from "@/composable/utils/clickOutside";
import { useMarquee } from "@/composable/animations/marquee";
import { searchNovel } from "@/api/novel";

import ScrollableTags from "@/components/common/tag/ScrollableTags.vue";

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

// Show search results when clicking the search bar.
const showSearchResults = ref(false);

const handleSearchInputClick = () => {
  expandWidth();
  showSearchResults.value = true;
};

// Hide search results when clicking outside the search bar.
const { enableClickOutside, disableClickOutside } = useClickOutside(searchBar, () => {
  contractWidth();
  showSearchResults.value = false;
});
onMounted(() => enableClickOutside());
onUnmounted(() => disableClickOutside());

// Start/stop marquee effect for title & author texts.
const { startMarquee, stopMarquee } = useMarquee();

// Get search query from input & make request to back-end
const searchQuery = ref("");
const searchResults = ref([]);

watch(searchQuery, async (value) => {
  if (value.length === 0) {
    return;
  }

  try {
    const response = await searchNovel(value);
    searchResults.value = response.data.searchResults;
    console.log(searchResults.value);
  } catch (error) {
    //TODO: Show error message.
  }
});
</script>

<style scoped>
.search-bar {
  transition: 0.25s all ease-in-out;
}

.search-results {
  scrollbar-gutter: auto;
  overscroll-behavior: contain;
}

.search-results-wrapper {
  transition: 0.25s all ease-in-out;
  transform-origin: top right;
}

.search-results-wrapper.hide {
  transform: scale(0);
}

.search-result {
  grid-template-columns: 70px 1fr;
  grid-template-rows: calc(1.3rem * 1.5) calc(0.8rem * 1.5) calc(0.8rem + (0.5rem * 2) + 2px + 0.5rem);
  grid-column-gap: 10px;
  grid-template-areas:
    "novel-cover novel-title"
    "novel-cover novel-author"
    "novel-cover novel-tags";
}

.search-result:hover {
  @apply bg-gray-selected-bg;
}

.novel-cover {
  grid-area: novel-cover;
}

.novel-title {
  grid-area: novel-title;
}

.novel-author {
  grid-area: novel-author;
}

.novel-tags {
  grid-area: novel-tags;
}
</style>
