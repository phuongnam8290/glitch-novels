<template>
  <ul class="chapter-list grid grid-cols-2">
    <li
      v-for="(chapter, index) in props.chapters"
      :key="chapter.id"
      class="border-y border-gray-bg-2 pr-4 hover:bg-gray-selected-bg"
      :class="setChapterBg(index)"
      @mouseenter="startMarquee($event.currentTarget.querySelector('.chapter-name > p'))"
      @mouseleave="stopMarquee($event.currentTarget.querySelector('.chapter-name > p'))"
    >
      <router-link
        :to="{ name: 'reader', params: { id: chapter.id } }"
        class="chapter grid gap-y-2 py-3"
      >
        <div
          class="chapter-number flex items-center justify-center"
          :class="setChapterBorder(index)"
        >
          <span>{{ chapter.number }}</span>
        </div>
        <div class="chapter-name overflow-hidden">
          <p class="inline-block w-full truncate">
            <span>{{ chapter.title }}</span>
          </p>
        </div>
        <div class="chapter-release-date subtitle-text">
          <span>{{ moment(chapter.createdDate).fromNow() }}</span>
        </div>
      </router-link>
    </li>

    <li
      v-if="chapters.length % 2 !== 0"
      :class="setChapterBg(chapters.length)"
      class="border-y border-gray-bg-2"
    >
    </li>
  </ul>
</template>

<script setup>
import moment from "moment";
import { array, number, object, string } from "yup";
import { useMarquee } from "@/composable/animations/useMarquee";

const props = defineProps({
  chapters: {
    type: Array,
    required: true,
    validator(value) {
      const schema = array().of(
        object({
          id: number().required(),
          title: string().required(),
          number: number().required().min(0),
          createdDate: string().required(),
        })
      );

      try {
        schema.validateSync(value);
      } catch (error) {
        console.warn(error);
        return false;
      }

      return true;
    },
  },
});

// Handle the marquee effect on the chapter's title when hovering.
const { startMarquee, stopMarquee } = useMarquee();

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
    "border-l-2 ": isInRightColumn,
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
