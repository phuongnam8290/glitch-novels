<template>
  <li class="search-result-novel grid p-4 hover:bg-gray-selected-bg">
    <div class="novel-cover">
      <img
        :src="novel.coverUrl"
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
        <span>{{ novel.title }}</span>
      </a>
    </h1>
    <h2 class="novel-author overflow-hidden">
      <a
        href="#"
        class="subtitle-text inline-block w-full truncate"
        @mouseenter="startMarquee($event.currentTarget)"
        @mouseleave="stopMarquee($event.currentTarget)"
      >
        <span>{{ novel.author.name }}</span>
      </a>
    </h2>

    <ScrollableTags
      class="novel-tags mt-2 overflow-hidden"
      v-if="novel.genres.length > 0"
      :tags="novel.genres"
    />
  </li>
</template>

<script setup>
import { array, number, object, string } from "yup";
import { computed } from "vue";
import { useMarquee } from "@/composable/animations/marquee";

import ScrollableTags from "@/components/common/tag/ScrollableTags.vue";

const props = defineProps({
  novel: {
    required: true,
    type: Object,
    validator(value) {
      // Define novel's schema
      const schema = object({
        id: number().required().positive(),
        title: string().required(),
        coverUrl: string().required().url(),
        author: object({
          id: number().required(),
          name: string().required(),
        }),
        genres: array().of(
          object({
            id: number().required(),
            title: string().required(),
          })
        ),
      });

      // Validate the novel's structure against the schema. Print validate errors, if any.
      try {
        schema.validateSync(value);
      } catch (error) {
        console.warn(error.errors);
        return false;
      }

      return true;
    },
  },
});

const novel = computed(() => props.novel);

// Start/stop marquee effect for title & author texts.
const { startMarquee, stopMarquee } = useMarquee();
</script>

<style scoped>
.search-result-novel {
  grid-template-columns: 70px 1fr;
  grid-template-rows: calc(1.3rem * 1.5) calc(0.8rem * 1.5) calc(0.8rem + (0.5rem * 2) + 2px + 0.5rem);
  grid-column-gap: 10px;
  grid-template-areas:
    "novel-cover novel-title"
    "novel-cover novel-author"
    "novel-cover novel-tags";
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
