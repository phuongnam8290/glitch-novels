<template>
  <section>
    <h2 class="section-text bg-gray-bg-1/80 p-4">Table of Contents</h2>
    <ul class="chapter-list grid grid-cols-2">
      <li
        v-for="(chapter, index) in chapters"
        :key="chapter['chapter-number']"
        class="border-y border-gray-bg-2"
        :class="setChapterBg(index)"
      >
        <a
          href="#"
          class="chapter grid gap-y-2 py-3 hover:bg-gray-selected-bg"
        >
          <div
            class="chapter-number flex items-center justify-center"
            :class="setChapterBorder(index)"
          >
            <span> {{ chapter["chapter-number"] }}</span>
          </div>
          <div class="chapter-name">
            <span>{{ chapter["chapter-name"] }}</span>
          </div>
          <div class="chapter-release-date subtitle-text">
            <span>9 mth</span>
          </div>
        </a>
      </li>

      <li
        v-if="chapters.length % 2 !== 0"
        :class="setChapterBg(chapters.length)"
        class="border-y border-gray-bg-2"
      >
      </li>
    </ul>
    <div class="bg-gray-bg-1/80 pb-4 pt-8">
      <the-pagination
        :current-page="5"
        :total-pages="10"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import ThePagination from "@/components/common/pagination/ThePagination.vue";

const chapters = ref([
  { "chapter-number": 1, "chapter-name": "A Strange Circumstance" },
  { "chapter-number": 2, "chapter-name": "Alexander Romanoff" },
  { "chapter-number": 3, "chapter-name": "Realization" },
  { "chapter-number": 4, "chapter-name": "I Will Save You" },
  { "chapter-number": 5, "chapter-name": "First Day?" },
  { "chapter-number": 6, "chapter-name": "First Decisions" },
  { "chapter-number": 7, "chapter-name": "Working Hard" },
  { "chapter-number": 8, "chapter-name": "Things About to Get Serious" },
  { "chapter-number": 9, "chapter-name": "The Romanoff's Decision" },
  { "chapter-number": 10, "chapter-name": "The First Day of August" },
  { "chapter-number": 11, "chapter-name": "What the Ruthenian People Needs" },
  { "chapter-number": 12, "chapter-name": "Acceptance" },
  { "chapter-number": 13, "chapter-name": "The Hope" },
  { "chapter-number": 14, "chapter-name": "I Guess it's a Success" },
  { "chapter-number": 15, "chapter-name": "The Cure" },
  { "chapter-number": 16, "chapter-name": "Progress" },
  { "chapter-number": 17, "chapter-name": "Siblings" },
  { "chapter-number": 18, "chapter-name": "New Personnel" },
  { "chapter-number": 19, "chapter-name": "Learning about the People Part 1" },
]);

// Get the chapter's position in the rendered table (left or right column, in odd or even row)
const getRenderedChapterPosition = (chapterIndex) => {
  const row = Math.floor(chapterIndex / 2) + 1;

  return {
    isOddRow: row % 2 !== 0,
    isInRightColumn: chapterIndex % 2 !== 0,
  };
};

// Set the chapter background to create a striped table
const setChapterBg = (chapterIndex) => {
  const renderedChapterPosition = getRenderedChapterPosition(chapterIndex);
  const isOddRow = renderedChapterPosition.isOddRow;

  return {
    "bg-gray-bg-1/80": !isOddRow,
    "bg-gray-bg-2/80": isOddRow,
  };
};

// Set the left border to the chapter in the right column to create a divider.
const setChapterBorder = (chapterIndex) => {
  const renderedChapterPosition = getRenderedChapterPosition(chapterIndex);
  const isOddRow = renderedChapterPosition.isOddRow;
  const isInRightColumn = renderedChapterPosition.isInRightColumn;

  return {
    "border-l-2": isInRightColumn,
    "border-gray-bg-1": isInRightColumn && isOddRow,
    "border-gray-bg-2": isInRightColumn && !isOddRow,
  };
};
</script>

<style scoped>
.chapter {
  grid-template-columns: calc(4ch + 2rem) 1fr;
  grid-template-rows: calc(1rem * 1.3) calc(0.8rem * 1.3);
  grid-template-areas:
    "chapter-number chapter-name"
    "chapter-number chapter-release-date";
}

.chapter-number {
  grid-area: chapter-number;
  font-size: 1.3rem;
}

.chapter-name {
  grid-area: chapter-name;
}

.chapter-release-date {
  grid-area: chapter-release-date;
}
</style>
