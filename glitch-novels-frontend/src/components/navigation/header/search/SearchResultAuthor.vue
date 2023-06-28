<template>
  <li class="search-result-author grid p-4 hover:bg-gray-selected-bg">
    <div class="author-avatar">
      <img
        src="/src/assets/images/profile/default-author-avatar.png"
        alt="author-avatar"
        class="h-full object-cover"
      />
    </div>
    <h1 class="author-name overflow-hidden">
      <a
        href="#"
        class="title-text inline-block w-full truncate"
        @mouseenter="startMarquee($event.currentTarget)"
        @mouseleave="stopMarquee($event.currentTarget)"
      >
        <span>{{ author.name }}</span>
      </a>
    </h1>
    <h2 class="author-titles overflow-hidden">
      <a
        href="#"
        class="subtitle-text inline-block w-full truncate"
        @mouseenter="startMarquee($event.currentTarget)"
        @mouseleave="stopMarquee($event.currentTarget)"
      >
        <span> {{ author.novels.length }} titles</span>
      </a>
    </h2>
  </li>
</template>

<script setup>
import { array, number, object, string } from "yup";
import { useMarquee } from "@/composable/animations/marquee";
import { computed } from "vue";

const props = defineProps({
  // Define author's schema.
  author: {
    required: true,
    type: Object,
    validator(value) {
      const schema = object({
        id: number().required().positive(),
        name: string().required(),
        novels: array().of(
          object({
            id: number().required().positive(),
            title: string().required(),
          })
        ),
      });

      // Validate the author's structure against the schema. Print validate errors, if any.
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

const author = computed(() => props.author);

// Start/stop marquee effect for title & author texts.
const { startMarquee, stopMarquee } = useMarquee();
</script>

<style scoped>
.search-result-author {
  grid-template-columns: 70px 1fr;
  grid-template-rows: calc(1.3rem * 1.5) calc(0.8rem * 1.5);
  grid-column-gap: 10px;
  grid-template-areas:
    "author-avatar author-name"
    "author-avatar author-titles";
}

.author-avatar {
  grid-area: author-avatar;
}

.author-name {
  grid-area: author-name;
}

.author-titles {
  grid-area: author-titles;
}
</style>
