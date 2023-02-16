<template>
  <div class="novel-card grid h-[275px] bg-gray-bg-1/80 p-3">
    <div class="cover">
      <router-link :to="{ name: 'details', params: { id: novel.id } }">
        <img
          :src="novel.coverUrl"
          alt="Title cover"
          class="h-full w-full object-cover"
        />
      </router-link>
    </div>
    <h1 class="title inline-block overflow-hidden">
      <router-link
        :to="{ name: 'details', params: { id: novel.id } }"
        class="title-text inline-block w-full truncate"
        ref="title"
        @mouseenter="startMarquee($event, 2)"
        @mouseleave="stopMarquee"
      >
        <span>{{ novel.title }}</span>
      </router-link>
    </h1>
    <h2 class="author overflow-hidden">
      <a
        href="#"
        class="subtitle-text inline-block w-full truncate"
        ref="author"
        @mouseenter="startMarquee($event, 2)"
        @mouseleave="stopMarquee"
      >
        <span>{{ novel.author.name }}</span>
      </a>
    </h2>
    <div class="ratings self-center">
      <span>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-solid fa-star-sharp-half-stroke"></i>
        <i class="fa-regular fa-star-sharp"></i>
      </span>
    </div>
    <scrollable-tags
      v-if="novel.genres.length > 0"
      :tags="novel.genres"
      class="tags py-4"
    />
    <div
      class="synopsis cursor-pointer overflow-y-hidden pb-10 pr-4 hover:overflow-y-scroll"
      v-drag-scroll.y
      v-html="novel.synopsis"
    >
    </div>
  </div>
</template>

<script setup>
import { array, number, object, string } from "yup";

import { useStartMarquee, useStopMarquee } from "@/composable/animations/marquee";
import { dragscroll as vDragScroll } from "vue-dragscroll";

import ScrollableTags from "@/components/common/tag/ScrollableTags.vue";

defineProps({
  novel: {
    required: true,
    type: Object,
    validator(value) {
      // Define title's schema.
      const schema = object({
        id: number().required().positive(),
        title: string().required(),
        coverUrl: string().required().url(),
        synopsis: string().required(),
        author: object({
          id: number().required(),
          name: string().required(),
        }),
        genres: array().of(
          object({
            id: number().required(),
            title: string().required(),
            description: string().required(),
          })
        ),
      });

      // Validate the title's structure against the schema. Print validate errors, if any.
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

const startMarquee = (event, padding) => {
  useStartMarquee(event.currentTarget, padding);
};

const stopMarquee = (event) => {
  useStopMarquee(event.currentTarget);
};
</script>

<style scoped>
.novel-card {
  grid-template-columns: 180px 1fr calc(18px * 5);
  grid-template-rows: calc(1.3rem * 1.5) calc(0.8rem * 1.5) calc(0.8rem + (0.5rem * 2) + 2px + 2rem) 1fr;
  grid-template-areas:
    "cover title ratings"
    "cover author ratings"
    "cover tags tags"
    "cover synopsis synopsis";
  grid-column-gap: 1.5rem;
}

.cover {
  grid-area: cover;
}

.title {
  grid-area: title;
}

.author {
  grid-area: author;
}

.ratings {
  grid-area: ratings;
}

.tags {
  grid-area: tags;
}

.synopsis {
  grid-area: synopsis;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.1) 100%);
  scrollbar-gutter: stable;
}

.synopsis::-webkit-scrollbar {
  width: 3px;
  background: transparent;
}

.synopsis::-webkit-scrollbar-track-piece {
  background-image: url("@/assets/images/scrollbar/scrollbar-track.png");
  background-repeat: repeat-y;
  background-size: contain;
}

.synopsis::-webkit-scrollbar-thumb {
  border-radius: 3px;
  border: 1px solid theme("colors[white-ink-1]");
  background-color: black;
}
</style>
